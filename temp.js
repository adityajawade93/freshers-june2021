
// function sum(a,b)
// {
//     return a+b;
// }


// function callbackFunction(a,b)
// {
   
//    setTimeout(()=>{
//       return a+b;
//    },300);
  
// }

// console.log(callbackFunction(3,4));


function sum(a,b)
{
    return a+b;
}
function sub(a,b)
{
    console.log(a-b);
}

// function callbackFunction(a,b,callback)      //async function
// {
   
//    setTimeout(()=>{
//       callback(a,b);
//    },300);
  
// }

// callbackFunction(5,4,sum);
// callbackFunction(5,4,sub);                         



function promisefunction(a,b)
{

    return new Promise((resolve,reject)=>{

        setTimeout(()=>{
           let s = sum(a,b);
           resolve(s);
        },300);

    });
}


async function doSomething(){

  await promisefunction(5,4).then((sum)=>{
        console.log(sum);
    })
    console.log("himanshu");

}

doSomething();