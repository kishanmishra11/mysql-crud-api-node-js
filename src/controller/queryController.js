const conn = require('../db/connection')


exports.innerJoin = async (req,res)=>{
    try{
        var sql = "SELECT brand.brandName AS brand, product.name AS productName, description, brandId FROM brand JOIN product ON brand.brandId = product.productId";
        // var sql = "SELECT brand.brandName, COUNT(brand.id) AS NumberOfProduct FROM (brand INNER JOIN product ON brand.brandId = product.productId) GROUP BY brandName HAVING COUNT(product.productId) > 2";
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Sql Inner Join")
            console.log(result)
            res.send(result)
        });
    }catch (e) {
        return res.err(e)
    }
}

exports.leftJoin = async (req,res)=>{
    try{
        var sql = "SELECT brand.brandName AS brand, product.name AS productName FROM brand LEFT JOIN product ON brand.brandId = product.productId";
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Sql Left Join")
            console.log(result)
            res.send(result)
        });
    }catch (e) {
        return res.err(e)
    }
}


exports.rightJoin = async (req,res)=>{
    try{
        var sql = "SELECT brand.brandName AS brand, product.name AS productName FROM brand RIGHT JOIN product ON brand.brandId = product.productId";
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Sql Right Join")
            console.log(result)
            res.send(result)
        });
    }catch (e) {
        return res.err(e)
    }
}

exports.fullJoin = async (req,res)=>{
    try{
        var sql = "SELECT * FROM brand LEFT JOIN product ON brand.brandId = product.productId UNION ALL SELECT * FROM brand RIGHT JOIN product ON brand.brandId = product.productId ";
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Sql Full Join")
            console.log(result)
            res.send(result)
        });
    }catch (e) {
        return res.err(e)
    }
}

exports.groupBy = async (req,res)=>{
    try{
        // conn.query("SELECT COUNT(id), productId FROM product GROUP BY productId ",(err,result)=>{
        conn.query("SELECT MIN(price), productId FROM product GROUP BY productId ",(err,result)=>{
        // conn.query("SELECT MIN(id), productId FROM product GROUP BY productId ",(err,result)=>{
        // conn.query("SELECT SUM(price), productId FROM product GROUP BY productId ",(err,result)=>{
        // conn.query("SELECT AVG(id), productId FROM product GROUP BY productId ",(err,result)=>{
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


exports.having = async (req,res)=>{
    try{
        conn.query("SELECT COUNT(id), productId FROM product GROUP BY productId HAVING COUNT(id) > 2",(err,result)=>{
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


exports.exists = async (req,res)=>{
    try{
        let reqParam = req.body;
        let productId = reqParam?.productId ? reqParam.productId : "101"
        let price = reqParam?.price ? reqParam.price : "30000"
        conn.query("SELECT productId,name,price FROM product WHERE EXISTS (SELECT brandName FROM brand WHERE brand.brandId AND product.productId = '" + productId + "' AND price < '" + price + "')  ",(err,result)=>{
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


exports.updateWithJoin = async (req,res)=>{
    try{
        conn.query('SELECT * FROM product WHERE id = ?', [req.params.id], (err, rows, fields) => {
            let reqParam = req.body;
            let name, description, price, productId, sqlQuery
            if (!err)
                    name = reqParam?.name ? reqParam.name : rows[0].name,
                    description = reqParam?.description ? reqParam.description : rows[0].description,
                    price = reqParam?.price ? reqParam.price : rows[0].price,
                    productId = reqParam?.productId ? reqParam.productId : rows[0].productId,
                        sqlQuery = "UPDATE product INNER JOIN brand ON product.productId = brand.brandId SET name = '" + name + "',description = ' " + description + "',price = '" + price + "',productId = '" + productId + "' WHERE product.id = " + req.params.id ,
            conn.query(sqlQuery, (err, result) => {
                if (!err) {
                    if (result.affectedRows == 0) {
                        return res.status(404).json({message: "Product Id does not Found"});
                    }
                    return res.status(200).json({message: "Product Updated Successfully"});
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


exports.subQuery = async (req,res)=>{
    try{
        conn.query("SELECT name,price FROM product WHERE price = (SELECT MIN(price) from product ) ",(err,result)=>{
        //conn.query("SELECT brandId,brandName FROM brand WHERE brandId IN (SELECT productId from product ) ",(err,result)=>{
        //conn.query("SELECT brandId,brandName FROM brand JOIN(SELECT productId, SUM(price) AS sales FROM product GROUP BY productId) AS brandName ON brandId = productId",(err,result)=>{
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