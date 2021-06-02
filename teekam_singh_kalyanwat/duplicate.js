//considering sorted array
var arr=[1,2,3,3,4,4,4,5,5,6,7]
var len=arr.length;
var ind=false;
for(let i=1;i<len;i++)
{
    if(arr[i]===arr[i-1])
    {
        if(!ind){
         console.log(arr[i]);
         ind=true;
        }
    }
    else{
        ind=false;
    }
}