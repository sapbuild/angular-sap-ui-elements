'use strict';

require('./menu');

/**
 * The angular application 'ui.documentation' that contains all ui-elements documentation for use as a separate application
 * not contained within BUILD.
 */
module.exports = angular.module('ui.documentation', ['angularAwesomeSlider', 'ngSanitize', 'ui.router', 'common.ui.elements', 'common.utils', 'docs.menu'])

    .config(function ($stateProvider) {
            $stateProvider
                .state('uielements', {
                        url: '/norman/ui-elements',
                        templateUrl: 'resources/angular-sap-ui-elements/docs/docs.html',
                        controller: 'DocsCtrl',
                        authenticate: false
                }).state('commondirectives', {
                        url: '/norman/directives',
                        templateUrl: 'resources/angular-sap-common-directives/common-directives/index.html',
                        authenticate: false
                });
    })
    .controller('DocsCtrl', ['$scope', 'uiError', 'httpError', require('./docs.controller.js')])
    .run(['$state', function ($state) {
        $state.go('uielements');
    }]);