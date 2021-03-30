//query menampilkan tabel Users
exports.readUsers = function(app, pool){
    app.get("/api/v1/users", (req,res) =>{
        pool.query(
            "select user_name, user_email, user_password from Users",
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


//insert Users
exports.addUsers = function(app, pool){
    app.post("/api/v1/users", (req, res) => {
        const {user_name, user_email, user_password} = req.body;
        pool.query(
            "insert into Users (user_name, user_email, user_password) values (($1),($2),($3))",
            [user_name, user_email, user_password],
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
exports.editUsers = function(app, pool){
    app.put("/api/v1/users/", (req, res) => {
        const {user_id, user_name, user_email, user_password} = req.body;
        pool.query(
            "update Users set user_name =$1, user_email=$2, user_password=$3 where user_id =$4",
            [user_name, user_email, user_password, user_id],
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
exports.filterUsers = function(app, pool){
    app.get("/api/v1/users/:id", (req,res) =>{
        const{id} = req.params;
        pool.query(
            "select user_id, user_name, user_email, user_password from Users where user_id = $1",
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
exports.deleteUsers = function(app, pool){
    app.delete("/api/v1/users/:id", (req, res) => {
        const {id} = req.params;
        pool.query(
            "delete from Users where user_id =$1",
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