const recursiveFunction = function (arr, x, start, end) {
    if(typeof(arr)!=='object') return 'invalid input';
    if (start > end) return false;

    let mid = Math.floor((start + end) / 2);

    if (arr[mid] === x) return true;

    if (arr[mid] > x)
        return recursiveFunction(arr, x, start, mid - 1);
    else
        return recursiveFunction(arr, x, mid + 1, end);
}

module.exports = { recursiveFunction };

// jatin