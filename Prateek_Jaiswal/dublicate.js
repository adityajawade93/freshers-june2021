// JavaScript source code
var arr = [1, 2, 3, 4, 4, 5, 6, 7, 7]

var i;
var j;
for (i = 0; i <=8; ++i) {

    for (j = i + 1; j <= 8; ++j) {

        if (arr[i] === arr[j]) {
            console.log(arr[i]);
            break;
        }
    }

}