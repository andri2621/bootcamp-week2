// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// //create pool for postgre database
// const Pool = require('pg').Pool;
// const pool = new Pool ({
//     user : "postgres",
//     password : "root",
//     host : "localhost",
//     port : 5432,
//     database : "db_kuis"
// });

// const app = express();
// app.use(cors());
// app.use(express.urlencoded({extended : true}));
// app.use(express.json());

// const port = process.env.PORT || 1337;
// app.listen(port, () => console.log(`Server listening on port ${port}`));


//query menampilkan tabel Province
exports.readProvince = function(app, pool){
        app.get("/api/v1/province", (req,res) =>{
            pool.query(
                "select prov_id, prov_name from Province",
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




//insert province
exports.addProvince = function(app, pool){
    app.post("/api/v1/province", (req, res) => {
    const {prov_name} = req.body;
    pool.query(
            "insert into Province (prov_name) values ($1)",
            [prov_name],
            (error, results) =>{
                if(error){
                    throw error;
                }
                res.sendStatus(201);
            }
        )
    })
}

//update table use method put
// app.put("/api/v1/regions/:id", (req, res) => {
//     const {id} = req.params;
//     const {region_name} = req.body;
//     pool.query(
//         "update regions set region_name =$1 where region_id =$2",
//         [region_name, id],
//         (error, results) =>{
//             if(error){
//                 throw error;
//             }
//             res.sendStatus(200);
//         }
//     )
// })


// kasus : edit data, tanpa memakai params, tapi semua atribut dikirim melalui body
exports.editProvince = function(app, pool){
    app.put("/api/v1/province/", (req, res) => {
        const {prov_id, prov_name} = req.body;
        pool.query(
            "update Province set prov_name =$1 where prov_id =$2",
            [prov_name, prov_id],
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
exports.filterProvince = function(app, pool){
    app.get("/api/v1/province/:id", (req,res) =>{
        const{id} = req.params;
        pool.query(
            "select prov_id, prov_name from Province where prov_id = $1",
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
exports.deleteProvince = function(app, pool){
    app.delete("/api/v1/province/:id", (req, res) => {
        const {id} = req.params;
        pool.query(
            "delete from Province where prov_id =$1",
            [id],
            (error, results) =>{
                if(error){
                    throw error;
                }
                res.sendStatus(200);
            }
        )
    });
}