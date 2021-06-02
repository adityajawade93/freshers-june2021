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

    if(n==1){
        console.log(0);
        return "success";
    }
    else if(n==2){
        console.log(0);
        console.log(1);
        return "success";
    }
    else{
        console.log(0);
        console.log(1);
        let a=0;
        let b=1;
        
       
        
        for(let i=2;i<n;i++){
            let t=a+b;
            console.log(a+b);
            a=b;
            b=t;
        }
        return "success";
    }
}

fibonacci_series(0);

module.exports={fibonacci_series};