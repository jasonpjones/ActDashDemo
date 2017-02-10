/* globals _, ActDash */
//requires lodash

ActDash.ChartUtils = function() {
}

ActDash.ChartUtils.prototype = {
    countByProperty: function(items, property) {
        
        if (!Array.isArray(items)) {
            return [];
        }

        var retVal = [];

        _.forEach(items, function(item) {
            if (item.hasOwnProperty(property)) {
                var val = item[property];
                var existing = _.find(retVal, function(el) {
                    return el.value === val;
                });
                if (existing) {
                    existing.count++;
                }
                else {
                    retVal.push({ value: val, count: 1 });
                }
            }
        });
        
        return retVal;
    }
};