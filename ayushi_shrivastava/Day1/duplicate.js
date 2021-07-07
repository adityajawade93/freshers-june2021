var set1 = new Set();
var set2 = new Set();

const array = [1,2,3,4,4,5,6,7,7,7];

for(let i=0;i<array.length;i++){
  if(set1.has(array[i])){
    set2.add(array[i]);
  }
  else{
    set1.add(array[i]);
  }
}

var allValues = set2.values();
console.log(allValues);