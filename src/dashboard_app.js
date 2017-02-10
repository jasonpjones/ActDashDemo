/* globals $, ChartUtils, APIData, Plotly, ActDash:true */


if(typeof ActDash === 'undefined') {
    ActDash = function () { };  //the ActDash:true above tell jshint that this assignment is OK. Otherwise you get a Read Only warning
}

ActDash.DashboardApp = function () {
    this.dashboard = new ActDash.Dashboard();
    this.charts = new ActDash.Charts();
    this.chartUtils = new ActDash.ChartUtils;
    this.apiData = new ActDash.APIData();
    this.addChartDialog = null;

    this._init();
};

ActDash.DashboardApp.prototype = {
    _init: function () {
        this._initDialogs();
        this._setupEventBinding();
    },
    _initDialogs: function() {
        this.addChartDialog = $("#dialog-form").dialog({
            autoOpen: false,
            height: "600 important!",
            width: 300,
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
    _setupEventBinding: function () {
        $("#btn-add-chart").button().on("click", function () {
            this.addChartDialog.dialog("open");
        }.bind(this));
        $("#btn-add-cell").button().on("click", function () {
            this.dashboard.addNew();
        }.bind(this));
    }




}


var dashApp;
$(function() {
    dashApp = new ActDash.DashboardApp(); 
});