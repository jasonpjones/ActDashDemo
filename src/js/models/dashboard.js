/* globals ActDash */

ActDash.Dashboard = function () {
    this.cellCount = 0;
    this.grid = null;
    this.cells = [];
    this._init();
};


ActDash.Dashboard.prototype = {
    addNew: function () {
        this.cellCount++;
        var gridContentDiv = '<div class="grid-stack-item-content">';   //Needs an end tag
        var deleteDiv = '<div class="hover-vis delete-can"><img src="images/trash_can-512.png" title="Delete"></div>'
        var nbrDiv = '<div class="hover-vis cell-number number-circle">' + this.cellCount + '</div>'
        var divEndTag = '</div>'
        //TODO: construct like var $div = $("<div>", {id: "foo", "class": "a"}); and append them together.

        this.grid.addWidget($(gridContentDiv + deleteDiv + nbrDiv + divEndTag), 0, 0, 2, 2);
    },
    serialize: function(items)
    {
        console.log(items); //TODO
    },
    _init: function () {
        this._initGrid();
        this._setupEventBinding();
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

        $('.grid-stack').on('change', function (event, items) {
            //serializeWidgetMap(items);
        });

        $(document).on("click", ".delete-can", function (e) {
            var el = $(e.target).parent().parent()[0];
            this.grid.removeWidget(el, true);
        }.bind(this));
    }
}