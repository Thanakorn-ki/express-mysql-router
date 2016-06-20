var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
var router = express.Router()
var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'run'
});
var cors = require('cors')
var corsOptions = {
  origin: ['http://localhost:8080', 'http://127.0.0.1:8080', 'http://192.168.2.125:8080/disabled' ,'http://localhost:8080/disabled' ]
}
// ////////////////////////////////////////////////////
router.get('/users/:id', cors(corsOptions), function(req, res) {
        console.log(req.params.id);
        pool.getConnection(function(err, conn) {
            conn.query('SELECT * from member where mem_id = ' + req.params.id, function(err, rows, fields) {
                if (err) throw err;
                res.json(rows);
                conn.release();
            });
        });
    })
    // ////////////////////////////////////////////////////
router.get('/users', cors(corsOptions), function(req, res) {
        pool.getConnection(function(err, conn) {
            conn.query('SELECT * from member', function(err, rows, fields) {
                if (err) throw err;
                res.json(rows);
                conn.release();
            });
        });
    })
    // ////////////////////////////////////////////////////
router.post('/users', cors(corsOptions), function(req, res) {
  console.log(req.body)
    pool.getConnection(function(err, conn) {
        conn.query('insert into member values ("","' + req.body.name + '","' + req.body.surname + '","' + req.body.gender + '","' + req.body.age + '","","","","","","","","'+req.body.type+'")', function(err, rows, fields) {
            if (err) throw err;
            res.send("inserted");
            conn.release();
        });
    });
});
// ////////////////////////////////////////////////////
router.delete('/users/:id', cors(corsOptions), function(req, res) {
    pool.getConnection(function(err, conn) {
        conn.query('DELETE from member where mem_id = ' + req.params.id, function(err, rows, fields) {
            if (err) throw err;
            res.send("deletes");
            conn.release();
        });
    });
});

module.exports = router
