function highest() {
    let a = v[0],b = v[0], c=v[0]
    for(let i=1;i<v.length;i++) {
        if(v[i]>a) {
            c=b,b=a,a=v[i]
        }
        else if(v[i]>b) {
            c=b,b=v[i]
        }
        else if(v[i]>c)
            c=v[i]
    }
    console.log(c)
}

var v = [1,2,3,4,4,5,6,7,7]
highest()