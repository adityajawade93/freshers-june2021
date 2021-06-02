//program to find third highest number in an array



const third_highest_number=function(arr){

    if(arr===undefined){
        return "invalid";
    }

    if(arr===NaN){
        return "invalid";
    }

    if(!Array.isArray(arr)){
        return "invalid";
    }


let mina=-Infinity;
let mina2=-Infinity;
let mina3=-Infinity;

if(arr.length<3){
    return "not found";
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
        return "not found";
    }
    
    else{
        console.log(`third highest number :: ${mina3}`);
        return "success";
    }
}

}

const arr=[9,8,7,6,5,4,3,2,1];
const arr2=[1,1,2,6];

third_highest_number(arr2);

module.exports={third_highest_number};



