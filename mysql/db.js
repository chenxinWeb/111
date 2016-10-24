/**
 * Created by cc on 2016/10/12.
 */
var mysql = require('mysql');

var connection = mysql.createConnection({
    host:'172.19.0.169',
    user:'root',
    password:'123456',
    database:'demo'
});

//connection.connect();

/*connection.query('SELECT * FORM USER',function (err, rows, fields) {
    if (err) throw err;
    console.log('The solution is:',rows[0]);
    console.log(fields);
});*/
module.exports = connection;
//connection.end();