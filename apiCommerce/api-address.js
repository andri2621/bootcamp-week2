//query menampilkan tabel Address
exports.readAddress = function(app, pool){
    app.get("/api/v1/address", (req,res) =>{
        pool.query(
            "select addr_id, addr_email, addr_fullname, addr_phone_number, addr_is_default, addr_zipcode, addr_street1, addr_street2, addr_user_id, addr_city_id from Address",
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


//insert Address
exports.addAddress = function(app, pool){
    app.post("/api/v1/address", (req, res) => {
        const {addr_email, addr_fullname, addr_phone_number, addr_is_default, addr_zipcode, addr_street1, addr_street2, addr_user_id, addr_city_id} = req.body;
        pool.query(
            "insert into Address (addr_email, addr_fullname, addr_phone_number, addr_is_default, addr_zipcode, addr_street1, addr_street2, addr_user_id, addr_city_id) values (($1),($2),($3),($4),($5),($6),($7),($8),($9))",
            [addr_email, addr_fullname, addr_phone_number, addr_is_default, addr_zipcode, addr_street1, addr_street2, addr_user_id, addr_city_id],
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
exports.editAddress = function(app, pool){
    app.put("/api/v1/address/", (req, res) => {
        const {addr_id, addr_email, addr_fullname, addr_phone_number, addr_is_default, addr_zipcode, addr_street1, addr_street2, addr_user_id, addr_city_id
        } = req.body;
        pool.query(
            "update Address set addr_email =$1, addr_fullname=$2, addr_phone_number=$3, addr_is_default=$4, addr_zipcode=$5, addr_street1=$6, addr_street2=$7, addr_user_id=$8, addr_city_id=$9 where addr_id =$10",
            [addr_email, addr_fullname, addr_phone_number, addr_is_default, addr_zipcode, addr_street1, addr_street2, addr_user_id, addr_city_id, addr_id
            ],
            (error, results) =>{
                if(error){
                    throw error;
                }
                res.sendStatus(200);
            }
        )
    })
}

//query by filter Address
exports.filterAddress = function(app, pool){
    app.get("/api/v1/address/:id", (req,res) =>{
        const{id} = req.params;
        pool.query(
            "select addr_id, addr_email, addr_fullname, addr_phone_number, addr_is_default, addr_zipcode, addr_street1, addr_street2, addr_user_id, addr_city_id from Address where addr_id = $1",
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

//delete query Address
exports.deleteAddress = function(app, pool){
    app.delete("/api/v1/address/:id", (req, res) => {
        const {id} = req.params;
        pool.query(
            "delete from Address where addr_id =$1",
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