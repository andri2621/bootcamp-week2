
//query menampilkan tabel Roles
exports.readRoles = function(app, pool){
    app.get("/api/v1/roles", (req,res) =>{
        pool.query(
            "select role_id, role_name from Roles",
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


//insert Roles
exports.addRoles = function(app, pool){
    app.post("/api/v1/roles", (req, res) => {
        const {role_name} = req.body;
        pool.query(
            "insert into Roles (role_name) values ($1)",
            [role_name],
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
exports.editRoles = function(app, pool){
    app.put("/api/v1/roles/", (req, res) => {
        const {role_id, role_name} = req.body;
        pool.query(
            "update Roles set role_name =$1 where role_id =$2",
            [role_name, role_id],
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
exports.filterRoles = function(app, pool){
    app.get("/api/v1/roles/:id", (req,res) =>{
        const{id} = req.params;
        pool.query(
            "select role_id, role_name from Roles where role_id = $1",
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
exports.deleteRoles = function(app, pool){
    app.delete("/api/v1/roles/:id", (req, res) => {
        const {id} = req.params;
        pool.query(
            "delete from Roles where role_id =$1",
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