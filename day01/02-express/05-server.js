const fs = require('fs');
const port = process.env.PORT || 1337;


//initial variable app to handle module express
const express = require('express');
const app = express();

//router
app.get("/", responseText);
app.get("/json", responseJson);
app.get("/static/*", responseStatic);
app.listen(port,()=> console.log(`Server listening to port ${port}`));

const product = {
    id:1,
    names : "Laptop Dell",
    price : 15000000.00,
    variant : {
        type : "Gamer",
        core : "i7-9900HQ"
    }
}

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