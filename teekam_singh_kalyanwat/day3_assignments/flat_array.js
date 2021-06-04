
function flat_arr(arr,ans)
{
    arr.forEach(item => {
       if(item instanceof Array)
       {
           flat_arr(item,ans);
       }
       else{
           ans.push(item);
       }
    });
    return;
}

module.exports = flat_arr;

let arr=[[[1,2,[[[[[[[[[[[[3]]]]]]]]]]]]]]];
let ans=[];
flat_arr(arr,ans);
console.log(ans);