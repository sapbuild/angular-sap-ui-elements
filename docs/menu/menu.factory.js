'use strict';
// @ngInject
module.exports = function () {
    var sections = [
        {
            header  : 'CSS',
            id      : 'CSS',
            content : {
                url   : '/docs/templates/css.html',
                pages : [
                    {
                        name : 'Font',
                        id   : 'Font',
                        url  : '/docs/templates/font.html'
                    },
                    {
                        name : 'Colour Palette',
                        id   : 'ColourPalette',
                        url  : '/docs/templates/colourpalette.html'
                    },
                    {
                        name : 'Typography',
                        id   : 'Typography',
                        url  : '/docs/templates/typography.html'
                    }
                ]
            }
        },
        {
            header  : 'Services',
            id      : 'Services',
            content : {
                url   : '/docs/templates/services.html',
                pages : [
                    {
                        name : 'uiError',
                        id   : 'error',
                        url  : '/docs/templates/uiError.doc.html'
                    },
                    {
                        name : 'httpError',
                        id   : 'httpError',
                        url  : '/docs/templates/ui-http-error.doc.html'
                    },
                    {
                        name : 'uiThumbnailGenerator',
                        id   : 'thumbnailGenerator',
                        url  : '/docs/templates/uiThumbnailGenerator.doc.html'
                    },
                    {
                        name : 'featureToggle',
                        id   : 'featureToggle',
                        url  : '/docs/templates/uiFeatureToggle.doc.html'
                    }
                ]
            }
        },
        {
            header  : 'Directives',
            id      : 'Directives',
            content : {
                url   : '/docs/templates/directives.html',
                pages : [
                    {
                        name : 'ui-accordion',
                        id   : 'Accordion',
                        url  : '/docs/templates/ui-accordion.doc.html'
                    },
                    {
                        name : 'ui-align',
                        id   : 'Align',
                        url  : '/docs/templates/ui-align.doc.html'
                    },
                    {
                        name : 'ui-button',
                        id   : 'Button',
                        url  : '/docs/templates/ui-button.doc.html'
                    },
                    {
                        name : 'ui-checkbox',
                        id   : 'Checkbox',
                        url  : '/docs/templates/ui-checkbox.doc.html'
                    },
                    {
                        name : 'ui-input',
                        id   : 'Input',
                        url  : '/docs/templates/ui-input.doc.html'
                    },
                    {
                        name : 'ui-input-container',
                        id   : 'InputContainer',
                        url  : '/docs/templates/ui-input-container.doc.html'
                    },
                    {
                        name : 'ui-textarea',
                        id   : 'Textarea',
                        url  : '/docs/templates/ui-textarea.doc.html'
                    },
                    {
                        name : 'ui-select',
                        id   : 'Select',
                        url  : '/docs/templates/ui-select.doc.html'
                    },
                    {
                        name : 'ui-radio',
                        id   : 'Radio',
                        url  : '/docs/templates/ui-radio.doc.html'
                    },
                    {
                        name : 'ui-slider',
                        id   : 'Slider',
                        url  : '/docs/templates/ui-slider.doc.html'
                    },
                    {
                        name : 'ui-toggle',
                        id   : 'Toggle',
                        url  : '/docs/templates/ui-toggle.doc.html'
                    },
                    {
                        name : 'ui-main-menu',
                        id   : 'Menu',
                        url  : '/docs/templates/ui-main-menu.doc.html'
                    },
                    {
                        name : 'ui-avatar',
                        id   : 'Avatar',
                        url  : '/docs/templates/ui-avatar.doc.html'
                    },
                    {
                        name : 'ui-project-tile',
                        id   : 'ProjectTile',
                        url  : '/docs/templates/ui-project-tile.doc.html'
                    },
                    {
                        name : 'ui-dialog',
                        id   : 'Dialog',
                        url  : '/docs/templates/ui-dialog.doc.html'
                    },
                    {
                        name : 'ui-popup',
                        id   : 'Popup',
                        url  : '/docs/templates/ui-popup.doc.html'
                    },
                    {
                        name : 'ui-tab',
                        id   : 'Tab',
                        url  : '/docs/templates/ui-tab.doc.html'
                    },
                    {
                        name : 'ui-tile-container',
                        id   : 'TileContainer',
                        url  : '/docs/templates/ui-tile-container.doc.html'
                    },
                    {
                        name : 'ui-draggable/ui-droppable',
                        id   : 'DragDrop',
                        url  : '/docs/templates/ui-draggable.doc.html'
                    },
                    {
                        name : 'ui-file-upload',
                        id   : 'FileUpload',
                        url  : '/docs/templates/ui-file-upload.doc.html'
                    },
                    {
                        name : 'ui-file-select',
                        id   : 'FileSelect',
                        url  : '/docs/templates/ui-file-select.doc.html'
                    },
                    {
                        name : 'ui-tooltip',
                        id   : 'Tooltip',
                        url  : '/docs/templates/ui-tooltip.doc.html'
                    },
                    {
                        name : 'ui-thumbnail',
                        id   : 'Thumbnail',
                        url  : '/docs/templates/ui-thumbnail.doc.html'
                    },
                    {
                        name : 'ui-pill',
                        id   : 'Pill',
                        url  : '/docs/templates/ui-pill.doc.html'
                    },
                    {
                        name : 'ui-blank-state',
                        id   : 'BlankState',
                        url  : '/docs/templates/ui-blank-state.doc.html'
                    },
                    {
                        name : 'ui-carousel',
                        id   : 'Carousel',
                        url  : '/docs/templates/ui-caroys.doc.html'
                    },
                    {
                        name : 'ui-study-tile',
                        id   : 'StudyTile',
                        url  : '/docs/templates/ui-study-tile.doc.html'
                    },
                    {
                        name : 'ui-text-editor',
                        id   : 'TextEditor',
                        url  : '/docs/templates/ui-text-editor.doc.html'
                    },
                    {
                        name : 'ui-heat-map',
                        id   : 'HeatMap',
                        url  : '/docs/templates/ui-heat-map.doc.html'
                    },
                    {
                        name : 'ui-pie-chart',
                        id   : 'Pie',
                        url  : '/docs/templates/ui-pie-chart.doc.html'
                    },
                    {
                        name : 'ui-progress-bar',
                        id   : 'ProgressBar',
                        url  : '/docs/templates/ui-progress-bar.doc.html'
                    },
                    {
                        name : 'ui-busy-indicator',
                        id   : 'BusyIndicator',
                        url  : '/docs/templates/ui-busy-indicator.doc.html'
                    },
                    {
                        name : 'ui-zoom',
                        id   : 'Zoom',
                        url  : '/docs/templates/ui-zoom.doc.html'
                    },
                    {
                        name : 'ui-sankey-diagram',
                        id   : 'SankeyDiagram',
                        url  : '/docs/templates/ui-sankey-diagram.doc.html'
                    },
                    {
                        name : 'ui-onboarding',
                        id   : 'OnBoarding',
                        url  : '/docs/templates/ui-onboarding.doc.html'
                    },
                    {
                        name : 'ui-video',
                        id   : 'Video',
                        url  : '/docs/templates/ui-video.doc.html'
                    },
                    {
                        name : 'ui-video-slider',
                        id   : 'VideoSlider',
                        url  : '/docs/templates/ui-video-slider.doc.html'
                    },
                    {
                        name    : 'ui-handy-tip',
                        id      : 'handyTip',
                        url     : '/docs/templates/ui-handy-tip.doc.html'
                    }
                ]
            }
        }
    ];
    var self = {
        sections : sections
    };
    return self;
};
