

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//create pool for postgre database
const Pool = require('pg').Pool;
const pool = new Pool ({
    user : "postgres",
    password : "root",
    host : "localhost",
    port : 5432,
    database : "db_kuis"
});
const fs = require('fs');
const app = express();

const port = process.env.PORT || 1337;



//IMPORT API
const {readProvince, addProvince, editProvince, filterProvince, deleteProvince} = require('./api-province.js');
const {readCategory, addCategory, editCategory, filterCategory, deleteCategory} = require('./api-category.js');
const {readRoles, addRoles, editRoles, filterRoles, deleteRoles} = require('./api-roles.js');
const { readUsers, addUsers, editUsers, filterUsers, deleteUsers } = require('./api-users.js');
const { readCity, addCity, editCity, filterCity, deleteCity } = require('./api-city.js');
const { readUserRoles, addUserRoles, editUserRoles, filterUserRoles, deleteUserRoles} = require('./api-user-roles.js');
const { readProduct, addProduct, editProduct, filterProduct, deleteProduct } = require('./api-product.js');
const { readAddress, addAddress, editAddress, filterAddress, deleteAddress } = require('./api-address.js');
const { readProductImages, addProductImages, editProductImages, filterProductImages, deleteProductImages } = require('./api-product-images.js');
const { readCart, addCart, editCart, filterCart, deleteCart } = require('./api-cart.js');


app.use(cors());
app.use(express.urlencoded({extended : true}));
app.use(express.json());



// const app = express();

//router
app.get("/", responseText);
app.get("/json", responseJson);
app.get("/static/*", responseStatic);
app.listen(port, () => console.log(`Server listening on port ${port}`));


//panggil province
readProvince(app, pool);
addProvince(app, pool);
editProvince(app, pool);
filterProvince(app, pool);
deleteProvince(app, pool);

//panggil Category
readCategory(app, pool);
addCategory(app, pool);
editCategory(app, pool);
filterCategory(app, pool);
deleteCategory(app, pool);

//panggil Roles
readRoles(app, pool);
addRoles(app, pool);
editRoles(app, pool);
filterRoles(app, pool);
deleteRoles(app, pool);

//panggil Users
readUsers(app, pool);
addUsers(app, pool);
editUsers(app, pool);
filterUsers(app, pool);
deleteUsers(app, pool);

//panggil City
readCity(app, pool);
addCity(app, pool);
editCity(app, pool);
filterCity(app, pool);
deleteCity(app, pool);

//panggil User_roles
readUserRoles(app, pool);
addUserRoles(app, pool);
editUserRoles(app, pool);
filterUserRoles(app, pool);
deleteUserRoles(app, pool);

//panggil Product
readProduct(app, pool);
addProduct(app, pool);
editProduct(app, pool);
filterProduct(app, pool);
deleteProduct(app, pool);

//panggil Address
readAddress(app, pool);
addAddress(app, pool);
editAddress(app, pool);
filterAddress(app, pool);
deleteAddress(app, pool);

//panggil Product_images
readProductImages(app, pool);
addProductImages(app, pool);
editProductImages(app, pool);
filterProductImages(app, pool);
deleteProductImages(app, pool);

//panggil Cart
readCart(app, pool);
addCart(app, pool);
editCart(app, pool);
filterCart(app, pool);
deleteCart(app, pool);



function responseText(req, res){
    res.setHeader("Content-Type", "text/plain");
    res.end("JS Bootcamp with code.id");
}

function responseJson(req, res){
    res.setHeader("Content-type","application/json");
    res.end(JSON.stringify(product));
}

function responseStatic(req, res){
    const filename = `${__dirname}/public${req.url.split('/static')[1]}`;
    fs.createReadStream(filename)
        .on("Error", ()=> responseNotFound(req,res))
        .pipe(res);
    
}

function responseNotFound(req, res){
    res.writeHead(404,{"Content-Type":"text/plain"});
    res.end("Page Not Found");
}