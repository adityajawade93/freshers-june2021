{
let binary_search=function(arr,target){
    

    let l=0;
    let h=arr.length-1;
    
    while(l<=h){
        let mid=Math.floor(l+(h-l)/2);
        // console.log(mid);
        if(arr[mid]==target){
            return true;
        }
        else if(arr[mid]>target){
            h=mid-1;
            
        }
        else{
            l=mid+1;
        }
    }
    return false;
}

let arr=[2,3,6,8,34,56,78,89,105];
console.log(binary_search(arr,6));
console.log(binary_search(arr,4));
console.log(binary_search(arr,56));
console.log(binary_search(arr,109));
console.log(binary_search(arr,1));
console.log(binary_search(arr,105));

}

