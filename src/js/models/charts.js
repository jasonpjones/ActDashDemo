/* globals $, ActDash, Plotly */

ActDash.Charts = function () {
    this.apiData = new ActDash.APIData();
    this.chartUtils = new ActDash.ChartUtils();
};

ActDash.Charts.prototype = {
    addChart: function (title, cellIdx, chartType, chartId, gsHeight, gsWidth) {
        this.chartInfo = {
            target: 'chart-div-' + cellIdx,
            title: title,
            cellIdx: cellIdx,
            height: gsHeight,
            width: gsWidth
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
            this._chartDataRetrievalFailed
        );
    },
    _insertActivityByTypeBarChart: function (data) {
        var collated = this.chartUtils.countByProperty(data, "activityTypeName"),
            values = collated.map(function (o) { return o.count; }),
            labels = collated.map(function (o) { return o.value; }),
            chart = new ActDash.BarChart(this.chartInfo.title, values, labels, this.chartInfo.target, this.chartInfo.height, this.chartInfo.width);
        chart.draw();
    },
    _insertActivityByTypePieChart: function (data) {
        var collated = this.chartUtils.countByProperty(data, "activityTypeName"),
            values = collated.map(function (o) { return o.count; }),
            labels = collated.map(function (o) { return o.value; }),
            chart = new ActDash.PieChart(this.chartInfo.title, values, labels, this.chartInfo.target, this.chartInfo.height, this.chartInfo.width);
        chart.draw();
    },
    _insertActivityByTypeDonutChart: function(data) {
        var collated = this.chartUtils.countByProperty(data, "activityTypeName"),
            values = collated.map(function (o) { return o.count; }),
            labels = collated.map(function (o) { return o.value; }),
            chart = new ActDash.DonutChart(this.chartInfo.title, values, labels, this.chartInfo.target, this.chartInfo.height, this.chartInfo.width, 0.5);
        chart.draw();
    },
    _chartDataRetrievalFailed: function () {
        alert("Failed to get chart data");  //todo
    }
};


ActDash.Chart = function (title, target, height, width) {
    this.target = target;
    this.layout = {
        title: title,
        height: height,
        width: width
    };
};

ActDash.Chart.prototype = {
    draw: function (target) {
        Plotly.newPlot(this.target, this.data, this.layout);
    }
};

ActDash.PieChart = function (title, values, labels, target, height, width) {
    $.extend(true, this, new ActDash.Chart(title, target, height, width));
    this.data = [{
        values: values,
        labels: labels,
        type: 'pie',
    }];
};

ActDash.DonutChart = function (title, values, labels, target, height, width, holeSize) {
    $.extend(true, this, new ActDash.PieChart(title, values, labels, target, height, width));
    this.data[0].hole = holeSize;
};

ActDash.BarChart = function (title, values, labels, target, height, width) {
    $.extend(true, this, new ActDash.Chart(title, target, height, width));
    this.data = [{
        x: labels,
        y: values,
        type: 'bar'
    }];
};