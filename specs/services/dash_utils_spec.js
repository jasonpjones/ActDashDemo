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

    describe('findNextXCoordinate', function () {

        it('should return 0 if there are no elements in the array', function () {
            var arr = [],
                result = dashUtils.findNextXCoordinate(arr);
            expect(result).toEqual(0);
        });

        it('should find the point below the lowest cell bottom', function () {
            var arr = [
                { y: 0, height: 1 },
                { y: 1, height: 2 },
                { y: 3, height: 2 }
            ],
                result = dashUtils.findNextXCoordinate(arr);
            expect(result).toEqual(5);

        });

        it('should find the point below the lowest cell bottom when the cells are in no particular order', function () {
            var arr = [
                { y: 2, height: 1 },
                { y: 4, height: 2 },
                { y: 0, height: 2 }
            ],
             result = dashUtils.findNextXCoordinate(arr);
            expect(result).toEqual(6);
        });

    });

    describe('getIndices', function () {

        it('should return an empty array if it is passed an empty array', function () {
            var arr = [],
                result = dashUtils.getIndices(arr);
            expect(result).toEqual([]);
        });


        it('should return an array of all nbrIdx properties on the passed in array of objects', function () {
            var arr = [
                { nbrIdx: 1 },
                { nbrIdx: 2 },
                { nbrIdx: 3 }
            ],
            result = dashUtils.getIndices(arr);
            expect(result).toEqual([1,2,3]);
        });

        it('should return an array of all nbrIdx properties on the passed in array of objects sorted ascending', function () {
            var arr = [
                { nbrIdx: 5 },
                { nbrIdx: 3 },
                { nbrIdx: 4 },
                { nbrIdx: 1 },
                { nbrIdx: 7 }
            ],
            result = dashUtils.getIndices(arr);
            expect(result).toEqual([1, 3, 4, 5, 7]);
        });

    });

});