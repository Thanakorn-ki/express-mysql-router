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
// ////////////////////////////////////////////////////
router.get('/users/:id', function(req, res) {
        console.log(req.params.id);
        pool.getConnection(function(err, conn) {
            conn.query('SELECT * from member where id = ' + req.params.id, function(err, rows, fields) {
                if (err) throw err;
                res.json(rows);
                conn.release();
            });
        });
    })
    // ////////////////////////////////////////////////////
router.get('/users', function(req, res) {
        pool.getConnection(function(err, conn) {
            conn.query('SELECT * from member', function(err, rows, fields) {
                if (err) throw err;
                res.json(rows);
                conn.release();
            });
        });
    })
    // ////////////////////////////////////////////////////
router.post('/users', function(req, res) {
    pool.getConnection(function(err, conn) {
        conn.query('insert into member values ("","' + req.body.name + '","","","","","","disabled")', function(err, rows, fields) {
            if (err) throw err;
            res.send("inserted");
            conn.release();
        });
    });
});
// ////////////////////////////////////////////////////
router.delete('/users/:id', function(req, res) {
    pool.getConnection(function(err, conn) {
        conn.query('DELETE from member where id = ' + req.params.id, function(err, rows, fields) {
            if (err) throw err;
            res.send("deletes");
            conn.release();
        });
    });
});

module.exports = router
