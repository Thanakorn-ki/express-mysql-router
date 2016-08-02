var express = require('express')
var bodyParser = require('body-parser')
var respond = require('../helper/respond')
var co = require('co')
var q = require('q')
var jsonParser = bodyParser.json()
var router = express.Router()
var mysql = require('mysql')
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'run2gether'
})
var Promise = require('promise');
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})
var cors = require('cors')
var corsOptions = {
        origin: ['http://localhost:8080', 'http://127.0.0.1:8080', 'http://192.168.2.125:8080/disabled', 'http://localhost:8080/disabled']
    }
    // ////////////////////////////////////////////////////
var insert_member = function() {
        return new Promise((resolve, reject) => {
            resolve('test')
        })
    }
    // test Co
router.get('/comember', (req, res) => {
        co(function*() {
            var result = yield insert_member()
            res.send(result);
        }).catch(err => handleError(err))
    })
    // ///////////////////////////////////////////////////
    // get type normal and id traget
router.get('/members/normal/:mem_id', cors(corsOptions), (req, res) => {
        pool.getConnection((err, conn) => {
            conn.query('SELECT * from member where member.mem_type = "normal" and member.mem_id = ?', [req.params.mem_id],
                (err, rows, fields) => {
                    if (err) throw err
                    res.json(rows)
                        // respond(res, rows)
                    conn.release()
                })
        })
    })
    // ////////////////////////////////////////////////////
    // get all type normal
router.get('/members/normal', cors(corsOptions), (req, res) => {
        pool.getConnection((err, conn) => {
            conn.query('SELECT * from member where mem_type = "normal"', (err, rows, fields) => {
                if (err) throw err
                res.json(rows)
                conn.release()
            })
        })
    })
    // ////////////////////////////////////////////////////
    // get all type disabled
router.get('/members/disabled', cors(corsOptions), (req, res) => {
        pool.getConnection(function(err, conn) {
            conn.query('SELECT * from member where mem_type = "disabled"', (err, rows, fields) => {
                if (err) throw err
                res.json(rows)
                conn.release()
            })
        })
    })
    // ////////////////////////////////////////////////////
    // get all type disabled and id traget
router.get('/members/disabled/:mem_id', cors(corsOptions), (req, res) => {
        pool.getConnection((err, conn) => {
            conn.query('SELECT * from member where mem_type = "disabled" and mem_id = ?', [req.params.mem_id],
                (err, rows, fields) => {
                    if (err) throw err
                    res.json(rows)
                    conn.release()
                })
        })
    })
    // ////////////////////////////////////////////////////
    // get member traget id
router.get('/members/:mem_id', cors(corsOptions), (req, res) => {
        pool.getConnection((err, conn) => {
            conn.query('SELECT * from member where mem_id = ?', [req.params.mem_id], (err, rows, fields) => {
                if (err) throw err
                res.json(rows)
                conn.release()
            })
        })
    })
    // ////////////////////////////////////////////////////
    // get all member
router.get('/members', cors(corsOptions), (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query('SELECT * from member', (err, rows, fields) => {
            if (err) throw err
            res.json(rows)
            conn.release()
        })
    })
})

