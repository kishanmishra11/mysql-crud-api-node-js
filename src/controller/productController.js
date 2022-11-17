const conn = require('../db/connection')


exports.createProduct = async (req,res)=>{
    try{
        let product = req.body;
        let query = "insert into product(name,description,price,productId) values(?,?,?,?)";
        conn.query(query,[product.name,product.description,product.price,product.productId],(err,result)=>{
            if(!err){
                return res.status(200).json({message:"Product Added Successfully"});
            }else{
                console.log(err)
                return res.status(500).json(err);
            }
        })
    }catch (e) {
        return res.status(e)
    }
}

exports.listProduct = async (req,res)=>{
    try{
        // const query = "select * from brand where name like 'i%' ";
        //HAVING COUNT(id) > 2
        let reqParam = req.body;
        let sortBy = reqParam?.sortBy ? reqParam.sortBy : "id";
        let sortOrder = reqParam?.sortOrder ? reqParam.sortOrder : "ASC";
        let limit = reqParam?.limit ? reqParam.limit : 5;
        let offset = reqParam?.offset ? reqParam.offset : 0;
        // connection.query('SELECT * from django_session where session_key like ?', '%' + value + '%', ...)

        let searchField = reqParam?.searchField ? reqParam.searchField : "name";
        let search = reqParam?.search ? reqParam.search : "";
        // conn.query("SELECT COUNT(id), productId FROM product GROUP BY productId ",(err,result)=>{
        // conn.query("SELECT name,price FROM product WHERE EXISTS (SELECT brandName FROM brand WHERE brand.brandId = product.productId AND price < 25000) ",(err,result)=>{
            conn.query("select * from product where "+searchField+" LIKE  '%"+search+"%' ORDER BY "+sortBy+" "+sortOrder+" LIMIT "+limit+" OFFSET "+offset+" ", (err, result) => {
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

exports.viewProduct = async (req,res)=>{
    try{
        const id = req.params.id;
        const query = "select * from product where id=?";
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

exports.updateProduct = async (req,res)=>{
    try{
        conn.query('SELECT * FROM product WHERE id = ?', [req.params.id], (err, rows, fields) => {
            let reqParam = req.body;
            let name, description, price, productId, sqlQuery
            if (!err)
                name = reqParam?.name ? reqParam.name : rows[0].name,
                    description = reqParam?.description ? reqParam.description : rows[0].description,
                    price = reqParam?.price ? reqParam.price : rows[0].price,
                    productId = reqParam?.productId ? reqParam.productId : rows[0].productId,
            // var sql = "SELECT brand.brandName AS brand, product.name AS productName, description, brandId FROM brand JOIN product ON brand.brandId = product.productId";
            sqlQuery = "UPDATE product SET name = '" + name + "',description = '" + description + "',price = '" + price + "',productId = '" + productId + "' WHERE id =" + req.params.id,
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

exports.deleteProduct = async (req,res)=>{
    try{
        const id = req.params.id;
        let query = "delete from product where id=?";
        conn.query(query,[id],(err,result)=>{
            if(!err){
                if(result.affectedRows == 0){
                    return res.status(404).json({message:"Product Id does not Found"});
                }
                return res.status(200).json({message:"Product Deleted Successfully"});
            }else{
                return res.status(500).json(err);
            }
        })
    }catch (e) {
        return res.status(e)
    }
}
