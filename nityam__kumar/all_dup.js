// to find all duplicate item in an array




let find_all_duplicate=function(arr){
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

for(let i=0;i<ans.length;i++){
    console.log(ans[i]);
}

}

let arr=[1,2,3,4,4,4,5,6,7,7,7,7,7,9,12,12,12,12,9,2,34,43,5,54,4,5];
let arr2=[2.2,9,2.2,9,3.7,3.7,'fr'];

find_all_duplicate(arr2);


