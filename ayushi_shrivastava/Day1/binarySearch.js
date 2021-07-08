let arr = [1,2,3,4,5,6,7,8,9,10,11];

const binarySearch = function binary_search(arr,l,r,num){
  if(l>r){
    return -1;
  }
  let mid = l + parseInt((r-l)/2);

  if(arr[mid]==num){
    return mid;
  }
  if(arr[mid]<num){
    return binary_search(arr,mid+1,r,num);
  }
  else{
    return binary_search(arr,l,mid-1,num);
  }
}

let result = binarySearch(arr,0,arr.length-1,7);
console.log(result);

module.exports = binarySearch;