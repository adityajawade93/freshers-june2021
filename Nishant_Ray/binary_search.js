let arr=[1,2,3,4,5,6,7];
arr.sort(function(a, b){return a-b}); // sort the array before binary search
let len=arr.length; //length of the array
let search_element=4; //element to be search
let flag=0;// varaiable to check whether searched element is in the array or not
let left=0,right=arr.length-1;

while(left<=right) // stopping condition
{
    let middle=(left+right)/2
    if(arr[middle]===search_element)  {
        console.log("element is found ");
        flag=1;
        break;
    }else if(arr[middle]<search_element){
        left=middle+1;
    }else{
        right=middle-1;
    }
}
if(flag===0){
   console.log("element is not found in the array");
}
