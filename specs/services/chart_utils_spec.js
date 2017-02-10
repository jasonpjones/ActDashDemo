describe('chart-utils', function () {
    var chartUtils;

    beforeEach(function () {
        chartUtils = new ActDash.ChartUtils();
    });

    describe('countByProperty', function () {

        it("should return an empty array even if no data passed to it", function () {
            var result = chartUtils.countByProperty();
            expect(result).toBeDefined();
            expect(Array.isArray(result)).toBeTruthy();
            expect(result.length).toEqual(0);
        });

        it("should return an empty array if no matches are found", function () {
            var myArr = [
                { id: 1, type: "color" },
                { id: 2, type: "size" }
            ],
            result = chartUtils.countByProperty(myArr, "FOO");
            expect(result).toBeDefined();
            expect(Array.isArray(result)).toBeTruthy();
            expect(result.length).toEqual(0);

        });

        describe("one uniques value for the property was found", function () {
            var myArr,
                result;

            beforeEach(function () {
                myArr = [
                    { id: 1, type: "color" },
                    { id: 2, type: "color" },
                    { id: 2, foo: "bar" }
                ];
                result = chartUtils.countByProperty(myArr, "type");
            });

            it("should return an array with one object", function () {
                expect(result.length).toEqual(1);
            });

            it("should return an object with the correct property value", function () {
                expect(result[0].value).toEqual("color");
            });

            it("should return an object with the correct count of items with the unique value", function () {
                expect(result[0].count).toEqual(2);
            });

        });

        describe("mutltiple unique value for the property were found", function () {
            var myArr,
                result;

            beforeEach(function () {
                myArr = [
                    { id: 1, type: "fruit" },
                    { id: 2, type: "veggie" },
                    { id: 3, type: "fruit" },
                    { id: 4, type: "meat" },
                    { id: 5, type: "meat" },
                    { id: 6, type: "veggie" },
                    { id: 7, type: "veggie" },
                    { id: 8, type: "fruit" },
                    { id: 9, type: "meat" },
                    { id: 10, type: "veggie" },
                    { id: 11, type: "meat" },
                    { id: 12, type: "meat" },
                    { id: 13, type: "meat" },
                ];
                result = chartUtils.countByProperty(myArr, "type");
            });

            it("should provide an accurate count by unique value for the specified property", function () {
                expect(result.length).toEqual(3);
                console.log(typeof _.find);
                expect((_.find(result, function(o) {return o.value === 'fruit'})).count).toEqual(3);
                expect((_.find(result, function (o) { return o.value === 'meat' })).count).toEqual(6);
                expect((_.find(result, function (o) { return o.value === 'veggie' })).count).toEqual(4);
            });


        });

    });

});