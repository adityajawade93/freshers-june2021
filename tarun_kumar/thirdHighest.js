function thirdHighest(arr) {
    if(arr==null || Array.isArray(arr)===false){
        return false;
    }
    let arr_size=arr.length
    if(arr_size<=2){
        return false; // 3rd highest not possible
    }
    let first = arr[0], second = -1000000000, third = -1000000000

    for (let i = 1; i < arr_size; i++) {

        if (arr[i] > first) {
            third = second
            second = first
            first = arr[i]
        }
        else if (arr[i] > second) {
            third = second
            second = arr[i]
        }
        else if (arr[i] > third)
            third = arr[i]
    }
    console.log("Third Highest element in array= " + third)

    if(third!==-1000000000)
    return true
    else return false
}

let arr = [1,1,1,1,2,3]
let finalAns = thirdHighest(arr)


module.exports = { thirdHighest }

