let result = [];

function flattenArray(arr) {
    if (Array.isArray(arr)) {
        arr.forEach(element => {
            flattenArray(element);
        });
    }
    else result.push(arr);
}

const arr = [1, 1, [2, 2], [[3, [4], 3], 2]]

flattenArray(arr);
console.log(result);

