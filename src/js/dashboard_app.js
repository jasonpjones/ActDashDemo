/* globals $, _, Plotly, ActDash:true */


if(typeof ActDash === 'undefined') {
    ActDash = function () { };  //the ActDash:true above tell jshint that this assignment is OK. Otherwise you get a Read Only warning
}

ActDash.DashboardApp = function () {
    //TODO: verify these are all needed
    this.dashboard = new ActDash.Dashboard();
    this.charts = new ActDash.Charts();
    this.chartUtils = new ActDash.ChartUtils();
    this.apiData = new ActDash.APIData();
    this.addChartDialog = null;
};

ActDash.DashboardApp.prototype = {
    initialize: function () {
        this.dashboard.initialize();
        this._initDialogs();
        this._setupEventBinding();
    },
    _initDialogs: function () {
        this.addChartDialog = $("#dialog-form").dialog({
            autoOpen: false,
            height: "600 important!",
            width: 350,
            modal: true,
            buttons: {
                "Add Chart": function () {
                    alert("adding");
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }
        });
    },
    _showAddChartDialog: function () {
        $("#cell-number-select option").remove();
        var indices = this.dashboard.getCellIndices();
        _.forEach(indices, function (idx) {
            $("#cell-number-select").append($('<option></option>').attr('value', idx).text(idx));
        });
        this.addChartDialog.dialog("open");
    },
    _setupEventBinding: function () {
        $("#btn-add-chart").button().click(this._showAddChartDialog.bind(this));
        $("#btn-add-cell").button().click(function () {
            this.dashboard.addNew();
        }.bind(this));
    }
};


