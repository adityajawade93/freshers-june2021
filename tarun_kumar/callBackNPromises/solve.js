var c=0;

function make(x,y){
  var z=2;
 return function inner(k){
  return x+y+k+z; 
 };
}
var ans=make(2,3);
c+=ans(3);
console.log(c);