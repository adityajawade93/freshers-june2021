var arr = [3,5,7,8,12,24,37];
var num = 24;
var c;
var end = arr.length-1;
var strt = 0;
while(strt<end)
{
    var mid = Math.floor(strt+end)/2;
    if(arr[mid]==num)
    {
        c=mid;
        break;
    }
    else if(arr[mid]<num)
        strt = mid+1;
    else if(arr[mid]>num)
        end = mid-1;
    else c=-1;
}
console.log(c);