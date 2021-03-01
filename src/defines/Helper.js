const Helper = {
    ucFirst: function (str) {
        if (str) {
            return str.slice(0, 1).toUpperCase() + str.slice(1);
        }
    },
    titleCase: function (str) {
        if (str) {
            let result;
            str = str.trim();
            let words = str.split(' ');
            if (words.length > 1)
                result = words.reduce((accumulator) => {
                    return this.ucFirst(accumulator) + ' ';
                })
            else result = this.ucFirst(words[0]);
            result = result.trim();
            return result;
        }
    },
    sleep: ms => new Promise(resolve => setTimeout(() => { resolve(); }, ms)),
    isFn: fn => typeof fn === 'function',
    format: function (string, ...params) {
        let result = string;
        if (string && params.length > 0) {
            for (let key in params) {
                result = result.replace(`{${key}}`, params[key]);
            }
        }
        return result;
    },
    getArrayOfFieldValue: function (items, field, type) {
        const arrayOfFieldValue = items.map((item) => {
            if (type === 'string') return item[field].toString();
            return item[field];
        })
        return arrayOfFieldValue;
    },
    arrayDiff: function (arr1, arr2) {
        let biggerArr;
        let smallerArr;
        let result = [];
        if (arr1.length > arr2.length) {
            biggerArr = arr1;
            smallerArr = arr2;
        }
        else {
            biggerArr = arr2;
            smallerArr = arr1;
        }
        biggerArr.forEach((item) => {
            if (smallerArr.indexOf(item) === -1) result.push(item);
        })
        return result;
    }
}

export default Helper;