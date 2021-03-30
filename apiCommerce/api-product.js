//query menampilkan tabel Product
exports.readProduct = function(app, pool){
    app.get("/api/v1/product", (req,res) =>{
        pool.query(
            "select prod_id, prod_title, prod_description, prod_stock, prod_price, prod_condition, prod_manufacture, prod_image, prod_cate_id from Product",
            [],
            (error, results) =>{
                if(error){
                    throw error;
                }
                res.status(200).json(results.rows)
            }
        )
    });
}


//insert Product
exports.addProduct = function(app, pool){
    app.post("/api/v1/product", (req, res) => {
        const {prod_title, prod_description, prod_stock, prod_price, prod_condition, prod_manufacture, prod_image, prod_cate_id} = req.body;
        pool.query(
            "insert into Product (prod_title, prod_description, prod_stock, prod_price, prod_condition, prod_manufacture, prod_image, prod_cate_id) values (($1),($2),($3),($4),($5),($6),($7),($8))",
            [prod_title, prod_description, prod_stock, prod_price, prod_condition, prod_manufacture, prod_image, prod_cate_id],
            (error, results) =>{
                if(error){
                    throw error;
                }
                res.sendStatus(201);
            }
        )
    })
}



// // kasus : edit data, tanpa memakai params, tapi semua atribut dikirim melalui body
exports.editProduct = function(app, pool){
    app.put("/api/v1/product/", (req, res) => {
        const {prod_id, prod_title, prod_description, prod_stock, prod_price, prod_condition, prod_manufacture, prod_image, prod_cate_id} = req.body;
        pool.query(
            "update Product set prod_title =$1, prod_description=$2, prod_stock=$3, prod_price=$4, prod_condition=$5, prod_manufacture=$6, prod_image=$7, prod_cate_id=$8 where prod_id =$9",
            [ prod_title, prod_description, prod_stock, prod_price, prod_condition, prod_manufacture, prod_image, prod_cate_id, prod_id],
            (error, results) =>{
                if(error){
                    throw error;
                }
                res.sendStatus(200);
            }
        )
    })
}

//query by filter Product
exports.filterProduct = function(app, pool){
    app.get("/api/v1/product/:id", (req,res) =>{
        const{id} = req.params;
        pool.query(
            "select prod_id, prod_title, prod_description, prod_stock, prod_price, prod_condition, prod_manufacture, prod_image, prod_cate_id from Product where prod_id = $1",
            [id],
            (error, results) =>{
                if(error){
                    throw error;
                }
                res.status(200).json(results.rows)
            }
        )
    });
}

//delete query Product
exports.deleteProduct = function(app, pool){
    app.delete("/api/v1/product/:id", (req, res) => {
        const {id} = req.params;
        pool.query(
            "delete from Product where prod_id =$1",
            [id],
            (error, results) =>{
                if(error){
                    throw error;
                }
                res.sendStatus(200);
            }
        )
    })
}