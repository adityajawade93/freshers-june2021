function flatArr(arr)
{
    let combineArr = [];
    function dummy(arr)
    {
        for(let i=0;i<arr.length ; i++)
        {
            let elmt = arr[i];
            if(Array.isArray(elmt))//if the elmt is an array then recurse the dummy function 
            {
                dummy(elmt);
            }
            else{
                combineArr.push(elmt); //if the elmt is not an array,push it into the empty arr
            }
        }
    }
    dummy(arr);

    return combineArr;
}
// let arr = [1,2,[3,4,[5,6],7],8];



// console.log(flatArr(arr));
module.exports = flatArr;