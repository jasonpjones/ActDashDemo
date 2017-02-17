describe('dashboard-app', function () {

    describe('construction', function () {
        var dashApp;

        beforeEach(function () {
            dashApp = new ActDash.DashboardApp();
        });

        it("should instantiate a dashboard object", function () {
            expect(dashApp.dashboard).toBeDefined();
        });

        it("should instantiate a charts object", function () {
            expect(dashApp.charts).toBeDefined();
        });
    });

});