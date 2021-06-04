//to find fibonacci upto n terms

const fibonacci_series=function(n){

    if(n===undefined){
        return "invalid";
    }

    if(isNaN(n)){
        return "invalid";
    }


    if(n<=0){  
        return "invalid input";
    }
    let ans=[];
    if(n==1){
        console.log(0);
        ans.push(0);
        return ans;
    }
    else if(n==2){
        console.log(0);
        console.log(1);
        ans.push(0);
        ans.push(1);
        return ans;
    }
    else{
        console.log(0);
        console.log(1);
        ans.push(0);
        ans.push(1);
        let a=0;
        let b=1;
        
       
        
        for(let i=2;i<n;i++){
            let t=a+b;
            console.log(a+b);
            ans.push(a+b);
            a=b;
            b=t;
        }
        return ans;
    }
}



module.exports={fibonacci_series};