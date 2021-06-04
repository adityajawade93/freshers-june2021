//to find fibonacci upto n terms

let fibonacci_series=function(n){

    if(n==0){
        
        return;
    }

    if(n==1){
        console.log(0);
    }
    else if(n==2){
        console.log(0);
        console.log(1);
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
        
    }
}

fibonacci_series(4);