

const iterativeBinarySearch = function(arrayInteger,searchValue){
    
    if(searchValue===undefined || !Array.isArray( arrayInteger)){
        
        return "Input Error";
    }
    let lenghtOfArray=arrayInteger.length;
    let lowIndex=0;
    let highIndex=lenghtOfArray-1;
    

    while(lowIndex<=highIndex){

        let middleIndex= Math.ceil((lowIndex+highIndex)/2);
        
        if(arrayInteger[middleIndex]===searchValue){
            return true;
        }
        else if(arrayInteger[middleIndex]<searchValue){
            lowIndex=middleIndex+1;
        }
        else{
            highIndex=middleIndex-1;
        }
    
    }
    return false;
}

const linearSearch= function(arrayInteger,searchValue){
    if(searchValue===undefined || !Array.isArray( arrayInteger)){
        
        return "Input Error";
    }
    let lengthOfArray=arrayInteger.length;
    for(let i=0;i<lengthOfArray;i++){
        if(arrayInteger[i]===searchValue){
            return true;
        }
    }
    return false;
}

module.exports={iterativeBinarySearch,linearSearch};