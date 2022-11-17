const bcrypt = require('bcrypt')
const conn = require('../db/connection')
const mysql = require('mysql')
const jwt = require('jsonwebtoken')
const helper = require('../helper/helper')


exports.createUser = async (req,res)=>{
    try{
        let user = req.body;
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        let query = "insert into user(name,email,phone,password) values(?,?,?,?)";
        conn.query(query,[user.name,user.email,user.phone,hashedPassword],(err,result)=>{
            if(!err){
                return helper.success(res,("user Added Successfully"),1,200);
                // return res.status(200).json({message:"User Added Successfully"});
            }else{
                console.log(err)
                return helper.error(res,500,("Something Went Wrong"));
            }
        })
    }catch (e) {
        return res.status(e)
    }
}


exports.loginUser = async (req,res)=>{
    try {
        const email = req.body.email
        const password = req.body.password
            const sqlSearch = "Select * from user where email = ?"
            const search_query = mysql.format(sqlSearch,[email])
            await conn.query (search_query, async (err, result) => {
                if (err) throw (err)
                if (result.length == 0) {
                    return res.status(400).json({message:"User Does Not Exists"});
                }
                else {
                    const id = result[0].id
                    const hashedPassword = result[0].password
                    const token = jwt.sign({id}, "mynameiskishan", {expiresIn: '1h'});
                    if (await bcrypt.compare(password, hashedPassword)) {
                        return helper.success(res,("user Login Successfully"),1,200,"",{token:token});
                        // return res.status(200).json({message:"User Login Successfully"});
                    }
                    else {
                        return helper.error(res,500,("Password is In Correct"));
                        // return res.status(400).json({message:"Password is In Correct"});
                    }
                }
        })
    }catch (e) {
        return res.status(e)
    }
}



/*
exports.loginUser = async (req,res)=>{
    try {
        const user = req.body
        const query = "SELECT * FROM user WHERE email = ? AND password = ?";
        conn.query(query,[user.email,user.password], (err, result) => {
            if (err) throw (err)
            if (result.length == 0) {
                console.log("User does not exist")
                return res.status(400).json({message:"User does not exists"});
            } else {
                if (req.body.password == result[0].password) {
                    console.log("Login Successful")
                    return res.status(200).json({message:"User Login Successfully"});
                } else {
                    console.log("Password Incorrect")
                    return res.status(400).json({message:"Password is incorrect"});
                }
            }
        })
    }catch (e) {
        return res.status(e)
    }
}*/