// ////////////////////////////////////////////////////
// push data member and get id member and push detail_event
router.post('/members', cors(corsOptions), (req, res) => {
        console.log(req.body);
        pool.getConnection((err, conn) => {
            conn.beginTransaction((transactionError) => {
                q.promise((resolve, reject, notify) => {
                    if (transactionError) {
                        reject(transactionError)
                    }
                    conn.query('insert into member values ("",?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [req.body.mem_id_num,
                            req.body.mem_name,
                            req.body.mem_surname,
                            req.body.mem_nickname,
                            req.body.mem_gender,
                            req.body.mem_age,
                            req.body.mem_email,
                            req.body.mem_tel,
                            req.body.mem_date,
                            req.body.mem_pic,
                            req.body.mem_location,
                            req.body.mem_discription,
                            req.body.mem_department,
                            req.body.mem_type,
                            req.body.mem_disabled_type
                        ],
                        (err, rows, fields) => {
                            if (err) {
                                reject(err)
                            }
                            console.log(rows.insertId);
                            resolve(rows.insertId)
                        })
                }).then((mem_id) => {
                    return q.promise((resolve, reject, notify) => {
                        conn.query('INSERT INTO detail_event values ("",?,?,?,?,?,null,?,?)', [mem_id, "unactive", req.body.detail_size, req.body.detail_price, req.body.event_id, "register", ""],
                            (err, rows, fields) => {
                                if (err) {
                                    reject(err)
                                }
                                resolve(rows)
                            })
                    })
                }).then(() => {
                    res.send('register success')
                    conn.commit((err) => {
                        if (err) {
                            reject(err)
                        }
                    })
                    conn.release()
                }).catch((error) => {
                    console.log(error.Error)
                    res.send(error)
                    conn.rollback((error) => {
                        // res.send(error)
                        console.log(error)
                    })
                    conn.release()
                })
            })
        })
    })
    // ////////////////////////////////////////////////////
    // delete member by id
router.delete('/members/:id', cors(corsOptions), (req, res) => {
        pool.getConnection((err, conn) => {
            conn.query('DELETE from member where mem_id = ? ', [req.params.id],
                (err, rows, fields) => {
                    if (err) throw err
                    if (rows.affectedRows == 0) {
                        res.send("Invalid mem_id")
                    } else {
                        res.json({
                            message: 'delete success'
                        })
                    }
                    conn.release()
                })
        })
    })
    // ////////////////////////////////////////////////////
    // update member by mem_id
router.put('/members/:mem_id', cors(corsOptions), (req, res) => {
        pool.getConnection((err, conn) => {
            conn.query('UPDATE member set mem_id_num = ?, ' +
                ' mem_name = ?, mem_surname = ?, mem_nickname = ?,' +
                ' mem_gender = ?, mem_age = ?, mem_email = ?, mem_tel = ?,' +
                ' mem_date = ?, mem_pic = ?,mem_location = ?, mem_discription = ?,' +
                ' mem_department = ? ,mem_type = ?, mem_disabled_type = ? where mem_id = ?', [req.body.mem_id_num,
                    req.body.mem_name,
                    req.body.mem_surname,
                    req.body.mem_nickname,
                    req.body.mem_gender,
                    req.body.mem_age,
                    req.body.mem_email,
                    req.body.mem_tel,
                    req.body.mem_date,
                    req.body.mem_pic,
                    req.body.mem_location,
                    req.body.mem_discription,
                    req.body.mem_department,
                    req.body.mem_type,
                    req.body.mem_disabled_type,
                    req.params.mem_id
                ],
                (err, rows, fields) => {
                    if (err) throw err
                    if (rows.affectedRows == 0) {
                        res.send("Invalid mem_id")
                    } else {
                        res.json({
                            message: 'update success'
                        })
                    }


                    conn.release()
                })
        })
    })
    // get all event
router.get('/event', cors(corsOptions), (req, res) => {
        pool.getConnection((err, conn) => {
            conn.query('select * from event',
                (err, rows, fields) => {
                    if (err) throw err
                    rows.forEach((item, index) => {
                        rows[index].event_distance = item.event_distance.split(',')
                    })
                    res.send(rows)
                    conn.release()
                })
        })
    })
    ////////////////////////////////////////////////////////////
    // get event traget id
router.get('/event/:id', cors(corsOptions), (req, res) => {
        pool.getConnection((err, conn) => {
            conn.query('select * from event where event_id = ?', [req.params.id],
                (err, rows, fields) => {
                    if (err) throw err
                    res.send(rows)
                    conn.release()
                })
        })
    })
    ////////////////////////////////////////////////////////////
    // push data event
