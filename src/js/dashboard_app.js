/* globals $, _, ActDash:true */


if(typeof ActDash === 'undefined') {
    ActDash = function () { };  //the ActDash:true above tell jshint that this assignment is OK. Otherwise you get a Read Only warning
}

ActDash.DashboardApp = function () {
    //TODO: verify these are all needed
    this.dashboard = new ActDash.Dashboard();
    this.charts = new ActDash.Charts();
    this.addChartDialog = null;
};

ActDash.DashboardApp.prototype = {
    initialize: function () {
        this.dashboard.initialize();
        this._initDialogs();
        this._setupEventBinding();
    },
    _initDialogs: function () {
        var _charts = this.charts;
        this.addChartDialog = $("#dialog-form").dialog({
            autoOpen: false,
            modal: true,
            width: 'auto',
            buttons: {
                "Add Chart": function () {
                    _charts.addChart(
                        $('#chart-title').val(),
                        $('#cell-number-select').val(),
                        $('#chart-type-select').val(),
                        $('#chart-data-select').val(),
                        $('#chart-height').val(),
                        $('#chart-width').val()
                        );
                    $(this).dialog("close");
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


