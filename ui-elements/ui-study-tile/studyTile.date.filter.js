'use strict';

var m = require('moment');

// @ngInject
module.exports = function ($sce) {
    return function (myDate) {
        if (!myDate) return '';
        var d = m(myDate),
            fd = d.format('DD MMMM') + '&nbsp;' + d.format("'YY") + '&nbsp;&nbsp;&nbsp;' + d.format('HH:mm');
        return $sce.trustAsHtml(fd);
    };
};
