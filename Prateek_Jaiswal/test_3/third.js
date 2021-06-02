// JavaScript source code
const third = function (arr, x) {
    var i;
    var count;
    count = 0;
    arr.sort((a, b) => b - a);

    for (i = 0; i < x; ++i) {
        if (arr[i] > arr[i + 1]) {
            count = count + 1;
        }


        if (count === 3)
        {
           return arr[i];
        }
    }

}

module.exports = { third };
