/* globals $, ActDash, Plotly */

ActDash.Charts = function () {
    this.apiData = new ActDash.APIData();
    this.chartUtils = new ActDash.ChartUtils();
    this.chartInfo = null;
};

ActDash.Charts.prototype = {
    addChart: function (title, cellIdx, chartType, chartId, pxHeight, pxWidth) {
        this.chartInfo = {
            target: 'chart-div-' + cellIdx,
            title: title,
            cellIdx: cellIdx,
            chartId: chartId,
            height: pxHeight,
            width: pxWidth
        };
        var api_call = "";
        var successFunction;
        switch (chartId) {
            case "activities-by-type":
                api_call = "Activities";
                switch (chartType) {
                    case("bar") :
                        successFunction = this._insertActivityByTypeBarChart.bind(this);
                        break;
                    case ("pie"):
                        successFunction = this._insertActivityByTypePieChart.bind(this);
                        break;
                    case ("donut"):
                        successFunction = this._insertActivityByTypeDonutChart.bind(this);
                        break;
                }
                break;
        }

        this.apiData.callApi(
            "GET",
            api_call,
            successFunction,
            this._chartDataRetrievalFailed.bind(this)
        );
    },
    _insertActivityByTypeBarChart: function (data) {
        var collated = this.chartUtils.countByProperty(data, "activityTypeName"),
            values = collated.map(function (o) { return o.count; }),
            labels = collated.map(function (o) { return o.value; }),
            chart = new ActDash.BarChart(this.chartInfo.title, this.chartInfo.target, this.chartInfo.chartId, values, labels, this.chartInfo.height, this.chartInfo.width);
        chart.draw();
    },
    _insertActivityByTypePieChart: function (data) {
        var collated = this.chartUtils.countByProperty(data, "activityTypeName"),
            values = collated.map(function (o) { return o.count; }),
            labels = collated.map(function (o) { return o.value; }),
            chart = new ActDash.PieChart(this.chartInfo.title, this.chartInfo.target, this.chartInfo.chartId, values, labels, this.chartInfo.height, this.chartInfo.width);
        chart.draw();
    },
    _insertActivityByTypeDonutChart: function(data) {
        var collated = this.chartUtils.countByProperty(data, "activityTypeName"),
            values = collated.map(function (o) { return o.count; }),
            labels = collated.map(function (o) { return o.value; }),
            chart = new ActDash.DonutChart(this.chartInfo.title, this.chartInfo.target, this.chartInfo.chartId, values, labels, this.chartInfo.height, this.chartInfo.width, 0.5);
        chart.draw();
    },
    _chartDataRetrievalFailed: function (xhr, txt, e) {
        $('#' + this.chartInfo.target).html("Data retrieval for this chart failed: " + e);
    }
};


ActDash.Chart = function (type, title, target, chartId, height, width) {
    this.type = type;
    this.target = target;
    this.chartId = chartId;
    this.layout = {
        title: title,
        height: height,
        width: width    
    };
};

ActDash.Chart.prototype = {
    draw: function (target) {
        Plotly.newPlot(this.target, this.data, this.layout);
        var divSel = "#" + this.target;
        $(divSel)           //sticking data elements on the div so we can serialize...
            .data('chartId', this.chartId)
            .data('title', this.layout.title)
            .data('chartType', this.type)
            .data('height', this.layout.height)
            .data('width', this.layout.width);
    }
};

ActDash.PieChart = function (title, target, chartId, values, labels, height, width) {
    $.extend(true, this, new ActDash.Chart('pie', title, target, chartId, height, width));
    this.data = [{
        values: values,
        labels: labels,
        type: 'pie',
    }];
};

ActDash.DonutChart = function (title, target, chartId, values, labels, height, width, holeSize) {
    $.extend(true, this, new ActDash.PieChart(title, target, chartId, values, labels, height, width));
    this.type = 'donut';
    this.data[0].hole = holeSize;
};

ActDash.BarChart = function (title, target, chartId, values, labels, height, width) {
    $.extend(true, this, new ActDash.Chart('bar', title, target, chartId, height, width));
    this.data = [{
        x: labels,
        y: values,
        type: 'bar'
    }];
};