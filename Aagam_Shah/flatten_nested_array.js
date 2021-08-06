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
console.log(arr)

let flatten_array = []

function flatten(arr){
    arr.forEach(item => {
      if (item instanceof Array) {
        flatten(item)
      } else {
        flatten_array.push(item)
      }
    })
}
flatten(arr)
console.log(flatten_array)