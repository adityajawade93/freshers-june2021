var arr = [1,2,3,4,4,5,6,7,7];
var dubArr = [];
for(var i=1;i<arr.length;i++)
{
    if(arr[i-1] === arr[i])
    {
        dubArr.push(arr[i]);
    }
}
console.log(dubArr);