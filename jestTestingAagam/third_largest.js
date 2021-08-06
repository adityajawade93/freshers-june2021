
const thirdLargest = function(arr){
	if(typeof(arr) != "object")
        return "invalid input"
	arr_size = arr.length
	if (arr_size < 3){
		return "invalid input"		
	}
	let first = arr[0];
	for (let i = 1; i < arr_size ; i++)
		if (arr[i] > first)
			first = arr[i]

	let second = Number.MIN_VALUE
	for (let i = 0; i < arr_size ; i++)
		if (arr[i] > second && arr[i] < first)
			second = arr[i]

	let third = Number.MIN_VALUE
	for (let i = 0; i < arr_size ; i++)
		if (arr[i] > third && arr[i] < second)
			third = arr[i]
	const result = third
	return result
	// console.log("The third Largest element is ", third)
}

module.exports = { thirdLargest };


function thirdLargest1(arr){
	if(typeof(arr) != "object")
	return "invalid input"
	arr_size = arr.length
	if (arr_size < 3){
		return "invalid input"		
	}
	let first = arr[0];
	for (let i = 1; i < arr_size ; i++)
	if (arr[i] > first)
	first = arr[i]
	
	let second = Number.MIN_VALUE
	for (let i = 0; i < arr_size ; i++)
	if (arr[i] > second && arr[i] < first)
	second = arr[i]
	
	let third = Number.MIN_VALUE
	for (let i = 0; i < arr_size ; i++)
	if (arr[i] > third && arr[i] < second)
	third = arr[i]
	
	// return third
	console.log("The third Largest element is ",third)
}
let arr = [12, 13, 1, 10, 34, 16]
thirdLargest1(arr)