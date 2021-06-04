function flatten(array){
    
    if(! Array.isArray(array)){
        flattenArray.push(array)
        return;
    }
    else{
        array.forEach(element => {
            flatten(element);
        });
    }
}
var flattenArray=[]
const flattenofArray=function(arrayInput){
    if(! Array.isArray(arrayInput)){
        return "Input Error";
    }
    flatten(arrayInput);
    let result=[...flattenArray]
    flattenArray=[]
    return result;
}

module.exports={flattenofArray}