type A = Array<number | Array<number> |  Array<number | Array<number>>>;
function flatten(v: A) {
    if(Array.isArray(v) === false)
        return null;
    let ans: Array<number> = [];
    flattenRecur(v,ans)
    return ans
}

const flattenRecur = function(v: A, ans: A) {
    for(let i=0;i<v.length;i++) {
        if(Array.isArray(v[i]) !== true)
            ans.push(v[i]);
        else
            flattenRecur(v[i],ans);
    }
}