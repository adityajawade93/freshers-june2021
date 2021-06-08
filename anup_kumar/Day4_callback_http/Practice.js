// let x=function(){
//     console.log("im called from inside a function")
// }
// let y=function(callback)
// {
//     console.log("Do something");
//     callback();
// }

// y(x);
////////////////////////////////////////////////////////////
//why we need callback?

// let add=function(a,b)
// {
//     return a+b;
// }
// let mul=function(a,b)
// {
//     return a*b;
// }

// let DoWhatever=function(a,b)
// {
//     console.log(`here is you two no back ${a} and ${b}`);
// }
// let calc=function(num1,num2,callback)
// {
//     if(typeof(callback)==="function")
//     {
//         return callback(num1,num2);
//     }

    
// }
// console.log(calc(2,3,"add"))
// console.log(calc(2,3,mul))
// console.log(calc(2,3,DoWhatever))

// console.log(calc(2,3,function minus(a,b) {
//     return a-b;
// }))
//////////////////////////////////////////////////////////////////

// var myArr=[
//     {num:1
//         ,str:"apple"},
//         {num:0,str:"Banana"},
//         {num:6,str:"orange"},
//         {num:3,str:"mange"},
//         {num:9,str:"coconut"}];
// console.log(myArr)
// myArr.sort()
// console.log(myArr)
// myArr.sort(
//     function(val1,val2)
//     {
//         if(val1.str<val2.str) return -1;
//         else return 1;
//     }
// )
// console.log(myArr)

//////////////////////////////////////////////////////////////////////
// const uno=()=>
// {
//     console.log("arrow function")
// }

// const dos=()=>
// {
//     setTimeout(()=>
//     {
//         console.log("wohoo");
//     },6000);
//     console.log("arrow functio dos");
// }

// const tres=()=>
// {
//     console.log("arrow functio tres")
// }

// // uno()
// // tres()
// // dos()


// uno()
// dos()
// tres()
//////////////////////////////////////////////////////////////////
// promises/await
const uno=()=>
{
    return "i am one"
}

// const dos=()=>
// {
//     setTimeout(()=>
//     {
//         return "i am two";
//     },6000);
// }


// const dos=()=>
// {
//     return new Promise((resolve,reject)=>
//     {
//         setTimeout(()=>
//         {
//             // resolve("i am two");
//             reject("i am two");
//         },3000);
//     })
// }


// const tres=()=>
// {
//     return "i am three"
// }

// const callMe=async()=>
// {
// let val1=uno();
// console.log(val1);
// let val2=await dos();
// console.log(val2);
// let val3=tres();
// console.log(val3);

// }
// callMe()
////////////////////////////////////////////////////////////////////////////////////////////

//Promise wheter it filled or not in future

// console.log("hello to the Promise tutorial");
// let p=new Promise((resolve,rejest)=>
// {
//     console.log("Promise started");
//     console.log("Promise is doing some importent work");
//     console.log("Promise has completed,will resolve shortly");
//     resolve("Promise has been resolved");
// }
// );
// // You will notice that in above code snippet, we never executed our promise
// // or provided the ‘resolve’ and ‘reject’ method but our code runs automatically.
// // This is a tricky part of a promise. A Promise executes as soon as it is created.

// p.then(
//     (message)=>
//     {
//         console.log("Resolved: ",message);
//     },
//     (error)=>
//     {
//         console.log("Reject",error);
//     }
// );
//////////////////////////////////////////////////////////////////////////

console.log("hello to the Promise tutorial");
let p=new Promise((resolve,reject)=>
{
    console.log("Promise started");
    console.log("Promise is doing some importent work");
    console.log("Promise has completed,will resolve shortly");
    reject("Promise is rejected")
    // resolve("Promise has been resolved");
}
);
// You will notice that in above code snippet, we never executed our promise
// or provided the ‘resolve’ and ‘reject’ method but our code runs automatically.
// This is a tricky part of a promise. A Promise executes as soon as it is created.

p.then(
    (message)=>
    {
        console.log("Resolved: ",message);
    },
    (error)=>
    {
        console.log("Reject: ",error);
    }
);