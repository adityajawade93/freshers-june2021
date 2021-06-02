var arr=[1,2,3,4,4,5,6,7,7];
arr.sort(function(a,b){return a-b});
var check=-1;
for(let i=1;i<arr.length;i++){
    if(arr[i]===arr[i-1]){
        if(arr[i]!==check){
              console.log(arr[i]);
        } 
    }
    check=arr[i-1];// to check is duplicate number repeated more than twice
}