/* globals $, _, ActDash */
//requires lodash

ActDash.DashUtils = function () {
};

ActDash.DashUtils.prototype = {
    createCellElement: function (nbrIdx) {
        var chartDivId = "chart-div-" + nbrIdx,
            deleteImgUrl = "images/trash_can-512.png";

        // Generate the HTML for the widget. Only the first and last div are required for gridstack. The rest is custom a delete div, chart-index (numbered circle) and placeholder for a plotly chart.
        var dashHtml = ($("<div>", { class: "grid-stack-item-content", 'data-nbr-idx': nbrIdx }));
        dashHtml.append($("<div>", { class: "hover-vis delete-can", }).append($("<img>", { src: deleteImgUrl, title: "Delete" })));
        dashHtml.append($("<div>", { class: "hover-vis cell-number number-circle" }).html(nbrIdx));
        dashHtml.append($("<div>", { id: chartDivId, class: "chart-div" }));
        return $("<div>").append(dashHtml); //Wrap the whole thing in a div
    },
    findNextAvailableIndex: function (arr) {
        var nextIdx = 1,
            matchIdx,
            isInArray = true,
            comparer = function (item) { return item.nbrIdx === nextIdx; };

        while (isInArray) {
            matchIdx = _.findIndex(arr, comparer);
            if (matchIdx === -1) {
                isInArray = false;
            }
            else {
                nextIdx++;
            }
        }
        return nextIdx;
    },
    findNextYCoordinate: function (arr) {
        var nextY = 0,
            bot;
        _.forEach(arr, function (item) {
            bot = item.y + item.gsHeight;
            nextY = bot > nextY ? bot : nextY;
        });
        return nextY;
    },
    getIndicesAndSizes: function (arr) {
        return _.sortBy(_.map(arr, function (i) {
            return { nbrIdx: i.nbrIdx, size: { h: i.pxHeight, w: i.pxWidth } };
        }), 'nbrIdx');
    }
};