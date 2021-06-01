function binarysearch(a,s,e,target){


    if(e>=s){
        let mid=Math.floor(s+(e-s)/2);

        if(a[mid]==target)return true;


        if(a[mid]<target)return binarysearch(a,mid+1,e,target);
        else if(a[mid]>target)return binarysearch(a,s,mid-1,target);
    
    }
    
    return false;
}

let a=[1,2,3,4,5,6];
let target1=6;
let target2=7;

console.log(binarysearch(a,0,a.length-1,target1));
console.log(binarysearch(a,0,a.length-1,target2));

console.log(binarysearch(a,0,a.length-1,0));

console.log(binarysearch(a,0,a.length-1,1000));
