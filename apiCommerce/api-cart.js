
//query menampilkan tabel Cart
exports.readCart = function(app, pool){
    app.get("/api/v1/cart", (req,res) =>{
        pool.query(
            "select cart_id, cart_created_on, cart_is_closed, cart_total, cart_user_id from Cart",
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

//insert Cart
exports.addCart = function(app, pool){
    app.post("/api/v1/cart", (req, res) => {
        const {cart_created_on, cart_is_closed, cart_total, cart_user_id} = req.body;
        pool.query(
            "insert into Cart (cart_created_on, cart_is_closed, cart_total, cart_user_id) values ($1,$2,$3,$4)",
            [cart_created_on, cart_is_closed, cart_total, cart_user_id],
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
exports.editCart = function(app, pool){
    app.put("/api/v1/cart/", (req, res) => {
        const {cart_id, cart_created_on, cart_is_closed, cart_total, cart_user_id} = req.body;
        pool.query(
            "update Cart set cart_created_on =$1, cart_is_closed=$2, cart_total=$3 cart_user_id=$4 where cart_id =$5",
            [cart_created_on, cart_is_closed, cart_total, cart_user_id, cart_id],
            (error, results) =>{
                if(error){
                    throw error;
                }
                res.sendStatus(200);
            }
        )
    })
}



//query by filter Cart
exports.filterCart = function(app, pool){
    app.get("/api/v1/cart/:id", (req,res) =>{
        const{id} = req.params;
        pool.query(
            "select cart_created_on, cart_is_closed, cart_total, cart_user_id from Cart where cart_id = $1",
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

//delete query Cart
exports.deleteCart = function(app, pool){
    app.delete("/api/v1/cart/:id", (req, res) => {
        const {id} = req.params;
        pool.query(
            "delete from Cart where cart_id =$1",
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