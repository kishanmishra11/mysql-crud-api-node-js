const mysql = require('mysql');

let conn = mysql.createConnection({
    host: "localhost",
    user:"admin",
    password:"pass",
    database:"crud"
})

//Connect Database
conn.connect((err)=>{
    if(!err){
        console.log("Database connected successfully...");
    }else{
        console.log(err);
    }
})

// Create Database
/*conn.connect(function(err) {
    if (err) throw err;
    console.log("Database connected successfully...!");
    conn.query("CREATE DATABASE demo", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
});*/


//Create Table
/*conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE category (id INT AUTO_INCREMENT PRIMARY KEY , categoryName VARCHAR(255))";
    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});*/

//SQL Inner Join Query
/*conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "SELECT brand.brandName AS brand, product.name AS productName FROM brand JOIN product ON brand.brandId = product.productId";
    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Sql Inner Join")
        console.log(result)
    });
});*/

//SQL Left Join Query
/*conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "SELECT brand.brandName AS brand, product.name AS productName FROM brand LEFT JOIN product ON brand.brandId = product.productId";
    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Sql Left Join")
        console.log(result)
    });
});*/

//SQL  Right Join Query
/*conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "SELECT brand.brandName AS brand, product.name AS productName FROM brand RIGHT JOIN product ON brand.brandId = product.productId";
    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Sql Right Join")
        console.log(result)
    });
});*/

//SQL Full Join Query
/*conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "SELECT * FROM brand LEFT JOIN product ON brand.brandId = product.productId UNION ALL SELECT * FROM brand RIGHT JOIN product ON brand.brandId = product.productId ";
    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Sql Full Outer Join")
        console.log(result)
    });
});*/



module.exports = conn;