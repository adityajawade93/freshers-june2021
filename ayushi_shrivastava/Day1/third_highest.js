//Assuming all numbers are distinct
let arr = [9,8,7,6,5,4,3,2,1];

let max1,max2,max3;

function triplet(){
  if(arr[0]>arr[1] && arr[0]>arr[2]){
    max1 = arr[0];
    if(arr[1]>arr[2]){
      max2 = arr[1];
      max3 = arr[2];
    }
    else{
      max2 = arr[2];
      max3 = arr[1];
    }
  }
  else if(arr[1]>arr[0] && arr[1]>arr[2]){
    max1 = arr[1];
    if(arr[0]>arr[2]){
      max2 = arr[0];
      max3 = arr[2];
    }
    else{
      max2 = arr[2];
      max3 = arr[0];
    }
  }
  else{
    max1 = arr[2];
    if(arr[0]>arr[1]){
      max2 = arr[0];
      max3 = arr[1];
    }
    else{
      max2 = arr[1];
      max3 = arr[0];
    }
  }
}

if(arr.length<3){
  console.log("third largest is not defined");
}
else{
  triplet();
  for(let i=3;i<arr.length;i++){
    if(arr[i]>max3){
      max3 = arr[i];
      if(arr[i]>max2){
        max3 = max2;
        max2 = arr[i];
        if(arr[i]>max1){
          max2 = max1;
          max1 = arr[i];
        }
      }
    }
    
  }
}
console.log(max3);
