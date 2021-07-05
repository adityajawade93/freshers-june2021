function req_array(arr){
    let final_array=[];
    flatten(arr);
function flatten(arr){
    arr.forEach(item=>{
        if(item instanceof Array){
            flatten(item);  //item itself is an array for this
        }else{
            final_array.push(item);
        }
    })
}
return final_array;
}
console.log(req_array([1,[2,4,5],[6,[7]],3]));
module.exports=req_array;

