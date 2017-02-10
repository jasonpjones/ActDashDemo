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

        it("should instantiate a chart utils object", function () {
            expect(dashApp.chartUtils).toBeDefined();
        });

        it("should instantiate a API data object", function () {
            expect(dashApp.apiData).toBeDefined();
        });




    });




});