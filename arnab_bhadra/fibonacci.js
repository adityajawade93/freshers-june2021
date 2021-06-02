let maxindexOfFibonacciSeries=5;
var fibonacciSeries=[0,1];
if(maxindexOfFibonacciSeries==0){
    console.log([0]);
}
else if(maxindexOfFibonacciSeries==1){
    console.log(fibonacciSeries);
}
else{
    for(let index=2;index<=maxindexOfFibonacciSeries;index++){
        fibonacciSeries.push(fibonacciSeries[index-2]+fibonacciSeries[index-1]);
    }
    console.log(fibonacciSeries);
}
