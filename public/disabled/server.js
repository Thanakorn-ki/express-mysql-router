var express = require('express');
var bodyParser = require('body-parser');
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
router.get('/members/event/:id', cors(corsOptions), function(req, res) {
        pool.getConnection(function(err, conn) {
            conn.query('select request.*,' +
                'm1.mem_name as "name_disabled" ,' +
                'm1.mem_surname as surname_disabled ,' +
                'm2.mem_name as "name_normal",' +
                'm2.mem_surname as "surname_normal' +
                '" from request JOIN member as m1 ON request.mem_id=m1.mem_id JOIN member as m2 ON request.join_event=m2.mem_id where event_id =' + req.params.id,
                function(err, rows, fields) {
                    if (err) throw err;
                    res.send(rows)
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
    q.promise(function(resolve, reject, notify) {
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
                req.body.mem_type +
                '","' +
                req.body.mem_status +
                '","' +
                req.body.mem_pay + '")',
                function(err, rows, fields) {
                    if (err) reject(err);
                    resolve('ok')
                    conn.release();
                });
        });
    }).then(function(response) {
      return q.promise(function(resolve, reject, notify) {
        if ('ok' === response) {
            pool.getConnection(function(err, conn) {
                conn.query('SELECT * FROM `member` ORDER BY mem_id DESC LIMIT 1',
                    function(err, rows, fields) {
                        if (err) reject(err);
                        resolve(rows[0])
                        conn.release();
                    });
            })
        }
      })
    }).then(function(response_new){
        return q.promise(function(resolve, reject, notify) {
          pool.getConnection(function(err, conn) {
              conn.query('INSERT INTO detail_event values ("","'+response_new.mem_id+'","'+req.body.event_id+'","register")',
                  function(err, rows, fields) {
                      if (err) throw err;
                      res.send('register success')
                      conn.release();
                  });
          })
        })
    })
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
router.get('/request', cors(corsOptions), function(req, res) {
    pool.getConnection(function(err, conn) {
        conn.query('select request.*,' +
            'm1.mem_name as "name_disabled" ,' +
            'm1.mem_surname as surname_disabled ,' +
            'm2.mem_name as "name_normal",' +
            'm2.mem_surname as "surname_normal' +
            '" from request JOIN member as m1 ON request.mem_id=m1.mem_id JOIN member as m2 ON request.join_event=m2.mem_id',
            function(err, rows, fields) {
                if (err) throw err;
                res.send(rows)
                conn.release();
            });
    });
});
////////////////////////////////////////////////////////////
router.post('/request', cors(corsOptions), function(req, res) {
    pool.getConnection(function(err, conn) {
        conn.query('UPDATE member set mem_status="active" where mem_id="' + req.body.mem_id + '"',
            conn.query('UPDATE member set mem_status="active" where mem_id="' + req.body.join_event + '"',
                conn.query('insert into request values("","' + req.body.mem_id + '","' + req.body.join_event + '","' + req.body.event_id + '")',
                    function(err, rows, fields) {
                        if (err) throw err;
                        res.send("insert request");
                        conn.release();
                    })));
    });
});
////////////////////////////////////////////////////////////
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
router.post('/event', cors(corsOptions), function(req, res) {
    pool.getConnection(function(err, conn) {
        conn.query('insert into event values("","' + req.body.event_name + '","' + req.body.event_date + '","' + req.body.event_location + '","' + req.body.request_id + '")',
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
        conn.query('DELETE from event where event_id = ' + req.params.id,
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
            ',request_id=' + req.body.request_id +
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
        conn.query('SELECT * FROM `detail_event` ',
            function(err, rows, fields) {
                if (err) throw (err);
                res.send(rows)
                conn.release();
            });
    })
});
////////////////////////////////////////////////////////////
router.post('/detail_event', cors(corsOptions), function(req, res) {
    pool.getConnection(function(err, conn) {
        conn.query('INSERT INTO `detail_event` values("","' + req.body.mem_id + '","' + req.body.event_id + '","' + req.body.status_pay + '") ',
            function(err, rows, fields) {
                if (err) throw (err);
                res.send('insert detail_event')
                conn.release();
            });
    })
});
////////////////////////////////////////////////////////////
module.exports = router
