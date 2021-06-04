const flattenRecur = function(v,ans) {
    for(let i=0;i<v.length;i++) {
        if(Array.isArray(v[i]) !== true)
            ans.push(v[i])
        else
            flattenRecur(v[i],ans)
    }
}

var v=[1,2,3,4,[6,7,[8]],10,[5,7]]
var ans=[]
flattenRecur(v,ans)
console.log(ans)