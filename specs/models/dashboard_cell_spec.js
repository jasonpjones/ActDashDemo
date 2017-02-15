describe("dashboard-cell", function () {

    it("should construct correctly from the passed in element", function () {

        var innerEl = $('<div>', { class: 'grid-stack-item-content', 'data-nbr-idx' : 4});
        var elAttrs = {
            'data-gs-height': 6,
            'data-gs-width' : 8,
            'data-gs-x': 2,
            'data-gs-y' : 3
        };
        var el = $("<div>", elAttrs);
        el.css({ 'height': '300px', 'width' : '400px' });
        el.append(innerEl);

        var cell = new ActDash.DashboardCell(el);
        expect(cell.nbrIdx).toEqual(4);
        expect(cell.gsHeight).toEqual(6);
        expect(cell.gsWidth).toEqual(8);
        expect(cell.x).toEqual(2);
        expect(cell.y).toEqual(3);
    });

});