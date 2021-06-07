function printFibonacci(number) {
    if (typeof(number)!=='number') { // given number is not a number
        return false;
    }

    let n1 = 0, n2 = 1, nextTerm
    console.log('Fibonacci Series:')

    for (let i = 1; i <= number; i++) {
        console.log(n1);
        nextTerm = n1 + n2;
        n1 = n2;
        n2 = nextTerm;
    }
    return true;
}

module.exports = { printFibonacci }

