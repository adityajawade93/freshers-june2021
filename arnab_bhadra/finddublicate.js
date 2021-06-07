let arrayInput=[1,2,3,4,5,6,6,7,7];
var dublicateMap = new Map();
let lenghtOfArray=arrayInput.length;
for(let index=0;index<lenghtOfArray;index++){
    if(dublicateMap.has(arrayInput[index])){
        
        dublicateMap.set(arrayInput[index],true);
    }
    else{
        dublicateMap.set(arrayInput[index],false);
    }
}

var dublicateNumber=[];

for (let [number,value] of dublicateMap.entries()){
    //console.log(number,value);
    if(value===true){
        dublicateNumber.push(number);
    }
}
console.log(dublicateNumber)
