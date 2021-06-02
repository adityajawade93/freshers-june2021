

/*
let a=0,b=1;
let n=10;
for(let i=0;i<n;i++)
{
    console.log(a+b);
    let c=a+b;
    a=b;
    b=c
}
*/

function fib(n)
{
    if(n===0  || n===1) return n;
    else return fib(n-1)+fib(n-2);
}
let n=10

for(let i=0;i<n;i++)
{
    console.log(fib(i))
}