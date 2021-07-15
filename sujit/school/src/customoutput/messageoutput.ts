export const costomerror = async (status:number|undefined,errormsg:string) =>{
    if(status==undefined){
        return {error:errormsg}
    }else{
        return {status:status,
            error:errormsg}
    }
}

export const costommessage = async (status:number|undefined,msg:string) =>{
    if(status==undefined){
        return {message:msg}
    }else{
        return {status:status,
            message:msg}
    }
}