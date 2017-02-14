/* globals ActDash, $, _, document*/

ActDash.Dashboard = function () {
    this.dashUtils = new ActDash.DashUtils();
    this.grid = null;
    this.cells = [];
};


ActDash.Dashboard.prototype = {
    initialize: function () {
        this._initGrid();
        this._setupEventBinding();
    },
    addNew: function () {
        var nbrIdx = this.dashUtils.findNextAvailableIndex(this.cells),
            chartDivId = "chart-div-" + nbrIdx,
            deleteImgUrl = "images/trash_can-512.png",
            nextY = this.dashUtils.findNextXCoordinate(this.cells);

        // Generate the HTML for the widget. Only the first and last grid are required for gridstack. The rest is custom delete div, chart-index and placeholder for a plotly chart.
        var dashHtml = ($("<div>", { class: "grid-stack-item-content", 'data-nbr-idx': nbrIdx }));
        dashHtml.append($("<div>", { class: "hover-vis delete-can", }).append($("<img>", { src: deleteImgUrl, title: "Delete" })));
        dashHtml.append($("<div>", { class: "hover-vis cell-number number-circle" }).html(nbrIdx));
        dashHtml.append($("<div>", { id: chartDivId, class: "chart-div" }));
        dashHtml = $("<div>").append(dashHtml); //Wrap the whole thing in a div

        this.grid.addWidget(dashHtml, 0, nextY, 2, 2);
    },
    serialize: function () {
        var _dash = this;
        this.cells = [];
        $('.grid-stack-item').each(function () {
            var $this = $(this),
                nbrIdx = $this.find(".grid-stack-item-content").data('nbrIdx'),
                height = $this.data('gsHeight'),
                width = $this.data('gsWidth'),
                x = $this.data('gsX'),
                y = $this.data('gsY');
            _dash.cells.push({ nbrIdx: nbrIdx, el: this, x: x, y: y, height: height, width: width });
        });

    },
    getCellIndices: function() {
        return this.dashUtils.getIndices(this.cells);
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

        $(document).on("mouseenter", ".grid-stack-item", function () {
            $(this).find(".hover-vis").show();
        }).on("mouseleave", ".grid-stack-item", function () {
            $(this).find(".hover-vis").hide();
        });

        $('.grid-stack').on('change', function (event, items) {//items is not reliable - gridstack defect.
            this.serialize();   
        }.bind(this));

        $(document).on("click", ".delete-can", function (e) {
            var el = $(e.target).closest('.grid-stack-item');
            this.grid.removeWidget(el, true);
        }.bind(this));
    }
};