const printRepeating = function(arr){
    if(typeof(arr) != "object")
        return "invalid input"
    let duplicates = []
    const tempArray = arr.sort()
    
    for (let i = 0; i < tempArray.length; i++) {
        if (tempArray[i + 1] === tempArray[i]) {
        duplicates.push(tempArray[i])
        }
    }    
    return duplicates
}

module.exports = { printRepeating };




// function printRepeating1(arr){
//     if(typeof(arr) != "object")
//         return "invalid input"
//     let duplicates = []
//     const tempArray = arr.sort()
    
//     for (let i = 0; i < tempArray.length; i++) {
//         if (tempArray[i + 1] === tempArray[i]) {
//         duplicates.push(tempArray[i])
//         }
//     }    
//     console.log(duplicates)
// }
// let arr = [ 1, 2, 3, 1, 3, 6, 6 ]
// printRepeating1(arr)