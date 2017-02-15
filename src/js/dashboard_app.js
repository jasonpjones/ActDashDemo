/* globals $, _, ActDash:true */


if(typeof ActDash === 'undefined') {
    ActDash = function () { };  //the ActDash:true above tell jshint that this assignment is OK. Otherwise you get a Read Only warning
}

ActDash.DashboardApp = function () {
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
        var $sel = $("#cell-number-select"),
            lastVal = $sel.val();
        
        $sel.off('change');

        $sel.children().remove();

        var indicesAndSizes = this.dashboard.getIndicesAndSizes();
        _.forEach(indicesAndSizes, function (o) {
            $sel.append($('<option></option>').attr('value', o.nbrIdx).text(o.nbrIdx));
        });

        $sel.on('change', function () {
            var val = parseInt($(this).val()),  //dangerous?
                idxAndSize = _.find(indicesAndSizes, function (o) { return o.nbrIdx === val; });
            $('#chart-height').val(idxAndSize.size.h);
            $('#chart-width').val(idxAndSize.size.w);
        });

        var selArrItem = _.find(indicesAndSizes, function (o) { return o.nbrIdx === lastVal; }) || indicesAndSizes[0];
        $sel.val(selArrItem.nbrIdx);
        $sel.trigger('change'); //start with the right values


        this.addChartDialog.dialog("open");


        //TODO: Keep the selected index if it is still available
        // Create an array of objects that tracks the indexes and the suggested height and width


    },
    _setupEventBinding: function () {
        $("#btn-add-chart").button().click(this._showAddChartDialog.bind(this));
        $("#btn-add-cell").button().click(function () {
            this.dashboard.addNew();
        }.bind(this));
    }
};


