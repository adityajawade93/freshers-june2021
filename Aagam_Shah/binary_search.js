var arr=[10,15,18,19,25,29,34,47,58,69,78,89,99,100]

function binary_search(number,l,r){
    if(l<=r){
        let mid = Math.floor((r+l)/2)
        // console.log(mid)
        if(arr[mid] == number){
            return mid;
        }
        if(arr[mid] < number){
            return binary_search(number,mid+1,r)
        }
        return binary_search(number,l,mid-1);
    }
    return -1;
}
let n = arr.length
// let index
if((index = binary_search(11,0,n-1)) != -1)
    console.log("Element is present at index : " + index);
else
    console.log("Element is not present in array")

if((index = binary_search(69,0,n-1)) != -1)
    console.log("Element is present at index : " + index);
else
    console.log("Element is not present in array")