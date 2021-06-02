function binarySearch(start, end, target){
    while(start<=end) {
        let mid=Math.floor((start+end)/2);

        if(v[mid]===target)
            return true;
        else if(v[mid]>target)
            end=mid-1
        else
            start=mid+1
    }
    return false;
}

let v=[1,2,3,4,5,6,7,8,9,10]
let target=20

let start=0, end=v.length-1
let answer=binarySearch(start,end,target);

if(answer)
    console.log("Value exists in Array.")
else 
    console.log("Value does not exist in Array.")