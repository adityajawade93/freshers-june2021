
const flat_array=function(arr){
  let ans=[];
  if(!Array.isArray(arr)){
  
    return "invalid input";
}
  const flat_nested_loops= function(arr){

    arr.forEach(element => {
     if(element instanceof Array){
         flat_nested_loops(element);
     }
     else{
         console.log(element);
         ans.push(element);
     }
    }); 
     
 }
 flat_nested_loops(arr);
 return ans;
}


let arr=[
3,
[9,4,7],
[45,[1,2,2,[3,2,4,2]],[8,9]],
[1,[1,[[1,2]]]]
];

let arr2 = [
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



module.exports={flat_array};

