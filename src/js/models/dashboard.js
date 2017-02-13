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
        var nbrIdx = this.dashUtils.findNextAvailableIndex(this.cells);
        var gridContentDiv = '<div><div class="grid-stack-item-content" data-nbr-idx="' + nbrIdx + '">';   //Needs an end tag
        var deleteDiv = '<div class="hover-vis delete-can"><img src="images/trash_can-512.png" title="Delete"></div>';
        var nbrDiv = '<div class="hover-vis cell-number number-circle">' + nbrIdx + '</div>';
        var divEndTag = '</div></div>';
        //TODO: construct like var $div = $("<div>", {id: "foo", "class": "a"}); and append them together.
        var nextY = this.dashUtils.findNextXCoordinate(this.cells);
        var el = this.grid.addWidget($(gridContentDiv + deleteDiv + nbrDiv + divEndTag), 0, nextY, 2, 2);
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

        $(document).on("mouseenter", ".grid-stack-item-content", function () {
            $(this).find(".hover-vis").show();
        }).on("mouseleave", ".grid-stack-item-content", function () {
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