'use strict';

var gulp = require('gulp');
var config = require('./gulp-config');
var header = require('gulp-header');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var html2js = require('gulp-html2js');
var less = require('gulp-less');
var ghPages = require('gulp-gh-pages');

var helper = {
    plugins: {},
    getPlugin: function (name) {
        var plugin = this.plugins[name];
        if (!plugin) {
            plugin = require(name);
            this.plugins[name] = plugin;
        }
        return plugin;
    }
};

gulp.task('default', ['build'], function () {
});

gulp.task('build', ['clean', 'eslint', 'svg-sprite'], function () {
});

gulp.task('replace-svg', ['minify-svg'], function () {
    var svgReplace = helper.getPlugin('gulp-replace');
    return gulp.src(['sprite.less'])
        .pipe(svgReplace('background: url(assets/', 'background: url(\'@{client-assets-dir}/'))
        .pipe(svgReplace('.svg)', '.svg\')'))
        .pipe(header('@import (reference) \'variables\';\n\n'))
        .pipe(gulp.dest('styles/'));
});

gulp.task('clean-svg', ['replace-svg'], function (done) {
    var del = helper.getPlugin('del');
    del(['sprite.less'], function (err) {
        done(err);
    });
});

gulp.task('del-existing-svg', function(done) {
    var del = helper.getPlugin('del');
    del(['assets/angular-sap-ui-elements*.svg'], function (err) {
        done(err);
    });
});

gulp.task('create-svg', ['del-existing-svg'], function () {
    var svgSprite = helper.getPlugin('gulp-svg-sprite');
    return gulp.src('assets/*.svg', {cwd: '.'})
        .pipe(svgSprite({
            mode: {
                css: {
                    sprite: 'assets/angular-sap-ui-elements.svg',
                    bust: true,
                    render: {
                        less: true
                    },
                    dest: '.',
                    prefix: '.common-'
                },
                shape: {
                    spacing: {
                        padding: 1,
                        box: 'content'
                    }
                }
            }
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('minify-svg', ['create-svg'], function () {
    var svgMin = helper.getPlugin('gulp-svgmin');
    return gulp.src('assets/angular-sap-ui-elements*.svg')
        .pipe(svgMin({
            plugins: [
                { removeUselessStrokeAndFill: true },
                { removeComments: true },
                { removeTitle: true },
                { removeHiddenElems: false }
            ]
        }))
        .pipe(gulp.dest('assets'));
});

gulp.task('svg-sprite', ['del-existing-svg', 'create-svg', 'minify-svg', 'replace-svg', 'clean-svg'], function () {

});

gulp.task('clean', function (done) {
    var del = helper.getPlugin('del');
    del(['coverage', 'tmp'], function (err) {
        done(err);
    });
});


gulp.task('eslint', function () {
    var eslint = helper.getPlugin('gulp-eslint');
    return gulp.src(['index.js', 'gulpfile.js', 'make', 'ui-elements/**/*.js', 'common-utils/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('dist', [ 'build' ], function () {
});

gulp.task('browserify-perform', function () {
    return browserify(['./docs/index.js', './index.js'])
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist/scripts/'));
});

/**
 * Browserify the bundle for use with github pages.
 */
gulp.task('browserify', ['browserify-perform'], function () {
    var bundleReplace = helper.getPlugin('gulp-replace');
    gulp.src('dist/scripts/bundle.js')
        // Update references to assets in the bundle to use the github pages prefix.
        .pipe(bundleReplace('\'../resources/angular-sap-ui-elements/docs/assets/', '\'/pages/sapbuild/angular-sap-ui-elements/resources/angular-sap-ui-elements/docs/assets/'))
        .pipe(bundleReplace('\'/resources/angular-sap-ui-elements/docs/assets/', '\'/pages/sapbuild/angular-sap-ui-elements/resources/angular-sap-ui-elements/docs/assets/'))
        .pipe(gulp.dest('dist/scripts'));
});

/**
 * Generate template cache for use with github pages.
 */
gulp.task('templates', function (done) {
    var pagesReplace = helper.getPlugin('gulp-replace');
    gulp.src('docs/**/*.html')
        .pipe(html2js({
            outputModuleName: 'docs.menu',
            useStrict: false,
            rename: function(htmlname) {
                return 'resources/angular-sap-ui-elements/' + htmlname;
            }
        }))
        // Update references to assets in the template to use the github pages prefix.
        .pipe(pagesReplace('/resources/angular-sap-ui-elements/docs/assets/', '/pages/sapbuild/angular-sap-ui-elements/resources/angular-sap-ui-elements/docs/assets/'))
        .pipe(pagesReplace('../resources/angular-sap-ui-elements/assets/', '/pages/sapbuild/angular-sap-ui-elements/resources/angular-sap-ui-elements/assets/'))
        .pipe(concat('template-docs.js'))
        .pipe(gulp.dest('./dist/scripts/'));

    gulp.src('ui-elements/**/*.html')
        .pipe(html2js({
            outputModuleName: 'common.ui.elements',
            useStrict: false,
            rename: function(htmlname) {
                return 'resources/angular-sap-ui-elements/' + htmlname;
            }
        }))
        .pipe(concat('template-ui-elements.js'))
        .pipe(gulp.dest('./dist/scripts'));

    done();
});

/**
 * Compile the less styles for ui elements and documentation to be used in github pages.
 */
gulp.task('build-less', ['svg-sprite'], function(done){
    return gulp.src(['styles/**/*.less', 'ui-elements/**/*.less', '!node_modules/**/*.less'])
        .pipe(less())
        .pipe(gulp.dest('css'))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('deploy-assets', function(done){
    gulp.src(['docs/assets/*.png', 'docs/assets/*.jpg'])
        .pipe(gulp.dest('./dist/resources/angular-sap-ui-elements/docs/assets/'));
    gulp.src(['assets/*.png', 'assets/*.jpg'])
        .pipe(gulp.dest('./dist/resources/angular-sap-ui-elements/assets/'));
    gulp.src(['fonts/Roboto/*.*'])
        .pipe(gulp.dest('./dist/fonts/'));
    gulp.src('docs/index.html').pipe(gulp.dest('dist'));

    gulp.src('assets/angular-sap-ui-elements-*').pipe(gulp.dest('dist/resources/angular-sap-ui-elements/assets/'));
    done();
});

/**
 * Generates and deploys the ui elements documentation for use in github pages.
 */
gulp.task('build-docs', ['browserify', 'templates', 'build-less', 'deploy-assets'], function () {
    // Deploy the distribution to github pages.
    return gulp.src('./dist/**/*')
        .pipe(ghPages({remoteUrl: 'https://github.com/sapbuild/angular-sap-ui-elements.git'}));
});

