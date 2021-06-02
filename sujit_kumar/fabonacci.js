//fabonacci series

function fabonacci(number){
   
    let num1=0;num2=1
    fab = [0,1]

    for(let i =2;i<number;i++){
        num3 =num1+num2
        fab.push(num3)
        num1=num2
        num2=num3
    }

    console.log(fab)

}
fabonacci(10)

// find all duplicates in a array

function duplicates(array){
    duplicate=[]
    for(let i=0;i<array.length;i++){
        for(let j=i+1;j<array.length;j++){
            if(array[i]==array[j]){
                duplicate.push(array[i])
                break
            }
        }
    }
    console.log(duplicate)
}

duplicates([1,2,3,4,4,5,6,7,7])


// find 3rd highest in the array


function highest(array){
    
    for(let i=0;i<array.length;i++){
        for(let j=i+1;j<array.length;j++){

            if(array[i]>array[j]){
                temp =array[i]
                array[i]=array[j]
                array[j]=temp
            }

        }
    }

    console.log(array[array.length-3])
    return

}

highest([9,8,7,6,5,4,3,2,1])
