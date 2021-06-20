module.exports = function(v) {
    if(Array.isArray(v) === false)
        return null;
    let ans= [];
    flattenRecur(v,ans)
    return ans
}

const flattenRecur = function(v, ans) {
    for(let i=0;i<v.length;i++) {
        if(Array.isArray(v[i]) !== true)
            ans.push(v[i]);
        else
            flattenRecur(v[i],ans);
    }
}