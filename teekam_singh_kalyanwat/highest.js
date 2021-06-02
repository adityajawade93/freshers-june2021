//considering array has 3 or more elements
var arr=[1,2,3,4,5,6,8,7,9]
var fst=-1000000;
var scd=fst,thd=fst;
var len=arr.length;
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
console.log(thd);
