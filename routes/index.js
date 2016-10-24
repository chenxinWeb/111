var express = require('express');
var router = express.Router();
var db = require('../mysql/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  db.query(
      'select MO_ID,USER_NAME,GENDER,AGE,DRIVING_EXPERIENCE,VEHICLE_MODEL,DISPLACEMENT,VEHICLE_AGE,TOTAL_MILEAGE from demo.demo_user_info',
      function (err, rows, fields) {
    if (err)
    {
        console.log(err);
        }
    res.render('index',{
          title:'express',
          name:rows
        });
          console.log('1111');
    console.log(rows);
  });

});

router.get('/error.html', function(req, res, next) {
  res.render('error', { title: 'Express' });
  db.query('SELECT * FROM user',function (err, rows, fields) {
    if (err) throw err;
  });
});



module.exports = router;
