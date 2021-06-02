

    const binary_search=function(arr,target){
        
        if(target===undefined){
            return false;
        }

        if(target===NaN){
            return false;
        }

        if(!Array.isArray(arr)){
            if(arr===target)return "true";
            return false;
        }

        let l=0;
        let h=arr.length-1;
        
        while(l<=h){
            let mid=Math.floor(l+(h-l)/2);
            
            if(arr[mid]==target){
                return "true";
            }
            else if(arr[mid]>target){
                h=mid-1;
                
            }
            else{
                l=mid+1;
            }
        }
        return false;
    }


module.exports = {binary_search};

