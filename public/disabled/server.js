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
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
var cors = require('cors')
var corsOptions = {
        origin: ['http://localhost:8080', 'http://127.0.0.1:8080', 'http://192.168.2.125:8080/disabled', 'http://localhost:8080/disabled']
    }
    // ////////////////////////////////////////////////////
router.get('/members/normal/:id', cors(corsOptions), function(req, res) {
        pool.getConnection(function(err, conn) {
            conn.query('SELECT * from member where mem_type = "normal" and mem_id = ' + req.params.id, function(err, rows, fields) {
                if (err) throw err;
                res.json(rows);
                conn.release();
            });
        });
    })
    // ////////////////////////////////////////////////////
router.get('/members/normal', cors(corsOptions), function(req, res) {
        pool.getConnection(function(err, conn) {
            conn.query('SELECT * from member where mem_type = "normal"', function(err, rows, fields) {
                if (err) throw err;
                res.json(rows);
                conn.release();
            });
        });
    })
    // ////////////////////////////////////////////////////
router.get('/members/disabled/:id', cors(corsOptions), function(req, res) {
        pool.getConnection(function(err, conn) {
            conn.query('SELECT * from member where mem_type = "disabled" and mem_id = ' + req.params.id, function(err, rows, fields) {
                if (err) throw err;
                res.json(rows);
                conn.release();
            });
        });
    })
    // ////////////////////////////////////////////////////
router.get('/members/disabled', cors(corsOptions), function(req, res) {
        pool.getConnection(function(err, conn) {
            conn.query('SELECT * from member where mem_type = "disabled"', function(err, rows, fields) {
                if (err) throw err;
                res.json(rows);
                conn.release();
            });
        });
    })
    // ////////////////////////////////////////////////////
router.get('/members/:id', cors(corsOptions), function(req, res) {
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
router.get('/members', cors(corsOptions), function(req, res) {
        pool.getConnection(function(err, conn) {
            conn.query('SELECT * from member', function(err, rows, fields) {
                if (err) throw err;
                res.json(rows);
                conn.release();
            });
        });
    })
    // ////////////////////////////////////////////////////
router.post('/members', cors(corsOptions), function(req, res) {
  console.log(req.body.mem_pay)
    pool.getConnection(function(err, conn) {
        conn.query('insert into member values ("","' +
            req.body.mem_name +
            '","' +
            req.body.mem_surname +
            '","' +
            req.body.mem_gender +
            '","' +
            req.body.mem_age +
            '","' +
            req.body.mem_email +
            '","' +
            req.body.mem_tel +
            '","' +
            req.body.mem_date +
            '","' +
            req.body.mem_distance +
            '","' +
            req.body.mem_pic +
            '","' +
            req.body.mem_discription +
            '","' +
            req.body.group_id +
            '","' +
            req.body.mem_type +
            '","' +
            req.body.mem_status +
            '","' +
            req.body.mem_pay + '")',
            function(err, rows, fields) {
                if (err) throw err;
                res.send("inserted");
                conn.release();
            });
    });
});
// ////////////////////////////////////////////////////
router.delete('/members/:id', cors(corsOptions), function(req, res) {
    // console.log(req.params.id)
    pool.getConnection(function(err, conn) {
        conn.query('DELETE from member where mem_id = ' + req.params.id, function(err, rows, fields) {
            if (err) throw err;
            res.send("deletes");
            conn.release();
        });
    });
});
// ////////////////////////////////////////////////////
router.put('/members', cors(corsOptions), function(req, res) {
    console.log(req.body)
    pool.getConnection(function(err, conn) {
        conn.query('UPDATE member set mem_name = ' + req.body.mem_name +
            ', mem_surname = ' + req.body.mem_surname +
            ', mem_gender = ' + req.body.mem_gender +
            ' , mem_age = ' + req.body.mem_age +
            ' , mem_email = ' + req.body.mem_email +
            ' , mem_tel = ' + req.body.mem_tel +
            ' , mem_date = ' + req.body.mem_date +
            ' , mem_distance = ' + req.body.mem_distance +
            ' , mem_pic = ' + req.body.mem_pic +
            ' , mem_discription = ' + req.body.mem_discription +
            ' , group_id = ' + req.body.group_id +
            ' , mem_type= ' + req.body.mem_type +
            ' , mem_status= ' + req.body.mem_status +
            ' , mem_pay= ' + req.body.mem_pay +
            ' where mem_id = ' + req.body.id,
            function(err, rows, fields) {
                if (err) throw err;
                res.send("Update");
                conn.release();
            });
    });
});
////////////////////////////////////////////////////////////

module.exports = router
