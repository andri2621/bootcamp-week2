
//query menampilkan tabel User_roles
exports.readUserRoles = function(app, pool){
    app.get("/api/v1/user_roles", (req,res) =>{
        pool.query(
            "select user_id, role_id from User_roles",
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

//insert User_roles
exports.addUserRoles = function(app, pool){
    app.post("/api/v1/user_roles", (req, res) => {
        const {user_id, role_id} = req.body;
        pool.query(
            "insert into User_roles (user_id, role_id) values (($1),($2))",
            [user_id, role_id],
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
exports.editUserRoles = function(app, pool){
    app.put("/api/v1/user_roles/", (req, res) => {
        const {user_id, role_id} = req.body;
        pool.query(
            "update User_roles set role_id =$1 where user_id =$2",
            [ role_id, user_id],
            (error, results) =>{
                if(error){
                    throw error;
                }
                res.sendStatus(200);
            }
        )
    })
}


//query by filter User_roles
exports.filterUserRoles = function(app, pool){
    app.get("/api/v1/user_roles/:id", (req,res) =>{
        const{id} = req.params;
        pool.query(
            "select user_id, role_id FROM User_roles where user_id = $1",
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

//delete query User_roles
exports.deleteUserRoles = function(app, pool){
    app.delete("/api/v1/user_roles/:id", (req, res) => {
        const {id} = req.params;
        pool.query(
            "delete from User_roles where user_id =$1",
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