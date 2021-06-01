function search(arr,num)
{   var len=arr.length;
    var start=0,end=len-1;
    while(start<end)
    {
        var mid=(start+end)/2;
        if(arr[mid]===num) return true;
        if(arr[mid]>num){
            end=mid-1;
        }
        else{
            start=mid+1;
        }
    }
    return false;
}

let arr=[1,2,3,4,5,6,7];
let num=4;
let res=search(arr,num);
console.log(res);