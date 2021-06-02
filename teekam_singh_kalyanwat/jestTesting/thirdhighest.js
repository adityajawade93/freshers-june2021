function third_highest(arr){
var fst=-1000000;
var scd=fst,thd=fst;
var len=arr.length;
if(len<3) return 'Not enough elements';
for(let i=0;i<len;i++)
{
    var t=arr[i];
    if(t>fst){
        thd=scd;
        scd=fst;
        fst=t;
    }
    else if(t>scd)
    {
        thd=scd;
        scd=t;
    }
    else if(t>thd)
    {
        thd=t;
    }
}
return thd;

}

var arr=[1,2,3,4,5,6,8,7,9,15,21,12]
console.log(third_highest(arr));
console.log(third_highest([1,2]));

module.exports = third_highest;