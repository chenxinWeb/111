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

function handleError (err) {
    if (err) {
        // 如果是连接断开，自动重新连接
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            connect();
        } else {
            console.error(err.stack || err);
        }
    }
}

connection.on('error', handleError);


//connection.connect();

/*connection.query('SELECT * FORM USER',function (err, rows, fields) {
    if (err) throw err;
    console.log('The solution is:',rows[0]);
    console.log(fields);
});*/
module.exports = connection;
//connection.end();