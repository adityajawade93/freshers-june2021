const sqlclient = require("./index");


   exports.execute1=async (roll_num,fname,lname,standard,subcode) =>{
    await sqlclient.query("SET search_path TO school");
    const data = [roll_num,fname,lname,standard,subcode];
    console.log(data);
    return await sqlclient.query("INSERT INTO Students values($1,$2,$3,$4,$5)",data);
  };
  

   exports.execute2= async (subcode,subject,staffid) =>{
   
    await sqlclient.query("SET search_path TO school");
    const data = [subcode,subject,staffid];
    return await sqlclient.query("INSERT INTO Subjects values($1,$2,$3)",data);     
  };
  
  exports.execute3 = async (staffid,fname,lname,subcode) =>{
      
    await sqlclient.query("SET search_path TO school");
    const data = [staffid,fname,lname,subcode];
    //console.log(data);
    return await sqlclient.query("INSERT INTO Teachers values($1,$2,$3,$4)",data);   
};

exports.execute4 = async(uniclassid,Standard,classno,subcode,subject,staffid,T_fname) => {
           
            await sqlclient.query("SET search_path TO school");
            const data = [uniclassid,Standard,classno,subcode,subject,staffid,T_fname];
           return await sqlclient.query("INSERT INTO Class_schedule values($1,$2,$3,$4,$5,$6,$7)",data) 
                };
                
exports.execute5 = async (resultsid,roll_num,subcode,staffid,standard,marks) =>{
             await sqlclient.query("SET search_path TO school");
             const data = [resultsid,roll_num,subcode,staffid,standard,marks];
            return await sqlclient.query("INSERT INTO Marks values($1,$2,$3,$4,$5,$6)",data)
                };