//console.log("Hello world");
//console.log("Welcome to Zopsmart");
// This code is for binary search applied on sorted array
function binarySearchInarray(arrayInteger,searchValue){
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
    return false
}
var arrayInteger=[5,7,8,14,78,322,452,1234];
var searchValue=78;
if(binarySearchInarray(arrayInteger,searchValue)){
    console.log("Found");
}
else{
    console.log("Not found");
}