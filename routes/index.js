var express = require('express');
var router = express.Router();
var db = require('../mysql/db.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    db.query(
        'select MO_ID,USER_NAME,GENDER,AGE,DRIVING_EXPERIENCE,VEHICLE_MODEL,DISPLACEMENT,VEHICLE_AGE,TOTAL_MILEAGE from demo.demo_user_info',
        function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.location('/error.html')
            }
            res.render('index', {
                name: rows
            });
        });
});

router.get('/error.html', function (req, res, next) {
    res.render('error', {title: 'Express'});
    /*db.query('SELECT * FROM user',function (err, rows, fields) {
     if (err) throw err;
     });*/
});

router.post('/getList', function (req, res, next) {
    var userId = req.body.userId;
    db.query(
        'select MO_ID,TRIP_COUNT,TRIP_TIME,TRIP_MILE,ANXIOUS_ACCELERATION_COUNT,HARSH_BRAKE_COUNT,HARSH_DECELERATION_COUNT,HIGH_SPEED_TURN_COUNT,OVER_SPEED_COUNT,FATIGUE_DRIVING_RATIO,DNOE_MONTH from demo.demo_trip_report  where  MO_ID = '+userId+'  and DNOE_MONTH >= DATE_FORMAT(date_sub(now(),interval 6 month),"%Y%m")',
        function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.send({result:-1});
            }else {
                res.send({result:0,rows:rows});
            }

        });
});


module.exports = router;
