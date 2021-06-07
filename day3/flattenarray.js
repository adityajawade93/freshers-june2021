
let ans=[];

const flatten = function (arr){
    arr.forEach(item => {
        if(item instanceof Array){
            flatten(item);
        }else{
            ans.push(item);
        }
    })
    return ans;
}

// let a= [1,[2,[3,4],[5,[6,7]]],[8,9,10]]
// console.log(flatten(a));

module.exports ={flatten};