let res=[]
const recurse=function(arr)
{
    if(Array.isArray(arr))
    {
        for(i in arr)
        {
            recurse(arr[i]);
        }
    }
    else
    {
            res.push(arr)
    }
    return ;
}

let arr=[[1,2],[3,[4,5,[8,9,[10,[11,12]]]]],[13]]
recurse(arr)
console.log(res)