router.post('/event', cors(corsOptions), (req, res) => {
        pool.getConnection((err, conn) => {
            conn.query('insert into event values(?,?,?,?,?,?,?,?,?,?)', ["",
                    req.body.event_name,
                    req.body.event_date_start,
                    req.body.event_date_open,
                    req.body.event_date_close,
                    req.body.event_location,
                    req.body.event_distance,
                    req.body.event_optional,
                    req.body.event_price,
                    req.body.event_size
                ],
                (err, rows, fields) => {
                    if (err) throw err

                    if (rows.affectedRows === 1) {
                        res.json({
                            message: 'Insert Event success'
                        })
                    }

                    conn.release()
                })
        })
    })
    ////////////////////////////////////////////////////////////
    // ลบข้อมูลด้วย event_id ในตาราง Event
router.delete('/event/:event_id', cors(corsOptions), (req, res) => {
        pool.getConnection((err, conn) => {
            conn.query('DELETE from event where event_id = ?', [req.params.event_id],
                (err, rows, fields) => {
                    if (err) throw err
                    console.log(rows)
                    if (rows.affectedRows !== 0) {
                        res.json({
                            message: 'Delete event success'
                        })
                    } else {
                        res.send('Invalid id')
                    }

                    conn.release()
                })
        })
    })
    ////////////////////////////////////////////////////////////
    // แก้ไขข้อมูล event
router.put('/event/:id', cors(corsOptions), (req, res) => {
        pool.getConnection((err, conn) => {
            conn.query('update event set event_name = ? ,' +
                'event_date_start = ? , event_date_open = ?,' +
                'event_date_close = ?, event_location = ? , ' +
                'event_distance = ?,event_optional = ? , event_price = ? ' +
                ', event_size = ? where event_id = ? ', [req.body.event_name,
                    req.body.event_date_start,
                    req.body.event_date_open,
                    req.body.event_date_close,
                    req.body.event_location,
                    req.body.event_distance,
                    req.body.event_optional,
                    req.body.event_price,
                    req.body.event_size,
                    req.params.id
                ],
                (err, rows, fields) => {
                    if (err) throw err
                    if (rows.affectedRows !== 0) {
                        res.json({
                            message: 'update event success'
                        })
                    } else {
                        res.send('Invalid id')
                    }
                    conn.release()
                })
        })
    })
    ////////////////////////////////////////////////////////////
router.get('/group/:id', cors(corsOptions), (req, res) => {
        pool.getConnection((err, conn) => {
            conn.query('SELECT * FROM member as m1 JOIN user_in_group as m2 ON m1.mem_id = m2.mem_id where m2.group_id=?', [req.params.id],
                (err, rows, fields) => {
                    if (err) throw err
                    res.send(rows)
                    conn.release()
                })
        })
    })
    ////////////////////////////////////////////////////////////
router.get('/group', cors(corsOptions), (req, res) => {
        q.promise((resolve, reject, notify) => {
            pool.getConnection((err, conn) => {
                conn.query('SELECT * FROM `group`',
                    (err, rows, fields) => {
                        if (err) reject(err)
                        console.log(rows)
                        resolve(rows)
                        conn.release()
                    })
            })
        }).then((response) => {
            return q.promise((resolve, reject, notify) => {
                resolve(response)
            })
        }).then((response) => {
            return q.promise((resolve, reject, notify) => {
                res.send(response)
            })
        })
    })
    ////////////////////////////////////////////////////////////
    // ดูคนทั้งหมดที่สมัครมา
router.get('/detail_event', cors(corsOptions), (req, res) => {
        pool.getConnection((err, conn) => {
            conn.query('SELECT * FROM `detail_event`',
                (err, rows, fields) => {
                    if (err) throw (err)
                    res.send(rows)
                    conn.release()
                })
        })
    })
    ////////////////////////////////////////////////////////////
    // ดูรายชื่อในแต่ละ Event ด้วย event_id
