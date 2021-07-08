function fibonacci(num){
    if(num==0 || num==1){
      return num;
    }
    else{
      return fibonacci(num-1) + fibonacci(num-2);
    }
  }
  
  let fib = fibonacci(7);
  console.log(fib);

  module.exports = fibonacci;