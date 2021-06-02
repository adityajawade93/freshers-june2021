//program to find third highest number in an array

let arr=[9,8,7,6,5,4,3,2,1];

let mina=-1;
let mina2=-1;
let mina3=-1;

if(arr.length<3){
    console.log("not found");
}
else{
    for(let i of arr){
        mina=Math.max(mina,arr[i]);
    }
    
    for(let i of arr){
        if(arr[i]>mina2 && arr[i]!=mina){
            mina2=arr[i];
        }
    }
    
    for(let i of arr){
        if(arr[i]>mina3 && arr[i]!=mina2){
            mina3=arr[i];
        }
    }
    
    if(mina3==-1){
        console.log("not found");
    }
    
    else{
        console.log(`third highest number:: ${mina3}`);
    }
}


