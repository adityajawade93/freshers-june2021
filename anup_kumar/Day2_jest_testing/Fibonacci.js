const fibonacci=function(n)
{
    if(Number.isInteger(n)===false)
    return "not_correct_type";
    if(Number.isInteger(n) && n<0)
    return "negative";
    if(n<=1) return n;
    return fibonacci(n-1)+fibonacci(n-2);
    
}
module.exports=fibonacci