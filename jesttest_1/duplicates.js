const duplicates =function (array){
    if(!Array.isArray(array)||array ==undefined||array.length==0){
        return false
    }
    duplicate=[]
    for(let i=0;i<array.length;i++){
        for(let j=i+1;j<array.length;j++){
            if(array[i]==array[j]){
                duplicate.push(array[i])
                break
            }
        }
    }
    console.log(duplicate)
    if(duplicate.length==0){
        return false
    }
    let stri =""
    for(let i =0;i<duplicate.length;i++){
        stri +=duplicate[i]
    }
    return stri
}

module.exports ={duplicates}