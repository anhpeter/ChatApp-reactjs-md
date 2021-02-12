const Helper = {
    ucFirst: (str) => {
        if (str) {
            return str.slice(0, 1).toUpperCase() + str.slice(1);
        }
    },

    isFn: fn => typeof fn === 'function'
}

export default Helper;