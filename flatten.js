function faltten(arr)
{
    let f = [];
    for(let i=0;i<arr.length;i++)
    {
        if(Array.isArray(arr[i]))
        {
            
            let temp = faltten(arr[i]);
            
            f=f.concat(temp);
            
        }
        else
        {
            f.push(arr[i]);
        }
    }
    return f;

}

let arr=[1,[2,[4,5]],6,7];
console.log(faltten(arr));

