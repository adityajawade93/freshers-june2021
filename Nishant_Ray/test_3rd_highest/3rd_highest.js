function third_highest(arr){
    if(arr.length<=2){
        return -1;
    }
    arr.sort(function(a,b){return b-a});
    return arr[2];
}
console.log(third_highest([1,2,3,4,5,6,7,8,9]));
module.exports=third_highest;