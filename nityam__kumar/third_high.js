//program to find third highest number in an array



let third_highest_number=function(arr){

let mina=-Infinity;
let mina2=-Infinity;
let mina3=-Infinity;

if(arr.length<3){
    console.log("not found");
}
else{
    for(let i in arr){
       if(arr[i]>mina){
           mina=arr[i];
       }
    }
    
    for(let i in arr){
        if(arr[i]>mina2 && arr[i]!=mina){
            mina2=arr[i];
        }
    }
    
    for(let i in arr){
        
        if(arr[i]>mina3 && arr[i]!==mina2 && arr[i]!==mina){
            mina3=arr[i];
        }
    }
    
    if(mina3===-Infinity){
        console.log("not found");
    }
    
    else{
        console.log(`third highest number :: ${mina3}`);
    }
}

}

let arr=[9,8,7,6,5,4,3,2,1];
let arr2=[1,1.7,2.78,6.89];
third_highest_number(arr2);




