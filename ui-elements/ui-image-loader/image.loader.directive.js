'use strict';

// @ngInject
module.exports = function ($rootScope) {
    return {
        templateUrl: 'resources/angular-sap-ui-elements/ui-elements/ui-image-loader/image.loader.template.html',
        restrict: 'E',
        replace: true,
        scope: {
            imageSrc: '@'
        },
        link: function (scope, element, attrs) {

            var img = new Image();
            img.src = scope.imageSrc;

            var loadHandler = function () {
                element.attr("src", scope.imageSrc);
                element.removeClass('hidden');
                $rootScope.$broadcast('imageLoaded', true);
            }

            img.onload = loadHandler;

            attrs.$observe('imageSrc', function (newVal, oldVal) {
                if (typeof newVal !== 'undefined') {
                    element.addClass('hidden');
                    $rootScope.$broadcast('imageLoaded', false);

                    var img = new Image();
                    img.src = scope.imageSrc;
                    img.onload = loadHandler;
                }
                else {
                    $rootScope.$broadcast('imageLoaded', true);
                }
            });
        }
    };
};
