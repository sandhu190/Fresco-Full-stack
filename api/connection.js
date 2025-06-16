const mysql=require("mysql")

//DB connection //
const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:'amritsar',
    database:"blinkit"
})
connection.connect((error)=>{
    if(error){
        console.log(error);
    }else {
        console.log("Db connected")
    }
})

module.exports = connection