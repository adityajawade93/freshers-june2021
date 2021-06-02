
const binarysearch = function (array,findvalue,startindex,endindex){

    if(!Array.isArray(array)||findvalue==undefined||findvalue%2!=0){
        return false;
    }
    if(endindex<startindex){
        console.log(findvalue+'is not in the array')
        return false
    }
    let mid = parseInt((startindex+endindex)/2)

    if(array[mid] == findvalue){
        console.log(findvalue + 'is at index' + mid)
        return true
    }else if(array[mid]>findvalue){
        return binarysearch(array,findvalue,startindex,mid-1)
    }else{
        return binarysearch(array,findvalue,mid+1,endindex)
    }



}

module.exports = {binarysearch}