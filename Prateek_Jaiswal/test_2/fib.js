// JavaScript source code

const fibo = function (x) {

    if (x <= 0)
        return "false";


    var i;
    var f = [];

    f[0] = 0;
    f[1] = 1;

    for (i = 2; i <= x-1; ++i) {

        f[i] = f[i - 1] + f[i - 2];

    }

    return f[f.length-1];

}

module.exports = { fibo };