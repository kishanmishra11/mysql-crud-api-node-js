const helper = require('../helper/helper')
const bcrypt = require('bcrypt')
const conn = require('../db/connection')
const mysql = require('mysql')
const jwt = require('jsonwebtoken')



exports.createAdmin = async (req,res)=>{
    try{
        let admin = req.body;
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        let query = "insert into admin(name,email,password) values(?,?,?)";
        conn.query(query,[admin.name,admin.email,hashedPassword],(err,result)=>{
            if(!err){
                return helper.success(res,("Admin Added Successfully"),1,200,"");
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


exports.loginAdmin = async (req,res)=>{
    try {
        const email = req.body.email
        const password = req.body.password
        const sqlSearch = "Select * from admin where email = ?"
        const search_query = mysql.format(sqlSearch,[email])
        await conn.query (search_query, async (err, result) => {
            if (err) throw (err)
            if (result.length == 0) {
                return res.status(400).json({message:"Admin Does Not Exists"});
            }
            else {
                const id = result[0].id
                const hashedPassword = result[0].password
                const token = jwt.sign({id}, "mynameiskishan", {expiresIn: '1h'});
                if (await bcrypt.compare(password, hashedPassword)) {
                    return helper.success(res,("Admin Login Successfully"),1,200,"",{token:token});
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

exports.listUser = async (req,res)=>{
    try{
        let reqParam = req.body;
        let sortBy = reqParam?.sortBy ? reqParam.sortBy : "id";
        let sortOrder = reqParam?.sortOrder ? reqParam.sortOrder : "ASC";
        let limit = reqParam?.limit ? reqParam.limit : 5;
        let offset = reqParam?.offset ? reqParam.offset : 0;
        let searchField = reqParam?.searchField ? reqParam.searchField : "name";
        let search = reqParam?.search ? reqParam.search : "";
        conn.query("select * from user where "+searchField+" LIKE  '%"+search+"%' ORDER BY "+sortBy+" "+sortOrder+" LIMIT "+limit+" OFFSET "+offset+" " , (err,result) => {
            if (!err) {
                return helper.success(res,("user Listed Successfully"),1,200,result);
                // return res.status(200).json(result);
            } else {
                return helper.error(res,500,("Something Went Wrong"));
            }
        })
    }catch (e) {
        return res.status(e)
    }
}

exports.viewUser = async (req,res)=>{
    try{
        const id = req.body.id;
        const query = "select * from user where id=?";
        conn.query(query,[id],(err,result)=>{
            if(!err){
                return helper.success(res,("user Viewed Successfully"),1,200,result);
                // return res.status(200).json(result);
            }else{
                return helper.error(res,500,("Something Went Wrong"));
            }
        })
    }catch (e) {
        return res.status(e)
    }
}


exports.editUser = async (req,res)=>{
    try{
        conn.query('SELECT * FROM user WHERE id = ?', [req.body.id], (err, rows, fields) => {
            let reqParam = req.body;
            let name,email,phone,sqlQuery
            if (!err)
                name = reqParam?.name ? reqParam.name : rows[0].name,
                    email = reqParam?.email ? reqParam.email : rows[0].email,
                    phone = reqParam?.phone ? reqParam.phone : rows[0].phone,
                    sqlQuery = "UPDATE user SET name = '" + name + "',email = '" + email + "',phone = '" + phone + "' WHERE id = " + req.body.id,
                    conn.query(sqlQuery,(err, result) => {
                        if (!err) {
                            if (result.affectedRows == 0) {
                                return res.status(404).json({message: "User Id does not Found"});
                            }
                            return res.status(200).json({message: "User Updated Successfully"});
                        } else {
                            console.log(err)
                            return helper.error(res,500,("Something Went Wrong"));
                        }

                    })
        })
    }catch (e) {
        return res.status(e)
    }
}


exports.deleteUser = async (req,res)=>{
    try{
        const id = req.body.id;
        const query = "delete from user where id=?";
        conn.query(query,[id],(err,result)=>{
            if(!err){
                if(result.affectedRows == 0){
                    return helper.success(res,("User Id does not Found"),0,200);
                    // return res.status(404).json({message:"User Id does not Found"});
                }
                return helper.success(res,("User Deleted Successfully"),1,200,result);
                // return res.status(200).json({message:"User Deleted Successfully"});
            }else{
                return helper.error(res,500,("Something Went Wrong"));
            }
        })
    }catch (e) {
        return res.status(e)
    }
}


