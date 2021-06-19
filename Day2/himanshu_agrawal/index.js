// Function for binary search
function BinarySearch(arr,start,end,x){

    if(end>=start)
    {
         let m = parseInt(start+(end-start)/2);
         if(arr[m]==x)
           return m;
         if(x>arr[m])
          return BinarySearch(arr,m+1,end,x);
          else
           return BinarySearch(arr,start,m-1,x);

    }
    else
    return -1;
}


let arr = [1,2,3,4,6,9,11,17,18];
let index = BinarySearch(arr,0,arr.length,11);
console.log(index);