router.get('/detail_event/:event_id', cors(corsOptions), (req, res) => {
        pool.getConnection((err, conn) => {
            conn.query('SELECT * FROM `detail_event` ,member where detail_event.mem_id = member.mem_id and detail_event.event_id = ?', [req.params.event_id],
                (err, rows, fields) => {
                    if (err) throw (err)
                    res.send(rows)
                    conn.release()
                })
        })
    })
    ////////////////////////////////////////////////////////////
    // คู่ใน แต่ละ Event ส่งค่าevent_id
router.get('/group_event/:event_id', cors(corsOptions), (req, res) => {
        pool.getConnection((err, conn) => {
            conn.query('SELECT * FROM `detail_event` as m1 JOIN member as m2 on m1.mem_id = m2.mem_id and m1.event_id = ? AND m1.group_id != \'NULL\'', [req.params.event_id],
                (err, rows, fields) => {
                    if (err) throw (err)
                    var group_id = rows.map((item) => item.group_id).filter((elem, index, self) => index === self.indexOf(elem)).sort()
                    var detail_group = []
                    group_id.forEach((item) => {
                        var user_list = rows.filter((user) => user.group_id === item)
                        detail_group.push({
                            group_id: item,
                            user_list: user_list
                        })
                    })
                    res.send(detail_group)
                    conn.release()
                })
        })
    })
    ////////////////////////////////////////////////////////////
    // เช็คข้อมูลด้วยเบอร์โทรศัพท์ (mem_tel )
router.get('/check_member/:mem_tel', cors(corsOptions), (req, res) => {
        pool.getConnection((err, conn) => {
            conn.query('SELECT * FROM member WHERE mem_tel = ?', [req.params.mem_tel],
                (err, rows, fields) => {
                    if (err) throw (err)
                    res.send(rows)
                    conn.release()
                })
        })
    })
    // //////////////////////////////////////////////////////////////////
    // จับคู่แบบ admin จับให้
router.post('/match', cors(corsOptions), (req, res) => {
        // console.log(req.body.event_id);
        pool.getConnection((err, conn) => {
            conn.beginTransaction((transactionError) => {
                q.promise((resolve, reject, notify) => {
                    if (transactionError) {
                        reject(transactionError)
                    }
                    conn.query('INSERT INTO `group` values(?,?)', ["NULL", req.body.event_id], (err, rows, fields) => {
                        if (err) reject(err)
                            // console.log(rows);
                        resolve(rows.insertId)
                    })

                }).then((response) => {
                    return q.promise((resolve, reject, notify) => {
                        req.body.mem_id.forEach((item) => {
                            conn.query('INSERT INTO `user_in_group` values(?,?,?,?)', ["", item, response, "active"], (err, rows, fields) => {
                                if (err) reject(err)
                            })
                        })
                        console.log(response);
                        resolve(response)
                    })
                }).then((responese) => {
                    return q.promise((resolve, reject, notify) => {
                        req.body.mem_id.forEach((item) => {
                                conn.query('UPDATE `detail_event` set detail_match = ?, group_id = ? where mem_id = ? and event_id = ?', ["active", responese, item, req.body.event_id], (err, rows, fields) => {
                                    if (err) reject(err)
                                })
                            })
                            // console.log(rows);
                        resolve('rows')
                    })
                }).then(() => {
                    res.send('match success')
                    conn.commit((err) => {
                        if (err) {
                            reject(err)
                        }
                    })
                    conn.release()
                }).catch((err) => {
                    console.log(err);
                    conn.rollback((err) => {
                        console.log(err)
                    })
                    conn.release()
                })
            })
        })
    })
    // ////////////////////////////////////////////////////////////////////////
    // แก้ไขการจับคู่
