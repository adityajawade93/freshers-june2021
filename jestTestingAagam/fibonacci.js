const fibonacci = function(num){
    if(num < 0)
        return "invalid input"
    if(num <= 1)
        return num
    return fibonacci(num-1) + fibonacci(num-2)
}
module.exports = { fibonacci };
