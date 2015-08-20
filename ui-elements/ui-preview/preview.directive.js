'use strict';

/**
 * @ngdoc directive
 * @name ui.elements:uiPreview
 *
 * @description
 * Display a document in full screen mode
 * Display the size/date created of each document
 * Display the owner name and avatar
 *
 * @restrict E
 * @element ANY
 *
 * @param {boolean} delete ADisplay or not the delete icon
 * @example
 *
 * <doc:example>
 *   <doc:source>
 *      <ui-preview></ui-preview>
 *   </doc:source>
 * </doc:example>
 *
 */


// @ngInject
module.exports = function ($window, $rootScope, $timeout, $document) {
    return {
        templateUrl: 'resources/angular-sap-ui-elements/ui-elements/ui-preview/preview.template.html',
        restrict: 'E',
        replace: true,
        transclude: true,
        controllerAs: 'uiPreviewCtrl',
        controller: ['$scope', '$element', '$attrs', '$timeout', 'UserService', uiPreviewCtrl],
        link: uiPreviewLink
    };

    /**
     * Link function for the directive
     * @param  {object} $scope      The directive $scope
     * @param  {DOM}    $element    The DOM elt
     * @param  {object} $attributes The directives attributes
     * @param  {object} controller  The directive controler
     */
    function uiPreviewLink($scope, $element, $attributes, controller) {

        // variable to show/hide the preview window
        $scope.isOpen = false;

        // variables
        $scope.isImage = false;
        $scope.url = '';
        $scope.showBusyIndicator = true;
        $scope.isFullScreen = false;
        $scope.isLoaded = false;
        $scope.user = {};
        $scope.doc = {
            'fileurl': ''
        };

        // functions
        $scope.cleanUp = controller.cleanUp;
        $scope.keyupHandler = controller.keyupHandler;
        $scope.imageLoaded = controller.imageLoaded;
        $scope.open = controller.open;
        $scope.close = controller.close;

        // Attach a callback function on broadcast event 'preview-open'
        $scope.$on('preview-open', $scope.open);

        // Clean up when leaving
        $scope.$on('$destroy', $scope.cleanUp);

        // Attach a callback function about the 'imageLoaded'
        $scope.$on('imageLoaded', $scope.imageLoaded);

        // Attach a callback function on keystroke
        $document.on('keyup', $scope.keyupHandler);

        // Add the preview window to the DOM
        $timeout(function () {
            angular.element($document[0].body).append($element);
        });

    }
};

/**
 * Controller for that directive
 * @param  {object} $scope      The directive $scope
 * @param  {DOM}    $element    The DOM elt
 * @param  {object} $attrs      The directives attributes
 * @param  {object} $timeout    The angulat timeout method
 * @param  {object} userService The user service object
 */
function uiPreviewCtrl($scope, $element, $attrs, $timeout, userService) {
    var vm = this;

    // functions
    vm.close = close;
    vm.open = open;
    vm.imageLoaded = imageLoaded;
    vm.keyupHandler = keyupHandler;
    vm.cleanUp = cleanUp;


    /**
     * @name open
     * @desc Event handler when the preview is opened
     * @param  {event} event     event
     * @param  {DOM id} elementId The DOM id
     * @param  {string} docId)   The document id which should be displayed first
     */
    function open(event, elementId, doc) {
        $scope.isImage = false;
        $scope.isFullScreen = true;
        $scope.doc = $scope.$eval(doc);

        $timeout(function () {
            $scope.url = '';
        });

        $scope.showBusyIndicator = !!$scope.isImage;

        $timeout(function () {
            // Set user detail, document detail and display
            setUserName($scope.doc.created_by);
            setContent($scope.doc);
            $scope.isOpen = true;
        });
    }

    /**
     * @name close
     * @desc close the preview window
     */
    function close() {
        $timeout(function () {
            $scope.isOpen = false;
        });
    }

    /**
     * @name setContent
     * @desc Set the content type of the doc
     * If the doc is an image set up its src url
     * @param {string} doc idocument id
     */
    function setContent(doc) {
        if (doc.type === 'image') {
            $scope.showBusyIndicator = true;
            $scope.isImage = true;
            $scope.url = doc.fileurl;
        }
        else {
            $scope.isImage = false;
        }
    }

    /**
     * @name setUserName
     * @desc Set the user details and avatar to be displayed on the right side bar
     * @param {string} id The user id
     */
    function setUserName(id) {
        userService.getUserById({
            id: id
        }).$promise.then(function (response) {
            $scope.user = response;
        }).catch(function error(response) {
            // TODO
        });
    }

    /**
     * @name imageLoaded
     * @desc Event handler when an image is completely loaded
     * remove the busy indicator
     * @param  {event}  event
     * @param  {Boolean} isLoaded true when the image has been fully loaded
     */
    function imageLoaded(event, isLoaded) {
        if (isLoaded) {
            $timeout(function () {
                $scope.showBusyIndicator = false;
            });
        }
    }


    /**
     * @name keyupHandler
     * @desc Close the window if the ESC key is pressed
     * @param  {event} keyEvent The key stoke event
     */
    function keyupHandler(keyEvent) {
        if (keyEvent.keyCode === 27) {
            close();
        }
    }

    /**
     * @name cleanUp
     * @desc Cleanup the DOM and remove event binding
     */
    function cleanUp() {
        $element.remove();
        $document.off('keyup', vm.keyupHandler);
    }
};
