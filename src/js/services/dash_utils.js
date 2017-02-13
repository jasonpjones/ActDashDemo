/* globals _, ActDash */
//requires lodash

ActDash.DashUtils = function () {
};

ActDash.DashUtils.prototype = {
    findNextAvailableIndex: function (arr) {
        var nextIdx = 1,
            matchIdx,
            isInArray = true,
            comparer = function (item) { return item.nbrIdx === nextIdx; };

        while (isInArray) {
            matchIdx = _.findIndex(arr, comparer);
            if (matchIdx === -1) {
                isInArray = false;
            }
            else {
                nextIdx++;
            }
        }
        return nextIdx;
    },
    findNextXCoordinate: function (arr) {
        var nextY = 0,
            bot;
        _.forEach(arr, function (item) {
            bot = item.y + item.height;
            nextY = bot > nextY ? bot : nextY;
        });
        return nextY;
    },
    getIndices: function (arr) {
        return _.sortBy(_.map(arr, 'nbrIdx'));
    }
};