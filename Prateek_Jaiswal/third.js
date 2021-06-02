// JavaScript source code
var arr = [9, 8, 7, 8,8,4, 9, 2, 1]
var i;
var count;
count = 0;
arr.sort((a, b) => b - a);

for (i = 0; i <= 8; ++i)
{
    if (arr[i] > arr[i + 1]) {
        count = count + 1;
    }


    if (count === 3)
    {
        console.log(arr[i]);
    }
}