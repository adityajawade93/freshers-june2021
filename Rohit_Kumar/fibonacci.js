function fib(n){
    if(n<=1)
        return n;
    return fib(n-1)+fib(n-2);
}
var n=20;
for(var i=0;i<=n;i++)
{
    console.log(fib(i));
}