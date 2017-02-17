/* requires lodash */

describe('dash_utils', function () {

    var dashUtils;
    beforeEach(function () {
        dashUtils = new ActDash.DashUtils();
    });

    describe('findNextAvailableIndex', function () {

        it('should return 1 if the array is empty', function () {
            var arr = [],
                result = dashUtils.findNextAvailableIndex(arr);
            expect(result).toEqual(1);
        });

        it("should return one higher than the last index if there are no missing values", function () {
            var arr = [
                { nbrIdx: 1 },
                { nbrIdx: 2 },
                { nbrIdx: 3 }
            ],
                result = dashUtils.findNextAvailableIndex(arr);
            expect(result).toEqual(4);
        });

        it("should return one higher than the last index if there are no missing values but the values are in not sequential", function () {
            var arr = [
                { nbrIdx: 4 },
                { nbrIdx: 3 },
                { nbrIdx: 5 },
                { nbrIdx: 2 },
                { nbrIdx: 1 }
            ],
                result = dashUtils.findNextAvailableIndex(arr);
            expect(result).toEqual(6);
        });

        it("should return the lowest missing number in the sequence - 1", function () {
            var arr = [
                { nbrIdx: 2 },
                { nbrIdx: 3 },
                { nbrIdx: 4 }
            ],
                result = dashUtils.findNextAvailableIndex(arr);
            expect(result).toEqual(1);
        });

        it("should return the lowest missing number in the sequence - 2", function () {
            var arr = [
                { nbrIdx: 1 },
                { nbrIdx: 2 },
                { nbrIdx: 4 },
                { nbrIdx: 5 }
            ],
                result = dashUtils.findNextAvailableIndex(arr);
            expect(result).toEqual(3);
        });

        it("should return the lowest missing number in the sequence when the items are not in order", function () {
            var arr = [
                { nbrIdx: 5 },
                { nbrIdx: 2 },
                { nbrIdx: 3 },
                { nbrIdx: 1 }
            ],
                result = dashUtils.findNextAvailableIndex(arr);
            expect(result).toEqual(4);
        });



    });

    describe('findNextYCoordinate', function () {

        it('should return 0 if there are no elements in the array', function () {
            var arr = [],
                result = dashUtils.findNextYCoordinate(arr);
            expect(result).toEqual(0);
        });

        it('should find the point below the lowest cell bottom', function () {
            var arr = [
                { y: 0, gsHeight: 1 },
                { y: 1, gsHeight: 2 },
                { y: 3, gsHeight: 2 }
            ],
                result = dashUtils.findNextYCoordinate(arr);
            expect(result).toEqual(5);

        });

        it('should find the point below the lowest cell bottom when the cells are in no particular order', function () {
            var arr = [
                { y: 2, gsHeight: 1 },
                { y: 4, gsHeight: 2 },
                { y: 0, gsHeight: 2 }
            ],
             result = dashUtils.findNextYCoordinate(arr);
            expect(result).toEqual(6);
        });

    });

    describe('getIndicesAndSizes', function () {

        it("should return an empty array if an empty array is passed in", function () {
            var arr = [],
                result = dashUtils.getIndicesAndSizes(arr);
            expect(result).toEqual([]);
        });

        it("should return an array containing index and size info - basic", function () {
            var arr = [
                { nbrIdx: 1, pxHeight: 24, pxWidth: 30 },
                { nbrIdx: 2, pxHeight: 41, pxWidth: 18 },
                { nbrIdx: 3, pxHeight: 50, pxWidth: 60 }
            ],
            result = dashUtils.getIndicesAndSizes(arr);
            expect(result).toEqual([
                { nbrIdx: 1, size: { h: 24, w: 30 } },
                { nbrIdx: 2, size: { h: 41, w: 18 } },
                { nbrIdx: 3, size: { h: 50, w: 60 } }
            ]);
        });

        it("should return an array containing index and size info - sorting ascending", function () {
            var arr = [
                { nbrIdx: 4, pxHeight: 10, pxWidth: 20 },
                { nbrIdx: 2, pxHeight: 25, pxWidth: 35 },
                { nbrIdx: 5, pxHeight: 5, pxWidth: 15 },
                { nbrIdx: 1, pxHeight: 30, pxWidth: 40 }
            ],
            result = dashUtils.getIndicesAndSizes(arr);
            expect(result).toEqual([
                { nbrIdx: 1, size: { h: 30, w: 40 } },
                { nbrIdx: 2, size: { h: 25, w: 35 } },
                { nbrIdx: 4, size: { h: 10, w: 20 } },
                { nbrIdx: 5, size: { h: 5, w: 15 } }
            ]);
        });

    });

});