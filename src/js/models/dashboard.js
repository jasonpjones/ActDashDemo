/* globals ActDash, $, _, document, localStorage */

ActDash.Dashboard = function () {
    this.dashUtils = new ActDash.DashUtils();
    this.grid = null;
    this.cells = [];
    this.charts = new ActDash.Charts();
};

ActDash.Dashboard.prototype = {
    initialize: function () {
        this._initGrid();
        this.deserialize();
        this._setupEventBinding();
        this.disableEditing();
    },
    enableEditing: function () {
        this.grid.enable();
        this.turnOnCustomHover();
    },
    disableEditing: function () {
        this.grid.disable();
        this.turnOffCustomHover();
    },
    addNewCell: function () {
        var nbrIdx = this.dashUtils.findNextAvailableIndex(this.cells),
            nextY = this.dashUtils.findNextYCoordinate(this.cells);
        this._addCell(nbrIdx, 0, nextY, 2, 2);
    },
    addChart: function (title, cellIdx, chartType, chartId, pxHeight, pxWidth) {
        this.charts.addChart(title, cellIdx, chartType, chartId, pxHeight, pxWidth);
        $('#btn-save').button('option', 'disabled', false);
    },
    turnOnCustomHover: function () {
        $(document).on("mouseenter", ".grid-stack-item", function () {
            $(this).find(".hover-vis").show();
        }).on("mouseleave", ".grid-stack-item", function () {
            $(this).find(".hover-vis").hide();
        });
    },
    turnOffCustomHover: function () {
        $(document).off("mouseenter", ".grid-stack-item");
    },
    saveCells: function () {
        var _dash = this;
        this.cells = [];
        $('.grid-stack-item').each(function () {
            _dash.cells.push(new ActDash.DashboardCell($(this)));
        });
        $('#btn-add-chart').button('option', 'disabled', this.cells.length === 0);
    },
    serialize: function () {
        $('#btn-save').button('option', 'disabled', true);
        var out = _.map(this.cells, function (cell) {
            var obj = {
                idx: cell.nbrIdx,
                di: { x: cell.x, y: cell.y, h: cell.gsHeight, w: cell.gsWidth }
            };
            if (cell.chartInfo) {
                obj.ci = { cid: cell.chartInfo.id, ttl: cell.chartInfo.title, type: cell.chartInfo.type, w: cell.chartInfo.width, h: cell.chartInfo.height };
            }
            return obj;
        });
        localStorage.setItem("actdashdemo_data", JSON.stringify(out));
    },
    deserialize: function () {
        var dashData = localStorage.getItem("actdashdemo_data");
        if (!dashData) {
            return;
        }
        var _cells = JSON.parse(dashData);
        _.forEach(_cells, function (c) {
            this._addCell(c.idx, c.di.x, c.di.y, c.di.w, c.di.h);
            if (c.ci) {
                this.addChart(c.ci.ttl, c.idx, c.ci.type, c.ci.cid, c.ci.h, c.ci.w, false);
            }
        }.bind(this));

        this.saveCells();
    },
    getIndicesAndSizes: function () {
        return this.dashUtils.getIndicesAndSizes(this.cells);
    },
    _addCell: function (idx, x, y, height, width) {
        var dashHtml = this.dashUtils.createCellElement(idx);
        this.grid.addWidget(dashHtml, x, y, height, width);
    },
    _initGrid: function () {
        var options = {
            cellHeight: 80,
            verticalMargin: 10
        };
        $('.grid-stack').gridstack(options);
        this.grid = $('.grid-stack').data('gridstack');
    },
    _setupEventBinding: function () {

        this.turnOnCustomHover();

        $('.grid-stack').on('change', function (event, items) {//items is not reliable - gridstack defect.
            this.saveCells();
            $('#btn-save').button('option', 'disabled', false);
        }.bind(this));

        $(document).on("click", ".delete-can", function (e) {
            var el = $(e.target).closest('.grid-stack-item');
            this.grid.removeWidget(el, true);
        }.bind(this));
    }
};