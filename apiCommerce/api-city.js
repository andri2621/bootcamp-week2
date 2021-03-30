
//query menampilkan tabel City
exports.readCity = function(app, pool){
    app.get("/api/v1/city", (req,res) =>{
        pool.query(
            "select city_id, city_name, city_prov_id from City",
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

//insert City
exports.addCity = function(app, pool){
    app.post("/api/v1/city", (req, res) => {
        const {city_name, city_prov_id} = req.body;
        pool.query(
            "insert into City (city_name, city_prov_id) values (($1),($2))",
            [city_name, city_prov_id],
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
exports.editCity = function(app, pool){
    app.put("/api/v1/city/", (req, res) => {
        const {city_id, city_name, city_prov_id} = req.body;
        pool.query(
            "update City set city_name =$1, city_prov_id=$2 where city_id =$3",
            [city_name, city_prov_id, city_id],
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
exports.filterCity = function(app, pool){
    app.get("/api/v1/city/:id", (req,res) =>{
        const{id} = req.params;
        pool.query(
            "select city_id, city_name, city_prov_id from City where city_id = $1",
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
exports.deleteCity = function(app, pool){
    app.delete("/api/v1/city/:id", (req, res) => {
        const {id} = req.params;
        pool.query(
            "delete from City where city_id =$1",
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