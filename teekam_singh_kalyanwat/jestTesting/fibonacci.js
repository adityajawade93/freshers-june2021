function printfib(num){
var arr=[];
if(num>0) {arr.push(0);}
if(num>1) {arr.push(1);}

var a=0,b=1;
for(let i=3;i<num+1;i++)
{   let nxt=a+b;
    arr.push(nxt);
    a=b;
    b=nxt;
}
return arr;
}

module.exports = printfib;
