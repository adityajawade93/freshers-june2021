const findDublicateInArray= function(arrayInput){
    if(! Array.isArray(arrayInput)){
        return "Input Error";
    }
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
        if(value){
            dublicateNumber.push(number);
        }
    }
    dublicateNumber.sort((a,b)=>{
        return a-b;
    });
    return dublicateNumber
}

module.exports= {findDublicateInArray};