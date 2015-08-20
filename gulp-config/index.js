var pkg = require('../package.json');
var config = {
    clean: [ 'coverage', 'log/**/*' ],
    mocha: [ 'test/*.js'],
    src: ['common-utils/**/*.js', 'ui-elements/**/*.js']
};

config.eslint = config.src;

module.exports = config;