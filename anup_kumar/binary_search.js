
function binarySearch(arr, value){
    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
        let middle = Math.floor((start + end) / 2);

        if (arr[middle] === value) {
            // found the key
            return middle;
        } else if (arr[middle] < value) {
            // continue searching to the right
            start = middle + 1;
        } else {
            // search searching to the left
            end = middle - 1;
        }
    }
	// key wasn't found
    return -1;
}

// Driver code
let arr = [1, 3, 5, 7, 8, 9];
let value = 5;

if (binarySearch(arr, value)!=-1)
	console.log("yes")
else console.log("no")

