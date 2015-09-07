'use strict';

var _ = require('lodash');

// @ngInject
module.exports = function ($timeout, $compile, uiError) {

    return {
        replace: true,
        transclude: true,
        restrict: 'E',
        scope: {
            uiMessage: '='
        },
        controller: ['$scope', 'uiError', function ($scope, uiError) {
            $scope.dismiss = function () {
                uiError.dismiss($scope.uiMessage.id);
            };
        }],
        templateUrl: 'resources/angular-sap-ui-elements/ui-elements/ui-toast/toast-message.template.html',
        link: function (scope, element, attrs, ctrl, transclude) {

            scope.uiMessage.isObject = false;

            if (scope.uiMessage.compileContent) {
                var transcludedEl;

                transclude(scope, function (clone) {
                    transcludedEl = clone;
                    element.children().append(transcludedEl);
                });

                $timeout(function () {
                    $compile(transcludedEl.contents())(scope.$parent, function (compiledClone) {
                        transcludedEl.replaceWith(compiledClone);
                    });
                }, 0);
            }

            if (_.isObject(scope.uiMessage.content)) {
                scope.uiMessage.isObject = true;
            }
            else {

            }

            if (scope.uiMessage.dismissOnTimeout) {
                $timeout(function () {
                    uiError.dismiss(scope.uiMessage.id);
                }, scope.uiMessage.timeout);
            }

            if (scope.uiMessage.dismissOnClick) {
                element.bind('click', function () {
                    uiError.dismiss(scope.uiMessage.id);
                    scope.$apply();
                });
            }
        }
    };
};
