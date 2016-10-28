var express = require('express');
var router = express.Router();
var db = require('../mysql/db.js');

/* GET home page.
*  获取用户列表及详细信息*/
router.get('/', function (req, res, next) {
    db.query(
        'select MO_ID,USER_NAME,GENDER,AGE,DRIVING_EXPERIENCE,VEHICLE_MODEL,DISPLACEMENT,VEHICLE_AGE,TOTAL_MILEAGE,VEHICLE_LOGO from demo.demo_user_info',
        function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.connect();
                res.location('/error.html')
            }
            rows.forEach(function (item) {
                item.TOTAL_MILEAGE = parseInt(item.TOTAL_MILEAGE).toLocaleString();
                console.log(item.VEHICLE_LOGO);
                console.log(item);
            });
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

/*获取行驶报告*/
router.post('/getList', function (req, res, next) {
    var userId = req.body.userId;
    db.query(
        'select MO_ID,TRIP_COUNT,TRIP_TIME,TRIP_MILE,ANXIOUS_ACCELERATION_COUNT,HARSH_BRAKE_COUNT,HARSH_DECELERATION_COUNT,HIGH_SPEED_TURN_COUNT,OVER_SPEED_COUNT,FATIGUE_DRIVING_RATIO,DNOE_MONTH from demo.demo_trip_report  where  MO_ID = '+userId+'  and DNOE_MONTH >= DATE_FORMAT(date_sub(now(),interval 6 month),"%Y%m")',
        function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.connect();
                res.send({result:-1});
            }else {
                res.send({result:0,rows:rows});
            }
        });
});

/*获取用户得分*/
router.post('/getScore', function (req, res, next) {
    var userId = req.body.userId;
    var mouthId = req.body.mouthId;
    db.query(
        'select MO_ID,SCORE,SUGGESTIONS,ANXIOUS_ACCELERATION_SCORE,ANXIOUS_ACCELERATION_TOTAL,HARSH_BRAKE_SCORE,HARSH_BRAKE_TOTAL,HARSH_DECELERATION_SCORE,HARSH_DECELERATION_TOTAL,HIGH_SPEED_TURN_SCORE,HIGH_SPEED_TURN_TOTAL,OVER_SPEED_SCORE,OVER_SPEED_TOTAL,FATIGUE_DRIVING_SCORE,FATIGUE_DRIVING_TOTAL,USER_LABEL,DNOE_MONTH from demo.demo_user_score  where DNOE_MONTH = '+mouthId+' and MO_ID = '+userId+'',
        function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.connect();
                res.send({result:-1});
            }else {
                res.send({result:0,rows:rows});
            }
        });
});

/*获取场景评分*/
router.post('/getProfile', function (req, res, next) {
    var userId = req.body.userId;
    var mouthId = req.body.mouthId;
    db.query(
        'select MO_ID,BEHAVIOR_ID,BEHAVIOR,ROAD_TYPE_ID,ROAD_TYPE,TIME_RANGE_ID,TIME_RANGE,SPEED_PATTERN_ID,SPEED_PATTERN,WEATHER_ID,WEATHER,SCORE,BENCHMARK_SCORE,DNOE_MONTH from demo.demo_user_profile  where DNOE_MONTH = '+mouthId+' and MO_ID = '+userId+' order by SCORE desc',
        function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.connect();
                res.send({result:-1});
            }else {
                res.send({result:0,rows:rows});
            }

        });
});

module.exports = router;
