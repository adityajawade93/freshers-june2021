function fibseries(num){
    let arr=[0];
    let fi=0,se=1;
    for(let i=2;i<=num;i++){
        
        if(i==2){
            arr.push(1);
            continue;
        }
       arr.push(fi+se);
       var help=fi+se;
       fi=se;
       se=help;
    }
    return arr;
}
console.log(fibseries(5));
console.log(fibseries(13));
console.log(fibseries(1));
console.log(fibseries(2));
module.exports=fibseries