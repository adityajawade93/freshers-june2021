function returnUniqueArray(arrayInput){
    var dublicateMap = new Map();
    let lenghtOfArray=arrayInput.length;
    for(let index=0;index<lenghtOfArray;index++){
        if(dublicateMap.has(arrayInput[index])){
        
            dublicateMap.set(arrayInput[index],1);
        }
        else{
            dublicateMap.set(arrayInput[index],1);
        }
    }
    var dublicateNumber=[];

    for (let [number,value] of dublicateMap.entries()){
        //console.log(number,value);
        if(value===1){
            dublicateNumber.push(number);
        }
    }
    return dublicateNumber
}

let arrayNumberInput=[1,2,3,4,5,6,6,7,7,8,9];
var uniqueNumberArray=returnUniqueArray(arrayNumberInput);
uniqueNumberArray.reverse();
if(uniqueNumberArray.length<3){
    console.log("Number of element is very less");
}
else{
    console.log(uniqueNumberArray[2]);
}