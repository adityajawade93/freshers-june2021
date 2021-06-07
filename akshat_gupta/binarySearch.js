module.exports = function(v, target){
    if(Array.isArray(v) === false || v.length===0 || Number.isInteger(target)===false)
        return null
    let start=0, end=v.length-1
    while(start<=end) {
        let mid=Math.floor((start+end)/2);

        if(v[mid]===target)
            return true;
        else if(v[mid]>target)
            end=mid-1
        else
            start=mid+1
    }
    return false;
}