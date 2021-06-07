let arr = [
  1,
  2,
  [3, 4],
  [
    [5, 6],
    7
  ],
  8,
  9
]

let ans_arr=[];

function flattenArray(arr){

    let arr_size=arr.length;
    for(let i=0;i<arr_size;i++){
        if(Array.isArray(arr[i])===true){
                flattenArray(arr[i]);
        }else{
            ans_arr.push(arr[i]);
        }
    }
}

flattenArray(arr);
console.log(ans_arr);
