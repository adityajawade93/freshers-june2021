function printFibonacci(n) {
    let a=0, b=1
    ans.push(a)
    ans.push(b)
    for(let i=3;i<=n;i++) {
        let c=a+b
        ans.push(c)
        a=b
        b=c
    }
    console.log(ans)
}

var n = 10
var ans = []
printFibonacci(n)