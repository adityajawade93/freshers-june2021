module.exports = function(input) {
    if(input.length===0)
        return null
    let v = input.sort(function(a, b){return a-b})
    let ans=[]
    for(let i=0;i<v.length-1;i++) {
        if(v[i]===v[i+1]) {
            ans.push(v[i])
            while(v[i]===v[i+1]) {
                i++;
            }
        }
    }
    return ans
}