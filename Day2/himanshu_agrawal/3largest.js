
function find3largest(arr){

    let a1=Number.MIN_VALUE,a2=Number.MIN_VALUE,a3=Number.MIN_VALUE;
    for(let i=0;i<arr.length;i++)
    {         
          if(arr[i]>a1)
          {
              let temp=a1;
              a1=arr[i];
              let temp2 = a2;
              a2=temp;
              a3=temp2;
          }
          else if(arr[i]>a2)
          {
              let temp = a2;
              a2=arr[i];
              a3=temp;
          }
          else if(arr[i]>a3)
          {
              a3=arr[i];
          }
    }
    return a3;
}

var arr = [9,8,7,6,5,4,3,2,1];
console.log(find3largest(arr));