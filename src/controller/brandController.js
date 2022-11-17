const conn = require('../db/connection')
const express = require("express");
const app = express();
const https = require('https');
const Paytm = require('paytmchecksum');
var paytmParams = {};

exports.createBrand = async (req,res)=>{
    try{
        let brand = req.body;
        const query = "insert into brand(brandName,brandId) values(?,?)";
        conn.query(query,[brand.brandName,brand.brandId],(err,result)=>{
            if(!err){
                return res.status(200).json({message:"Brand Added Successfully"});
            }else{
                console.log(err)
                return res.status(500).json(err);
            }
        })
    }catch (e) {
        return res.status(e)
    }
}

exports.listBrand = async (req,res)=>{
    try{
        // const query = "select * from brand LIMIT 2 OFFSET 2";
        // const query = "select * from brand ORDER BY id ASC";
        // const query = "select * from brand where name like 'i%' ";
        let reqParam = req.body;
        let sortBy = reqParam?.sortBy ? reqParam.sortBy : "id";
        let sortOrder = reqParam?.sortOrder ? reqParam.sortOrder : "ASC";
        let limit = reqParam?.limit ? reqParam.limit : 5;
        let offset = reqParam?.offset ? reqParam.offset : 0;
        let searchField = reqParam?.searchField ? reqParam.searchField : "brandName";
        let search = reqParam?.search ? reqParam.search : "";
        conn.query("select * from brand where "+searchField+" LIKE  '%"+search+"%' ORDER BY "+sortBy+" "+sortOrder+" LIMIT "+limit+" OFFSET "+offset+" " , (err,result) => {
            if (!err) {
                return res.status(200).json(result);
            } else {
                return res.status(500).json(err);
            }
        })
    }catch (e) {
        return res.status(e)
    }
}

exports.viewBrand = async (req,res)=>{
    try{
        const id = req.params.id;
        const query = "select * from brand where id=?";
        conn.query(query,[id],(err,result)=>{
            if(!err){
                return res.status(200).json(result);
            }else{
                return res.status(500).json(err);
            }
        })
    }catch (e) {
        return res.status(e)
    }
}

exports.updateBrand = async (req,res)=>{
    try{
        conn.query('SELECT * FROM brand WHERE id = ?', [req.params.id], (err, rows, fields) => {
            let reqParam = req.body;
            let brandName,brandId,sqlQuery
            if (!err)
                brandName = reqParam?.brandName ? reqParam.brandName : rows[0].brandName,
                    brandId = reqParam?.brandId ? reqParam.brandId : rows[0].brandId,
                    sqlQuery = "UPDATE brand SET brandName = '" + brandName + "',brandId = '" + brandId + "' WHERE id = " + req.params.id,
                    conn.query(sqlQuery,(err, result) => {
                        if (!err) {
                            if (result.affectedRows == 0) {
                                return res.status(404).json({message: "brand Id does not Found"});
                            }
                            return res.status(200).json({message: "Brand Updated Successfully"});
                        } else {
                            console.log(err)
                            return res.status(500).json(err);
                        }

                    })
        })
    }catch (e) {
        return res.status(e)
    }
}

exports.deleteBrand = async (req,res)=>{
    try{
        const id = req.params.id;
        const query = "delete from brand where id=?";
        conn.query(query,[id],(err,result)=>{
            if(!err){
                if(result.affectedRows == 0){
                    return res.status(404).json({message:"Brand Id does not Found"});
                }
                return res.status(200).json({message:"Brand Deleted Successfully"});
            }else{
                return res.status(500).json(err);
            }
        })
    }catch (e) {
        return res.status(e)
    }
}

