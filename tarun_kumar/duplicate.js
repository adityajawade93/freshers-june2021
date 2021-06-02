function printDuplicate(arr,arr_size,ans_arr)
{
    
    
    for (let i = 0; i < arr_size-1; i++) {
        if(arr[i]===arr[i+1]){
            ans_arr.push(arr[i])
            while(arr[i]===arr[i+1]){
                i++;
            }
        }

        
    }
}
 
// Driver Code
    let arr = [ 7,5,55,44,1,7,3,5,44,4,6,2,7,55,7];
    let arr_size = arr.length;
    arr.sort(function(a,b){return a-b})
    let ans_arr=[]
    printDuplicate(arr, arr_size,ans_arr)
 console.log(ans_arr)
