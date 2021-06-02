function kthmax(arr,k)
{
    if(arr.length<k)
        return -1;
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
// arr = [2,2,2,2,2,2];
//  console.log(kthmax(arr,3));

module.exports = {kthmax}