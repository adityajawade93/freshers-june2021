const highest = function (array){

    if(array.length<3||!Array.isArray(array)){
        return false
    }
    
    for(let i=0;i<array.length;i++){
        for(let j=i+1;j<array.length;j++){
            if(!Number.isInteger(array[j])){
                return false;
            }
            if(array[i]>array[j]){
                temp =array[i]
                array[i]=array[j]
                array[j]=temp
            }

        }
    }

    console.log(array[array.length-3])
    return array[array.length-3]

}

module.exports = { highest }