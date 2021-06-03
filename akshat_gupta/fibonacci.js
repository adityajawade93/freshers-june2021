module.exports = function(n) {
    let a=0, b=1
    let ans=[]
    if(n<0)
        return null
    if(n===0)
        return ans
    ans.push(a)
    if(n===1)
        return ans
    ans.push(b)
    for(let i=3;i<=n;i++) {
        let c=a+b
        ans.push(c)
        a=b
        b=c
    }
    return ans
}