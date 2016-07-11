var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'YOUR_USERNAME',
    password: 'YOUR_PASSWORD',
    database: 'DB_NAME'
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

/* Begin transaction */
connection.beginTransaction(function(err) {
    if (err) {
        throw err;
    }
    connection.query('INSERT INTO names SET name=?', "sameer", function(err, result) {
        if (err) {
            connection.rollback(function() {
                throw err;
            });
        }

        var log = result.insertId;

        connection.query('INSERT INTO log SET logid=?', log, function(err, result) {
            if (err) {
                connection.rollback(function() {
                    throw err;
                });
            }
            connection.commit(function(err) {
                if (err) {
                    connection.rollback(function() {
                        throw err;
                    });
                }
                console.log('Transaction Complete.');
                connection.end();
            });
        });
    });
});
/* End transaction */



BEGIN
	DECLARE id int DEFAULT 6;
	insert into member values (NULL,mem_name,mem_surname,mem_gender,mem_age,mem_email,mem_tel,mem_date,mem_pic,mem_discription,mem_type,mem_disabled_type);
    SELECT member.mem_id INTO id FROM member ORDER BY mem_id DESC LIMIT 1
    INSERT INTO detail_event values (NULL,id,'unactive',event_id,'register');
END
