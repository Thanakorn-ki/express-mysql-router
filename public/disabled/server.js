var express = require('express');
var bodyParser = require('body-parser');
var respond = require('../helper/respond');
var q = require('q');
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
    // get type normal and id traget
router.get('/members/normal/:id', cors(corsOptions), function(req, res) {
        pool.getConnection(function(err, conn) {
            conn.query('SELECT * from member where member.mem_type = "normal" and member.mem_id = ' + req.params.id, function(err, rows, fields) {
                if (err) throw err;
                // res.json(rows);
                respond(res, rows);
                conn.release();
            });
        });
    })
    // ////////////////////////////////////////////////////
    // get all type normal
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
    // get all type disabled
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
    // get all type disabled and id traget
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
    // get member traget id
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
    // get all member
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
    // push data member and get id member and push detail_event
router.post('/members', cors(corsOptions), function(req, res) {
        pool.getConnection(function(err, conn) {
            conn.beginTransaction(function(transactionError) {
                q.promise(function(resolve, reject, notify) {
                    if (transactionError) {
                        reject(transactionError)
                    }
                    conn.query('insert into member values ("",?,?,?,?,?,?,?,?,?,?,?)', [req.body.mem_name, req.body.mem_surname, req.body.mem_gender, req.body.mem_age, req.body.mem_email, req.body.mem_tel, req.body.mem_date, req.body.mem_pic, req.body.mem_discription, req.body.mem_type, req.body.mem_disabled_type],
                        function(err, rows, fields) {
                            // console.log(rows.insertId);
                            if (err) {
                              reject(err);
                            }
                            resolve(rows.insertId)
                        });
                }).then(function(response_new) {
                    return q.promise(function(resolve, reject, notify) {
                        conn.query('INSERT INTO detail_event values ("","' + response_new + '","unactive","' + req.body.event_id + '","register")',
                            function(err, rows, fields) {
                                if (err) {
                                    reject(err);
                                }
                                resolve('ok');
                            });
                    })
                }).then(function() {
                    res.send('register success')
                    conn.commit(function(err) {
                        if (err) {
                            reject(err)
                        }
                    })
                    conn.release();
                }).catch(function(error) {
                    console.log(error)
                    conn.rollback(function() {});
                    conn.release();
                })
            })
        });
    })
    // ////////////////////////////////////////////////////
    // delete member by id
router.delete('/members/:id', cors(corsOptions), function(req, res) {
    pool.getConnection(function(err, conn) {
        conn.query('DELETE from member where mem_id = ' + req.params.id, function(err, rows, fields) {
            if (err) throw err;
            res.send("deletes");
            conn.release();
        });
    });
});
// ////////////////////////////////////////////////////
// update member by id
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
            ' , mem_pic = ' + req.body.mem_pic +
            ' , mem_discription = ' + req.body.mem_discription +
            ' , mem_type= ' + req.body.mem_type +
            ' , mem_disabled_type= ' + req.body.mem_disabled_type +
            ' where mem_id = ' + req.body.id,
            function(err, rows, fields) {
                if (err) throw err;
                res.send("Update member");
                conn.release();
            });
    });
});
// get all event
router.get('/event', cors(corsOptions), function(req, res) {
    pool.getConnection(function(err, conn) {
        conn.query('select * from event',
            function(err, rows, fields) {
                if (err) throw err;
                res.send(rows)
                conn.release();
            });
    });
});
////////////////////////////////////////////////////////////
// get event traget id
router.get('/event/:id', cors(corsOptions), function(req, res) {
    pool.getConnection(function(err, conn) {
        conn.query('select * from event where event_id = ' + req.params.id,
            function(err, rows, fields) {
                if (err) throw err;
                res.send(rows)
                conn.release();
            });
    });
});
////////////////////////////////////////////////////////////
// push data event
router.post('/event', cors(corsOptions), function(req, res) {
    pool.getConnection(function(err, conn) {
        conn.query('insert into event values("","' + req.body.event_name + '","' + req.body.event_date + '","' + req.body.event_location + '","' + req.body.event_distance + '","' + req.body.event_price + '")',
            function(err, rows, fields) {
                if (err) throw err;
                res.send('insert event')
                conn.release();
            });
    });
});
////////////////////////////////////////////////////////////
router.delete('/event/:id', cors(corsOptions), function(req, res) {
    pool.getConnection(function(err, conn) {
        conn.query('DELETE from event where event_id = :id', [req.params.id],
            function(err, rows, fields) {
                if (err) throw err;
                res.send('delete event')
                conn.release();
            });
    });
});
////////////////////////////////////////////////////////////
router.put('/event', cors(corsOptions), function(req, res) {
    pool.getConnection(function(err, conn) {
        conn.query('update event set event_name = ' + req.body.event_name +
            ',event_date=' + req.body.event_date +
            ',event_location=' + req.body.event_location +
            ',event_distance' + req.body.event_distance +
            ',event_price' + req.body.event_price +
            ', where event_id = ' + req.params.id,
            function(err, rows, fields) {
                if (err) throw err;
                res.send('updete event name' + req.body.event_name)
                conn.release();
            });
    });
});
////////////////////////////////////////////////////////////
router.get('/group/:id', cors(corsOptions), function(req, res) {
    pool.getConnection(function(err, conn) {
        conn.query('SELECT * FROM member as m1 JOIN user_in_group as m2 ON m1.mem_id = m2.mem_id where m2.group_id=' + req.params.id + ' and m2.event_id = "1"',
            function(err, rows, fields) {
                if (err) throw err;
                res.send(rows)
                conn.release();
            });
    });
});
////////////////////////////////////////////////////////////
router.get('/group', cors(corsOptions), function(req, res) {
    q.promise(function(resolve, reject, notify) {
        pool.getConnection(function(err, conn) {
            conn.query('SELECT * FROM `group` ORDER BY group_id DESC LIMIT 1',
                function(err, rows, fields) {
                    if (err) reject(err);
                    resolve(rows)
                    conn.release();
                });
        });
    }).then(function(response) {
        res.send(response[0].group_id + '')
    })

});
////////////////////////////////////////////////////////////
router.get('/detail_event', cors(corsOptions), function(req, res) {
    pool.getConnection(function(err, conn) {
        conn.query('SELECT * FROM `detail_event` , member where detail_event.mem_id = member.mem_id',
            function(err, rows, fields) {
                if (err) throw (err);
                res.send(rows)
                conn.release();
            });
    })
});
////////////////////////////////////////////////////////////
router.get('/detail_event/:id', cors(corsOptions), function(req, res) {
    pool.getConnection(function(err, conn) {
        conn.query('SELECT * FROM `detail_event` ,member where detail_event.mem_id = member.mem_id and detail_event.event_id =' + req.params.id,
            function(err, rows, fields) {
                if (err) throw (err);
                res.send(rows)
                conn.release();
            });
    })
});
////////////////////////////////////////////////////////////
router.post('/detail_event', function(req, res) {
    console.log(req.route);
    pool.getConnection(function(err, conn) {
        conn.query('INSERT INTO `detail_event` values("","' + req.body.mem_id + '","' + req.body.detail_match + '","' + req.body.event_id + '","' + req.body.status_pay + '") ',
            function(err, rows, fields) {
                if (err) throw (err);
                res.send('insert detail_event')
                conn.release();
            });
    })
});
//////////////////////////////////});//////////////////////////
module.exports = router
