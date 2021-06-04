// to find all duplicate item in an array




const find_all_duplicate=function(arr){

    if(arr===undefined){
        return "invalid";
    }

    if(arr===NaN){
        return "invalid";
    }

    if(!Array.isArray(arr)){
        return "invalid";
    }

    let sort_arr=arr.sort();
    let ans=[];

for(let i=0;i<sort_arr.length-1;i++){
    if(arr[i]==arr[i+1]){
        ans.push(arr[i]);
    }
}

for(let i=0;i<ans.length;i++){
    let v=ans.indexOf(ans[i],i+1);
    if(v!=-1){
        
        ans.splice(i+1,v-i+1);
    }
   
   
}

if(ans.length===0){
    console.log("no duplicate");
    return "no duplicate";
}

let foo=[];
for(let i=0;i<ans.length;i++){
    console.log(ans[i]);
    foo.push(ans[i]);
}

return foo;

}



module.exports={find_all_duplicate};