router.put('/match/', cors(corsOptions), (req, res) => {
        pool.getConnection((err, conn) => {
            conn.beginTransaction((transactionError) => {
                q.promise((resolve, reject, notify) => {
                    if (transactionError) {
                        reject(transactionError)
                    }
                    conn.query('UPDATE `user_in_group` set status_match = ? where mem_id = ? and group_id = ?', ["uactive", req.body.mem_id, req.body.group_id],
                        (err, rows, fields) => {
                            console.log(req.body);
                            if (err) reject(err)
                            resolve(rows)
                            console.log(rows);
                        })
                }).then((response) => {
                    return q.promise((resolve, reject, notify) => {
                        conn.query('UPDATE `detail_event` set group_id = ? where mem_id = ? and event_id = ? ', [null, req.body.mem_id, req.body.event_id], (err, rows, fields) => {
                            if (err) reject(err)
                            resolve('ok')
                        })
                    })
                }).then(() => {
                    res.send('Update match success')
                    conn.commit((err) => {
                        if (err) {
                            reject(err)
                        }
                    })
                    conn.release()
                }).catch((err) => {
                    conn.rollback((err) => {
                        console.log(err)
                    })
                    conn.release()
                })
            })
        })
    })
    // ///////////////////////////////////////////////////////////////////
    // การจับคู่แบบ ผู้สมัครมีคู่มากด้วย
router.post('/match/with', cors(corsOptions), (req, res) => {
        pool.getConnection((err, conn) => {
            conn.beginTransaction((transactionError) => {
                q.promise((resolve, reject, notify) => {
                    if (transactionError) {
                        reject(transactionError)
                    }
                    conn.query('UPDATE `user_in_group` set status_match = ? where mem_id = ? and group_id = ?', ["unactive", req.body.mem_id, req.body.group_id],
                        (err, rows, fields) => {
                            console.log(req.body);
                            if (err) reject(err)
                            resolve(rows)
                            console.log(rows);
                        })
                }).then((response) => {
                    return q.promise((resolve, reject, notify) => {
                        conn.query('UPDATE `detail_event` set group_id = ? where mem_id = ? and event_id = ? ', [null, req.body.mem_id, req.body.event_id], (err, rows, fields) => {
                            if (err) reject(err)
                            resolve('ok')
                        })
                    })
                }).then(() => {
                    res.send('Update match success')
                    conn.commit((err) => {
                        if (err) {
                            reject(err)
                        }
                    })
                    conn.release()
                }).catch((err) => {
                    conn.rollback((err) => {
                        console.log(err)
                    })
                    conn.release()
                })
            })
        })
    })
    // ////////////////////////////////////////////////////
    // edit pay
router.put('/detail_event/pay', cors(corsOptions), (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query('UPDATE `detail_event` set url_pay = ? where mem_id = ? and group_id = ? and event_id = ?', [req.body.url_pay, req.body.mem_id, req.body.group_id, req.body.event_id],
            (err, rows, fields) => {
                // console.log(req.body);
                if (err) {
                  throw (err)
                  res.send({message:"False", status:404 ,statusText:"Not Found"})
                } else {
                  res.send({message:"update success", status:200,statusText:"OK"})
                }
                // console.log(rows);
            })
    })
})
// //////////////////////////////////////////
// edit status_pay
router.put('/detail_event/status_pay', cors(corsOptions), (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query('UPDATE `detail_event` set status_pay = ? where mem_id = ? and group_id = ? and event_id = ?', [req.body.status_pay, req.body.mem_id, req.body.group_id, req.body.event_id],
            (err, rows, fields) => {
                // console.log(req.body);
                if (err) {
                  throw (err)
                  res.send({message:"False", status:404 ,statusText:"Not Found"})
                } else {
                  res.send({message:"update success", status:200,statusText:"OK"})
                }
                // console.log(rows);
            })
    })
})
// ////////////////////////////////////////////
// login
router.post('/login', cors(corsOptions), (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query('SELECT * FROM user WHERE username = ? and password = ?', [req.body.username, req.body.password],
            (err, rows, fields) => {
                // console.log(req.body);
                // console.log(rows);
                if (err) {
                  throw (err)
                  res.send({message:"False", status:404 ,statusText:"Not Found"})
                } else {
                  res.send({message:"success", status:200,statusText:"OK",data:rows})
                }
                // console.log(rows);
            })
    })
})
module.exports = router
