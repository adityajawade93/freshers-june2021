

function binarysearch(array,findvalue,startindex,endindex){

    if(endindex<startindex){
        console.log(findvalue+'is not in the array')
        return
    }
    let mid = parseInt((startindex+endindex)/2)

    if(array[mid] == findvalue){
        console.log(findvalue + 'is at index' + mid)
        return
    }else if(array[mid]>findvalue){
        return binarysearch(array,findvalue,startindex,mid-1)
    }else{
        return binarysearch(array,findvalue,mid+1,endindex)
    }



}

let arr =[1,2,3,4,5]
let length = arr.length
binarysearch(arr,7,0,length)
