function fib(n){
    if(n==1)return 0;
    if(n==2)return 1;
    else return fib(n-1)+fib(n-2);
}

console.log(fib(3));
console.log(fib(4));

console.log('..................................');

function duplicate(a){
    let ans=[];
    for(let i=0;i<a.length-1;i++){
        for(let j=i+1;j<a.length;j++){
            if(a[j]==a[i]){
                ans.push(a[j]);
            }
        }
    }
    return ans;
}

let a=[1,2,3,4,4,5,6,7,7];
console.log(duplicate(a));

console.log('..................................');

function thirdhigh(a){
    let firstmax=Number.MIN_VALUE; 
    let secondmax=Number.MIN_VALUE;
    let thirdmax=Number.MIN_VALUE;

    for(let i=0;i<a.length;i++){
        if(a[i]>firstmax){
            thirdmax=secondmax;
            secondmax=firstmax;
            firstmax=a[i];
        }
        else if(a[i]>secondmax && a[i]<firstmax){
            thirdmax=secondmax;
            secondmax=a[i];
        }
        else if(a[i]>thirdmax && a[i]<secondmax){
            thirdmax=a[i];
        }
    }
    return thirdmax;
}

let b=[9,8,7,6,5,4,3,2,1];
console.log(thirdhigh(b));
