function dubliCate(arr)
{
    var dubArr = [];
    var c=-1;
    for(var i=1;i<arr.length;i++)
    {
        if(arr[i-1] === arr[i])
        {
            if(arr[i]!==c)
                dubArr.push(arr[i]);
        }
        c=arr[i-1];
    }
    return dubArr;
}
var arr = [1,2,3,4,4,4,5,6,7,7];
console.log(dubliCate(arr));