function thirdHighest(arr, arr_size)
{
    let first = arr[0], second = -1000000000, third = -1000000000
    for (let i = 1; i < arr_size ; i ++)
    {
        
        if (arr[i] > first)
        {
            third = second
            second = first
            first = arr[i]
        }
 
       
        else if (arr[i] > second)
        {
            third = second
            second = arr[i]
        }
 
       
        else if (arr[i] > third)
            third = arr[i]
    }
    
    return third
}
 

let arr = [10,9,8,7,6,5,4,3,2,1]
let n = arr.length
   if (n< 3){
      console.log("Elements in array are less than 3 ")
    }
    else{
 
    let ans= thirdHighest(arr, n)
    console.log("Third Highest element in array= "+ ans)

    }
