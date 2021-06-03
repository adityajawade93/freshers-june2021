module.exports = function(v) {
    if(v.length<3)
        return null
    let a = v[0],b = v[0], c=v[0]
    for(let i=1;i<v.length;i++) {
        if(v[i]>=a) {
            c=b,b=a,a=v[i]
        }
        else if(v[i]>=b) {
            c=b,b=v[i]
        }
        else if(v[i]>c)
            c=v[i]
    }
    return c
}