//var flatarray = []

const flatten = function(array,flatarray){

    if(array instanceof Array){
        for(let i =0;i<array.length;i++){
            if(array[i] instanceof Array){
                flatten(array[i],flatarray)
                
            }else{
                if(flatarray instanceof Array){
                    flatarray.push(array[i])
                }
                
            }
        }
        return flatarray
    }else{
        if(flatarray.length==0){
            return false
        }
        if(flatarray instanceof Array){
            flatarray.push(array)
        }
        
        console.log(flatarray)
        return flatarray;
    }
}



module.exports ={ flatten }