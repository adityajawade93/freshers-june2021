// var arr = [9,4,2,6,12,43,23,65];
// arr.sort(function(a,b){return b-a});
// console.log(arr[2]);

function kthmax(arr,k)
{
    for (let i = 0; i < k; i++)
     {
        let max_index = i;
        const tmp = arr[i];
    
        for (let j = i + 1; j < arr.length; j++)
         {
            if (arr[j] > arr[max_index]) 
            {
                max_index = j;
            }
        }
    
        arr[i] = arr[max_index];
        arr[max_index] = tmp;
      }
    return arr[k - 1];
}
arr = [9,4,2,6,12,43,23,65];
console.log(kthmax(arr,3));