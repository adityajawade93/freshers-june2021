function printDuplicate(arr, ans_arr) {
    
    if(arr==null || Array.isArray(arr)===false){
        return false;
    }
    let arr_size=arr.length

    if(arr_size<=1){
        return false; // No dulicates possible
    }

    for (let i = 0; i < arr_size - 1; i++) {
        if (arr[i] === arr[i + 1]) {
            ans_arr.push(arr[i])
            while (arr[i] === arr[i + 1]) {
                i++;
            }
        }
    }
    if (ans_arr.length > 0) {
        return true;
    }
    else {
        return false;
    }
}

// Driver Code
let arr = [1,5,2,3,4,5,6];
let arr_size = arr.length;
arr.sort(function (a, b) { return a - b })
let ans_arr = []
if(printDuplicate(arr, ans_arr)==true)
console.log(ans_arr)
else console.log("All elements are Unique")

module.exports={printDuplicate}
