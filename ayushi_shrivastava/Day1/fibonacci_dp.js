let first =0;
let second =1;
let third;

function fibonacci(num){
  for (let i = 2; i < num; i++) {
    third = first + second;
    console.log(third);
    first = second;
    second = third;
  }
}

let num=10;
if(num==0){
  console.log(first);
}
else if(num==1){
  console.log(first);
  console.log(second);
}
else{
  console.log(first);
  console.log(second);
  fibonacci(num);
}
