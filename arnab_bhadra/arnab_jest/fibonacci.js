const fibonacciSeriesList =function(index){
    if(index<0 || !Number.isInteger(index)){
        return "Input Error";
    }
    if(index===0){
        return [0];
    }
    if(index===1){
        return [0,1];
    }
    var fibonacciSeries=[0,1];
    for(let i=2;i<index;i++){
        fibonacciSeries.push(fibonacciSeries[i-2]+fibonacciSeries[i-1]);
    }
    return fibonacciSeries;
}
module.exports={fibonacciSeriesList};