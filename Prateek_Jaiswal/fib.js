// JavaScript source code
var i;
var f = [];

f[0] = 0;
f[1] = 1;

for (i = 2; i <= 20; ++i) {

    f[i] = f[i - 1] + f[i - 2];
    
}
console.log(f);