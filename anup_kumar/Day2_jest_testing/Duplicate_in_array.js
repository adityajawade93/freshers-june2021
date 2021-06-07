const find_duplicate=function(arr)
{
    var map={};
    for(let i=0;i<arr.legth;i++)
    {
        map[arr[i]]++;
    }
    for(let i in map)
    {
        console.log(i)
    }
}
module.exports=find_duplicate;
