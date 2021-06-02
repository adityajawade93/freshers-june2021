

function binarySearch(arr,lo,hi,key){
    if(arr==null || key==null || Array.isArray(arr)===false){
        return false;
    }
    while(lo<=hi){
        let mid=Math.floor((lo+hi)/2);
        
        if(arr[mid]==key){
            return true;
        }else if(arr[mid]>key){
            hi=mid-1
        }
        else if(arr[mid]<key){
            lo=mid+1
        }
    }
    return false;
}

let arr=[1,2,3,4,5,6,7,8,9,10,11,12]
let lo=0
let hi=arr.length-1
let key=3

let ans=binarySearch(arr,lo,hi,key)
if(ans) console.log("Key Found")
else console.log("Key Not Found")

module.exports={binarySearch}
