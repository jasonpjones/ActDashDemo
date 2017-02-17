/* globals $, _, ActDash:true */


if(typeof ActDash === 'undefined') {
    ActDash = function () { };  //the ActDash:true above tell jshint that this assignment is OK. Otherwise you get a Read Only warning
}

ActDash.DashboardApp = function () {
    this.dashboard = new ActDash.Dashboard();
    this.addChartDialog = null;
};

ActDash.DashboardApp.prototype = {
    initialize: function () {
        this._initDialogs();
        this._setupEventBinding();  //has to happen before dashboard initialize because it expects the buttons to have been made jqui buttons.
        this.dashboard.initialize();
    },
    _initDialogs: function () {
        var _dashboard = this.dashboard;
        this.addChartDialog = $("#dialog-form").dialog({
            autoOpen: false,
            modal: true,
            width: 'auto',
            buttons: {
                "Add Chart": function () {
                    _dashboard.addChart(
                        $('#chart-title').val(),
                        $('#cell-number-select').val(),
                        $('#chart-type-select').val(),
                        $('#chart-data-select').val(),
                        $('#chart-height').val(),
                        $('#chart-width').val()
                        );
                    _dashboard.saveCells();
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
            $('#chart-height').val(idxAndSize.size.h - 10);
            $('#chart-width').val(idxAndSize.size.w - 20);
        });

        var selArrItem = _.find(indicesAndSizes, function (o) { return o.nbrIdx === lastVal; }) || indicesAndSizes[0];
        $sel.val(selArrItem.nbrIdx);
        $sel.trigger('change'); //start with the right values

        this.addChartDialog.dialog("open");

    },
    _setupEventBinding: function () {
        $("#btn-add-chart").button().click(this._showAddChartDialog.bind(this));
        $("#btn-add-cell").button().click(function () {
            this.dashboard.addNewCell();
        }.bind(this));
        $("#btn-save").button().click(function () {
            this.dashboard.serialize();
        }.bind(this));
    }
};


