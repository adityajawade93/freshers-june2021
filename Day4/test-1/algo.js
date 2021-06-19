
exports.binarySearch = (arr,start,end,x)=>{

    while(end>=start)
    {
         let m = parseInt(start+(end-start)/2);
         if(arr[m]==x)
          return m;
         if(x>arr[m]) 
         {
              start=m+1;
         }
         else
          end=m-1;
    }
    return -1;

}

exports.findDuplicates = (arr)=>{

    let mp = new Map();
     let v = new Array();
     
     for(let i=0;i<arr.length;i++)
     {
         if(mp.get(arr[i])==1)
           v.push(arr[i]);
         else
          mp.set(arr[i],1);
     }
     return v;
}

exports.find3rdLargest = (arr)=>{
  
    let a1=Number.MIN_VALUE,a2=Number.MIN_VALUE,a3=Number.MIN_VALUE;
    for(let i=0;i<arr.length;i++)
    {         
          if(arr[i]>a1)
          {
              let temp=a1;
              a1=arr[i];
              let temp2 = a2;
              a2=temp;
              a3=temp2;
          }
          else if(arr[i]>a2)
          {
              let temp = a2;
              a2=arr[i];
              a3=temp;
          }
          else if(arr[i]>a3)
          {
              a3=arr[i];
          }
    }
    return a3;

}

exports.fib = (n)=>{
    let dp = new Array(n+1);
    dp[0]=0;
    dp[1]=1;
    for(let i=2;i<=n;i++)
     dp[i]=dp[i-1]+dp[i-2];
     return dp[n];
}




