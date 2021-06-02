
function thirdLargest(arr){
	arr_size = arr.length
	if (arr_size < 3)
	{
		console.log(" Invalid Input ")
		return
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

	console.log("The third Largest element is ", third)
}

let arr = [12, 13, 1, 10, 34, 16]
thirdLargest(arr)
	
