
function findDuplicates(arr)
{
   
     let mp = new Map();
     let v = new Array();
     
     for(let i=0;i<arr.length;i++)
     {
         if(mp.get(arr[i])==1)
           v.push(arr[i]);
         else
          mp.set(arr[i],1);
     }
     return v;

}

var arr = [1,2,3,4,4,5,6,7,7];
var v = findDuplicates(arr);
console.log(v);