const dubliCate = function (arr)
{
    var dubArr = [];
    arr.sort(function(a,b){return a-b})
    var query = -1;
    for(var i=1;i<arr.length;i++)
    {
        if(arr[i-1] === arr[i])
        {
            if(arr[i]!==query)
                dubArr.push(arr[i]);
        }
    
    query = arr[i-1];
    }
    return dubArr;
}

module.exports = {dubliCate};