const fabonacci = function (number){
   if(number<0||number == undefined|| !Number.isInteger(number)){
       return false;
   }
    let num1=0;num2=1
    fab = [0,1]
    for(let i =2;i<number;i++){
        num3 =num1+num2
        fab.push(num3)
        num1=num2
        num2=num3
    }

    console.log(fab)
    return true

}

module.exports ={fabonacci}