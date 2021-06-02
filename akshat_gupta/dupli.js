function dupli() {
    let v = input.sort()
    for(let i=0;i<v.length-1;i++) {
        if(v[i]===v[i+1]) {
            ans.push(v[i])
            while(v[i]===v[i+1]) {
                i++;
            }
        }
    }
    console.log(ans)
}

var input = [1,2,3,4,4,5,6,7,7]
var ans = []
dupli()