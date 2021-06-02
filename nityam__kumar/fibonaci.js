
console.log(0);
console.log(1);
let a=0;
let b=1;

//fisrt 20 fibonacci numbers
let n=20;
for(let i=0;i<n;i++){
    let t=a+b;
    console.log(a+b);
    a=b;
    b=t;
}
