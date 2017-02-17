/* globals ActDash, $ */

ActDash.DashboardCell = function ($el) {
    this.nbrIdx = $el.find(".grid-stack-item-content").data('nbrIdx');
    this.gsHeight = parseInt($el.attr('data-gs-height'));    //These are blocks not pixels, a common gridstack widget might be defined with width and height = 2, I'm sure it's configurable how many pixels that translates to.
    this.gsWidth = parseInt($el.attr('data-gs-width'));      // We use them for caching in local storage and determining the nextY position when a new item is added.
    this.pxHeight = $el.height();
    this.pxWidth = $el.width();
    this.x = parseInt($el.attr('data-gs-x'));
    this.y = parseInt($el.attr('data-gs-y'));

    var chartDiv = $el.find(".chart-div"),
        chartId = chartDiv.data("chartId");
    if (chartId) {
        this.chartInfo = {
            id: chartId,
            type: chartDiv.data('chartType'),
            title: chartDiv.data("title"),
            height: chartDiv.data("height"),
            width: chartDiv.data("width")
        };
    }
};