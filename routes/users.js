var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/user', function(req, res, next) {
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

module.exports = router;
