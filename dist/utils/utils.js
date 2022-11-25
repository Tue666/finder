"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomCode = exports.setFilterSortOption = exports.setFilterByDate = exports.includesInObject = void 0;
function includesInObject(array, key1, key2, condition) {
    return array.filter(item => {
        if (item[key1][key2].toString() === condition) {
            return item;
        }
    }).length > 0
        ? true
        : false;
}
exports.includesInObject = includesInObject;
function setFilterByDate(filterByDate) {
    if (!filterByDate) {
        return {};
    }
    const currentDate = new Date();
    const filterDate = {
        SEVEN_DAYS_AGO: {
            $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDay() - 1),
            $lte: currentDate,
        },
        THIRTY_DAYS_AGO: {
            $gte: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDay()),
            $lte: currentDate,
        },
        THIS_YEAR: {
            $gte: new Date(currentDate.getFullYear(), 1, currentDate.getDay()),
            $lte: currentDate,
        },
    };
    return Object.assign({}, filterDate[filterByDate]);
}
exports.setFilterByDate = setFilterByDate;
function setFilterSortOption(sortOption) {
    if (!sortOption) {
        return {};
    }
    const sortFilter = {
        AZ: { property: 'keyword', option: 'asc' },
        ZA: { property: 'keyword', option: 'desc' },
        AGE: { property: 'age', option: 1 },
    };
    return Object.assign({}, sortFilter[sortOption]);
}
exports.setFilterSortOption = setFilterSortOption;
function randomCode() {
    return +(Math.random() * (999999 - 100000) + 100000).toFixed(0);
}
exports.randomCode = randomCode;
//# sourceMappingURL=utils.js.map