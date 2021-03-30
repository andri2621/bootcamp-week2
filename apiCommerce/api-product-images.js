
//query menampilkan tabel Product_images
exports.readProductImages = function(app, pool){
    app.get("/api/v1/product_images", (req,res) =>{
        pool.query(
            "select prim_id, prim_file_name, prim_path, prim_prod_id from Product_images",
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

//insert Product_images
exports.addProductImages = function(app, pool){
    app.post("/api/v1/product_images", (req, res) => {
        const {prim_file_name, prim_path, prim_prod_id} = req.body;
        pool.query(
            "insert into Product_images (prim_file_name,prim_path,prim_prod_id) values ($1,$2,$3)",
            [prim_file_name, prim_path, prim_prod_id],
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
exports.editProductImages = function(app, pool){
    app.put("/api/v1/product_images/", (req, res) => {
        const {prim_id, prim_file_name, prim_path, prim_prod_id} = req.body;
        pool.query(
            "update Product_images set prim_file_name =$1, prim_path=$2, prim_prod_id=$3 where prim_id =$4",
            [ prim_file_name, prim_path, prim_prod_id, prim_id],
            (error, results) =>{
                if(error){
                    throw error;
                }
                res.sendStatus(200);
            }
        )
    })
}



//query by filter Product_images
exports.filterProductImages = function(app, pool){
    app.get("/api/v1/product_images/:id", (req,res) =>{
        const{id} = req.params;
        pool.query(
            "select prim_id, prim_file_name, prim_path, prim_prod_id from Product_images where prim_id = $1",
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

//delete query Product_images
exports.deleteProductImages = function(app, pool){
    app.delete("/api/v1/product_images/:id", (req, res) => {
        const {id} = req.params;
        pool.query(
            "delete from Product_images where prim_id =$1",
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