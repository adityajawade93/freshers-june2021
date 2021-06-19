function binarySearch(v: Array<number>, target: number){
    if(Array.isArray(v) === false || v.length===0 || Number.isInteger(target)===false)
        return null
    let start: number = 0, end: number = v.length-1;
    while(start<=end) {
        let mid: number = Math.floor((start+end)/2);
        if(v[mid]===target)
            return true;
        else if(v[mid]>target)
            end=mid-1
        else
            start=mid+1
    }
    return false;
}
let v: Array<number>=[1,2,3,4,67,90,29,5,6,7,8,9,10,10,200,88,302,99,6];
let target: number=20
let answer=binarySearch(v,target);
if(answer)
    console.log("Value exists in Array.")
else 
    console.log("Value does not exist in Array.")
