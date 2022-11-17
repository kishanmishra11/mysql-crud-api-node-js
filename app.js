const express = require('express');
const conn = require('./src/db/connection')
const productRoute = require('./src/routes/productRoute')
const brandRoute = require('./src/routes/brandRoute')
const queryRoute = require('./src/routes/queryRoute')
const userRoute = require('./src/routes/userRoute')
const adminRoute = require('./src/routes/adminRoute')


const app = express()
const  port = 3000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/product',productRoute);
app.use('/brand',brandRoute);
app.use('/query',queryRoute);
app.use(userRoute);
app.use(adminRoute);


app.listen(port)

module.exports = app;