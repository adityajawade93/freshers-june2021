const binary_search=function(arr,left,right,value)
{
    const isSorted = arr => arr.every((v,i,a) => !i || a[i-1] <= v);
    if(isSorted(arr)==false)
    {
        return "Not Sorted";
    }
    if(Number.isInteger(arr[0])==false)return "not interger";
    if(left>right)return "not correct indices";
    var mid=left+Math.floor((right-left)/2);
    console.log(mid);
    if(arr[mid]==value) return "yes";
    if(left>=right) return "no";
    if(arr[mid]>value)
    {
        right=mid;
    }
    else left=right;
    return binary_search(arr,left,right,value);
}
module.exports=binary_search
console.log(binary_search([1,4,5,6,8],0,4,8));