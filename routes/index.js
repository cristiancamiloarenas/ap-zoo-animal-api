var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
const bodyParser = require('body-parser');
router.use(bodyParser.json());

var connection = mysql.createConnection({
    host: "mysql-database.c841feom24hb.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "adminadmin",
    port: "3306",
    database: "schema"
});
connection.connect(function (err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
    connection.query('CREATE DATABASE IF NOT EXISTS main;');
    connection.query('USE main;');
    connection.query('CREATE TABLE IF NOT EXISTS Animal(id varchar (200), nombre varchar(200), sexo varchar(30), especie varchar(200));', function(error, result, fields) {
        console.log(result);
    });

});

/* GET home page. */
router.get('/readAnimals', (req, res) => {
    var sql = "SELECT * FROM main.Animal";
    connection.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.statusCode=200;
        res.setHeader('Content-Type',"application/json");
        res.json({
            error:err,
            rows: result
        })

    })
})

router.post("/createAnimal", (req, res) => {
    var sql = `INSERT INTO main.Animal VALUES('${req.body.id}','${req.body.nombre}','${req.body.sexo}','${req.body.especie}')`;
    connection.query(sql,(err,result)=>{
        if(err) throw err;
        res.statusCode=200;
        res.setHeader('Content-Type',"application/json");
        res.json({
            error:err
        })
    })
})

router.put("/updateAnimal", (req, res) => {
    var sql = `UPDATE main.Animal SET nombre='${req.body.nombre}',sexo = '${req.body.sexo}', especie='${req.body.especie}' where id='${req.body.id}'`;
    connection.query(sql,(err,result)=>{
        if(err) throw err;
        res.statusCode=200;
        res.setHeader('Content-Type',"application/json");
        res.json({
            error:err
        })
    })
})

router.delete("/deleteAnimal", (req, res) => {
    var sql = `DELETE FROM main.Animal WHERE id='${req.body.id}'`;
    connection.query(sql,(err,result)=>{
        if(err) throw err;
        res.statusCode=200;
        res.setHeader('Content-Type',"application/json");
        res.json({
            error:err
        })
    })
})
module.exports = router;
