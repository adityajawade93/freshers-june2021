let arr=[1,2,3,4,4,5,6,7,7];
// console.log(arr.indexOf(4))
// console.log(arr.lastIndexOf(4))
let n=arr.length

for(let i=0;i<arr.length;i++)
{
    temp=arr[i]%n;
    arr[temp]+=n;
}
for(let i=0;i<arr.length;i++)
{
    if((arr[i]/n)>=2)console.log(i)
}