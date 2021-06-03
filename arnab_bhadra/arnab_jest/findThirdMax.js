function returnUniqueArray(arrayInput){

    var dublicateMap = new Map();
    let lenghtOfArray=arrayInput.length;
    for(let index=0;index<lenghtOfArray;index++){
        dublicateMap.set(arrayInput[index],1);
    }
    var dublicateNumber=[];
    for (let [number,value] of dublicateMap.entries()){

        dublicateNumber.push(number);
    }
    return dublicateNumber;
}

const findThirdHighestNumber= function(arrayNumberInput){
    if(! Array.isArray(arrayNumberInput)){
        return "Input Error";
    }
    var uniqueArrayElement=returnUniqueArray(arrayNumberInput);

    uniqueArrayElement.sort((a,b) =>{
        return b-a;
    });
    if(uniqueArrayElement.length<3){
        return "Insufficient elements";
    }
    
    return uniqueArrayElement[2];
}

module.exports= findThirdHighestNumber;