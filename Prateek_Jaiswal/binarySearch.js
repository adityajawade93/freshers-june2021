// JavaScript source code
function binary_Search(items, value) {
    var Start = 0,
        End = items.length - 1,
        Mid = Math.floor((End + Start) / 2);

    while (items[Mid] != value && Start < End) {
        if (value < items[Mid]) {
            End = Mid - 1;
        }
        else if (value > items[Mid]) {
            Start = Mid + 1;
        }
        Mid = Math.floor((End + Start) / 2);
    }

    return (items[Mid] != value) ? -1 : Mid;
}
var items = [1, 2, 3, 4, 5, 7, 8, 9];
console.log(binary_Search(items, 8));

