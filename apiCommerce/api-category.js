
//query menampilkan tabel Category
exports.readCategory = function(app, pool){
    app.get("/api/v1/category", (req,res) =>{
        pool.query(
            "select cate_id, cate_name from Category",
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

//insert Category
exports.addCategory = function(app, pool){
    app.post("/api/v1/category", (req, res) => {
        const {cate_name} = req.body;
        pool.query(
            "insert into Category (cate_name) values ($1)",
            [cate_name],
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
exports.editCategory = function(app, pool){
    app.put("/api/v1/category/", (req, res) => {
        const {cate_id, cate_name} = req.body;
        pool.query(
            "update Category set cate_name =$1 where cate_id =$2",
            [cate_name, cate_id],
            (error, results) =>{
                if(error){
                    throw error;
                }
                res.sendStatus(200);
            }
        )
    })
}


//query by filter
exports.filterCategory = function(app, pool){
    app.get("/api/v1/category/:id", (req,res) =>{
        const{id} = req.params;
        pool.query(
            "select cate_id, cate_name FROM Category where cate_id = $1",
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

//delete query
exports.deleteCategory = function(app, pool){
    app.delete("/api/v1/category/:id", (req, res) => {
        const {id} = req.params;
        pool.query(
            "delete from Category where cate_id =$1",
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