function flatten(arr){
    let flattenedArray = arr.flat(Infinity);
    return flattenedArray;
}

// const arr = [1, 2, [3, [4, 5, [6]]], 7, 8];
module.exports = flatten;
