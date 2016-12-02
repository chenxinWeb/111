/**
 * Created by cc on 2016/10/26.
 */
$(function () {
    $('#wrapper .title').eq(0).css('display', 'block');
    $('#wrapper .title .head_log').click(function () {
        var showTitle = $('#wrapper .title').not('div[style*="display: none"]');
        showTitle.css('display', 'none');

        var nextShowTitle = showTitle.next('#wrapper .title');
        if (!nextShowTitle.length) {
            nextShowTitle = $('#wrapper .title').eq(0)
        }
        nextShowTitle.css('display', 'block');
        userId = nextShowTitle.find('.userId').val();
        // console.log(userId);
        getUser();//获取行驶报告
        getLastMonthScore();//获取上个月得分
    });
    var userId = $('#wrapper .title').not('div[style*="display: none"]').find('.userId').val(),
        tableTempl = $('#listTemplate').html().trim().tmpl();

    //行驶报告
    $('.con_report').on('click', '.content_year button', function () {
        var showMouth = $('.con_report .report_la').not('div[style*="display: none"]');
        showMouth.css('display', 'none');

        if ($(this).hasClass('left_btn')) {
            var prevMouth = showMouth.prev('.con_report .report_la');
            if (!prevMouth.length) {
                prevMouth = showMouth;
            }
            prevMouth.css('display', 'block');
            $('.con_report .content_year span').text(prevMouth.data('time'));
        } else {
            var nextMouth = showMouth.next('.con_report .report_la');
            if (!nextMouth.length) {
                nextMouth = showMouth;
            }
            nextMouth.css('display', 'block');
            $('.con_report .content_year span').text(nextMouth.data('time'));
        }
    });

//    echarts
    var colors = ['#a9d8be', '#f6d498'],
        colors2 = ['#f5c638','#6260ab'];
    var myChart = echarts.init(document.getElementById('echarts_data')),
        option = {
            legend: {
                bottom: '30',
                data: ['当前用户', '平均参考值'],
                icon: 'circle'
            },
            color:colors,
            radar: [
                {
                    indicator: [
                        {text: "急减速  评分 - 36分", max: 100},
                        {text: '急加速', max: 100},
                        {text: '急刹车', max: 100},
                        {text: '超速驾驶', max: 100},
                        {text: '疲劳驾驶', max: 100},
                        {text: '急转弯', max: 100}
                    ],
                    center: ['50%', '50%'],
                    radius: 120,
                    startAngle: 90,
                    splitNumber: 5,
                    name: {
                        formatter: '{value}',
                        textStyle: {
                            color: '#5ab884'
                        }
                    },
                    splitArea: {
                        areaStyle: {
                            color: ['#ececec',
                                '#f8f8f8', '#f8f8f8',
                                '#f8f8f8', '#f8f8f8']
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#ececec'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#ececec'
                        }
                    }
                }
            ],
            series: [
                {
                    name: '雷达图',
                    type: 'radar',
                    itemStyle: {
                        emphasis: {
                            lineStyle: {
                                width: 4
                            }
                        }
                    },
                    data: [
                        {
                            value: [],
                            name: '当前用户',
                            symbol: 'rect',
                            symbolSize: 1,
                            lineStyle: {
                                normal: {
                                    color: '#a9d8be'
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color: colors[0],
                                    opacity: 1
                                }
                            }
                        },
                        {
                            value: [],
                            name: '平均参考值',
                            symbol: 'rect',
                            symbolSize: 1,
                            lineStyle: {
                                normal: {
                                    color: '#f6d498'
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color: colors[1]
                                }
                            }
                        }
                    ]
                }
            ]
        };
    myChart.setOption(option);
    /*行程状态*/
    var ec_process = echarts.init(document.getElementById('ec_process')),
        op_process = {
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                feature: {
//                  dataView: {show: true, readOnly: false},
//                  magicType: {show: true, type: ['line', 'bar']},
//                  restore: {show: true},
//                  saveAsImage: {show: true}
                }
            },
            legend: {
                bottom: '0',
                data: ['出行次数', '行驶里程']
//                icon:'circle'
            },
            color:colors2,
            xAxis: [
                {
                    type: 'category',
                    data: []
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '单位-次',
                    min: 0,
                    max: 1000,
                    interval: 200,
                    axisLabel: {
                        formatter: '{value} '
                    }
                },
                {
                    type: 'value',
                    name: '单位-KM',
                    min: 0,
                    max: 4000,
                    interval: 800,
                    axisLabel: {
                        formatter: '{value}'
                    }
                }
            ],
            series: [
                {
                    name: '出行次数',
                    type: 'bar',
                    barWidth: 10,
                    markLine: {
                        symbol: 'arrow'
                    },
                    data: [],
                    areaStyle: {
                        normal: {
                            color: colors[0],
                            opacity: 1
                        }
                    }
                },
                {
                    name: '行驶里程',
                    type: 'line',
                    yAxisIndex: 1,
//                  symbol :'pin',
//                  symbolSize:5,
                    data: []
                }
            ]
        };

    ec_process.setOption(op_process);

//    四急数据
    var ec_urgentData = echarts.init(document.getElementById('ec_urgentData')),
        op_urgentData = {
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                feature: {
//                  dataView: {show: true, readOnly: false},
//                  magicType: {show: true, type: ['line', 'bar']},
//                  restore: {show: true},
//                  saveAsImage: {show: true}
                }
            },
            legend: {
                bottom: '0',
                data: ['急加速', '急刹车', '急减速', '急转弯']
//                icon:'circle'
            },
            xAxis: [
                {
                    type: 'category',
                    data: []
                }
            ],
            yAxis: [

                {
                    type: 'value',
                    name: '单位-次',
                    min: 0,
                    max: 100,
                    interval: 20,
                    axisLabel: {
                        formatter: '{value}'
                    }
                }
            ],
            series: [
                {
                    name: '急加速',
                    type: 'line',
                    yAxisIndex: 0,
//                  symbol :'pin',
//                  symbolSize:5,
                    data: []
                },
                {
                    name: '急刹车',
                    type: 'line',
                    yAxisIndex: 0,
//                  symbol :'pin',
//                  symbolSize:5,
                    data: []
                },
                {
                    name: '急减速',
                    type: 'line',
                    yAxisIndex: 0,
//                  symbol :'pin',
//                  symbolSize:5,
                    data: []
                },
                {
                    name: '急转弯',
                    type: 'line',
                    yAxisIndex: 0,
//                  symbol :'pin',
//                  symbolSize:5,
                    data: []
                }
            ]
        };

    ec_urgentData.setOption(op_urgentData);

    /*危险驾驶*/
    var ec_dangerous = echarts.init(document.getElementById('ec_dangerous')),
        op_dangerous = {
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                feature: {
//                  dataView: {show: true, readOnly: false},
//                  magicType: {show: true, type: ['line', 'bar']},
//                  restore: {show: true},
//                  saveAsImage: {show: true}
                }
            },
            legend: {
                bottom: '0',
                data: ['超速驾驶', '疲劳驾驶']
//                icon:'circle'
            },
            xAxis: [
                {
                    type: 'category',
                    data: []
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '单位-次',
                    min: 0,
                    max: 100,
                    interval: 20,
                    axisLabel: {
                        formatter: '{value}'
                    }
                }
            ],
            series: [
                {
                    name: '超速驾驶',
                    type: 'line',
                    yAxisIndex: 0,
//                  symbol :'pin',
//                  symbolSize:5,
                    data: []
                },
                {
                    name: '疲劳驾驶',
                    type: 'line',
                    yAxisIndex: 0,
//                  symbol :'pin',
//                  symbolSize:5,
                    data: []
                }
            ]
        };

    ec_dangerous.setOption(op_dangerous);
    ec_process.showLoading();
    //获取行驶报告  从demo.demo_trip_report表
    function getUser() {
        $.ajax({
            url: '/getList',
            type: 'post',
            data: {userId: userId}
        }).done(function (data) {
            getReport(data);
            // console.log(data.rows);
            var mouthArr = [],
                tripArr = [],
                mileArr = [],
                accelerationArr = [],
                brakeArr = [],
                decelerationArr = [],
                speedTurnArr = [],
                speedArr = [],
                fatArr = [];
            data.rows.forEach(function (item) {
                //月份
                mouthArr.push(item.DNOE_MONTH);
                //出行次数
                tripArr.push(parseInt(item.TRIP_COUNT));
                //行驶里程
                mileArr.push(parseInt(item.TRIP_MILE));
                //急加速
                accelerationArr.push(item.ANXIOUS_ACCELERATION_COUNT);
                //急刹车
                brakeArr.push(item.HARSH_BRAKE_COUNT);
                //急减速
                decelerationArr.push(item.HARSH_DECELERATION_COUNT);
                //急转弯
                speedTurnArr.push(item.HIGH_SPEED_TURN_COUNT);
                //超速驾驶
                speedArr.push(item.OVER_SPEED_COUNT);
                //疲劳驾驶
                fatArr.push(item.FATIGUE_DRIVING_RATIO);
            });
            // console.log(mileArr);
            var getMaxNumber = function () {
                var arr = Array.prototype.slice.call(arguments).join(",").split(",");
                var maxNum = parseInt(Math.max.apply(Math,arr).toString().substring(0,1))+1, str = '1';
                for(var i = 0;i < Math.max.apply(Math,arr).toString().length -1; i++){
                    str += '0';
                }
                maxNum = maxNum * Number(str);
                return maxNum;
            };

            //行程状态
            ec_process.hideLoading();
            ec_process.setOption({
                xAxis: {
                    data: mouthArr
                },
                yAxis: [
                    {
                        type: 'value',
                        name: '单位-次',
                        min: 0,
                        max: getMaxNumber(tripArr),
                        interval: getMaxNumber(tripArr)/5,
                        axisLabel: {
                            formatter: '{value} '
                        }
                    },
                    {
                        type: 'value',
                        name: '单位-KM',
                        min: 0,
                        max: getMaxNumber(mileArr),
                        interval: getMaxNumber(mileArr)/5,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    }
                ],
                series: [
                    {
                        name: '出行次数',
                        data: tripArr
                    },
                    {
                        name: '行驶里程',
                        line:'line',
                        data: mileArr
                    }
                ]
            });

            //四急数据
            ec_urgentData.setOption({
                xAxis: {
                    data: mouthArr
                },
                yAxis: [
                    {
                        type: 'value',
                        name: '单位-次',
                        min: 0,
                        max: getMaxNumber(accelerationArr,brakeArr,speedTurnArr,decelerationArr),
                        interval: getMaxNumber(accelerationArr,brakeArr,speedTurnArr,decelerationArr)/5,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    }
                ],
                series: [
                    {
                        name: '急加速',
                        data: accelerationArr
                    },
                    {
                        name: '急刹车',
                        data: brakeArr
                    },
                    {
                        name: '急减速',
                        data: decelerationArr
                    },
                    {
                        name: '急转弯',
                        data: speedTurnArr
                    }
                ]
            });

            //危险驾驶
            ec_dangerous.setOption({
                xAxis: {
                    data: mouthArr
                },
                yAxis: [
                    {
                        type: 'value',
                        name: '单位-次',
                        min: 0,
                        max: getMaxNumber(speedArr,fatArr),
                        interval: getMaxNumber(speedArr,fatArr)/5,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    }
                ],
                series: [
                    {
                        name: '超速驾驶',
                        data: speedArr
                    },
                    {
                        name: '疲劳驾驶',
                        line:'line',
                        data: fatArr
                    }
                ]
            });

        });
    }
    getUser();


    //获取行驶报告
    function getReport(data) {
        var renderedHtml = '';
        if (data.result == 0) {
            // console.log(data.rows);
            renderedHtml = tableTempl({listData: data.rows});
        } else {
            // alert(data);
        }
        // console.log(data.rows);
        $('.con_report').html(renderedHtml);
        $('.con_report .report_la').last().css('display', 'block');
    }

    //上月得分
    var date = new Date();
    var getFullYear = date.getFullYear();
    var month=date.getMonth();
    if (month==0){
        month = 12;
        getFullYear = getFullYear-1;
    }
    month =(month<10 ? "0"+month:month);
    // console.log(getFullYear.toString()+month);
    //获取上月得分函数
    function getLastMonthScore() {
        var renderScoreHtml = '',
            scoreTemp=$('#scoreTemplate').html().trim().tmpl();
        $.ajax({
            url:'/getScore',
            type:'post',
            data: {
                userId: userId,
                mouthId:getFullYear.toString()+month
            }
        }).done(function (data) {
            console.log(getFullYear.toString()+month);
            // console.log(data);
            var accelerationArr = [],//2.急加速
                accelerationIndexArr = [],
                brakeArr = [],//3.急刹车
                brakeIndexArr = [],
                decelerationArr = [],//1.急减速
                decelerationIndexArr = [],
                speedTurnArr = [],//6.急转弯
                speedTurnIndexArr = [],
                speedArr = [],//4.超速驾驶
                speedIndexArr = [],
                fatArr = [],//5.疲劳驾驶
                fatIndexArr = [];
            var dataList = data.rows;
            if (data.result == 0){
                dataList.forEach(function (item) {
                    decelerationArr.push(item.HARSH_DECELERATION_SCORE);
                    decelerationIndexArr.push(item.HARSH_DECELERATION_TOTAL);

                    accelerationArr.push(item.ANXIOUS_ACCELERATION_SCORE);
                    accelerationIndexArr.push(item.ANXIOUS_ACCELERATION_TOTAL);

                    brakeArr.push(item.HARSH_BRAKE_SCORE);
                    brakeIndexArr.push(item.HARSH_BRAKE_TOTAL);

                    speedArr.push(item.OVER_SPEED_SCORE);
                    speedIndexArr.push(item.OVER_SPEED_TOTAL);

                    fatArr.push(item.FATIGUE_DRIVING_SCORE);
                    fatIndexArr.push(item.FATIGUE_DRIVING_TOTAL);

                    speedTurnArr.push(item.HIGH_SPEED_TURN_SCORE);
                    speedTurnIndexArr.push(item.HIGH_SPEED_TURN_TOTAL);
                    switch (true){
                        case item.STAR <= 2:
                            item.color='#f65b5b';
                            break;
                        case item.STAR <= 3.5:
                            item.color = '#f68539';
                            break;
                        case item.STAR <= 5:
                            item.color = '#5ab884';
                            break;
                    }
                    if (parseInt(item.STAR) != item.STAR){
                        item.startTure = true;
                        item.lastStart = 5-Math.ceil(item.STAR);
                    }else {
                        item.startTure = false;
                        item.lastStart = 5-Math.ceil(item.STAR);
                    }
                    item.STAR = Math.floor(item.STAR);
                    // console.log(item);
                });
                myChart.setOption({
                    radar:[{
                        indicator: [
                            {text: "急减速  评分 : "+decelerationArr+"分", max: 100},
                            {text: "急加速  评分 ： "+accelerationArr+"分", max: 100},
                            {text: "急刹车  评分 ： "+brakeArr+"分", max: 100},
                            {text: "超速驾驶  评分 ： "+speedArr+"分", max: 100},
                            {text: "疲劳驾驶  评分 ： "+fatArr+"分", max: 100},
                            {text: "急转弯  评分 ： "+speedTurnArr+"分", max: 100}
                        ]
                    }],
                    series: [
                        {
                            name: '雷达图',
                            type: 'radar',
                            itemStyle: {
                                emphasis: {
                                    lineStyle: {
                                        width: 4
                                    }
                                }
                            },
                            data: [
                                {
                                    value: [decelerationArr,accelerationArr,brakeArr,speedArr,fatArr,speedTurnArr],
                                    name: '当前用户',
                                    symbol: 'rect',
                                    symbolSize: 1,
                                    lineStyle: {
                                        normal: {
                                            color: '#a9d8be'
                                        }
                                    },
                                    areaStyle: {
                                        normal: {
                                            color: 'rgba(169,216,190,0.5)',
                                            opacity: 1
                                        }
                                    }
                                },
                                {
                                    value: [decelerationIndexArr,accelerationIndexArr,brakeIndexArr,fatIndexArr,speedTurnIndexArr],
                                    name: '平均参考值',
                                    symbol: 'rect',
                                    symbolSize: 1,
                                    lineStyle: {
                                        normal: {
                                            color: '#f6d498'
                                        }
                                    },
                                    areaStyle: {
                                        normal: {
                                            color: 'rgba(246, 212, 152, 0.5)'
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                });
                renderScoreHtml = scoreTemp({listData: dataList});
                getTag(data);
            }
            $('.con_score .score_mod').html(renderScoreHtml);
        });
    }
    getLastMonthScore();
    function getTag(data) {
        var renderedHtml = '',
            labelData = '',
            tagTempl = $('#tagTemplate').html().trim().tmpl();
        if (data.result == 0) {
            var labelList = data.rows, labelArr = [];
            labelList.forEach(function (item) {
                labelData = item.USER_LABEL;
            });
            var left = 370, top = 242, rotate = 0, degree = parseInt(360 / (labelData.split(',').length -1));
            labelData.split(',').forEach(function (item,index) {
                var labelJson = {};
                labelJson.label = item;
                labelJson.top = top + 'px';
                labelJson.left = left +'px';
                labelJson.spanRotate = -rotate + 'deg';
                if(index){
                    labelJson.style = 'transform: rotate('+ rotate +'deg) translateX(40px)';
                }
                rotate += degree;top = 142;
                labelJson.color = 'rgb('+ Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')';
                labelArr.push(labelJson);
            });
            // console.log(labelList);
            // console.log(labelData.split(','));
            renderedHtml = tagTempl({listData: labelArr});
        } else {
            // alert(data);
        }
        // console.log(data.rows);
        $('.con_tag').html(renderedHtml);
        // $('.con_report .report_la').last().css('display', 'block');
    }

    /*查看场景评分*/
    $('#closeBtn').click(function () {
        $('.popup').fadeOut();
    });
    var labData = null, labTemp = $('#labTemp').html().trim().tmpl(), renderHtml="";

    $('#wrapper').on('click','.showBtn',function () {
        $.ajax({
            url:'/getProfile',
            type:'post',
            data:{
                userId: userId,
                mouthId:getFullYear.toString()+month
            }
        }).done(function (data) {
            if (data.result==0){
                // console.log(data.rows);
                labData = data.rows;
                $('.popup').fadeIn();
                $('.popup .alertMod ul li').eq(0).click();
            }
        });
    });
    /*table切换*/
    $('.popup .alertMod ul li').each(function () {
        var index = $(this).index();
        $(".popup .alertMod ul li").eq(0).addClass("popupAc");
        $(this).click(function () {

            $(this).addClass("popupAc").siblings().removeClass("popupAc");
            $(".popup .alertMod>table").eq(index-1).stop(true).addClass('tableActive').siblings().stop(true).removeClass('tableActive');
            var behaviorId = $(this).data('id');
            // console.log(behaviorId);
            var newArr=labData.filter(function (item) {
                return item.BEHAVIOR_ID == behaviorId;
            });
            if (newArr.length>6){
                newArr = newArr.slice(0,3).concat(newArr.slice(-3));
            }
            // console.log(newArr);
            renderHtml = labTemp({listData: newArr});
            $('.popup .alertMod .tableMod').html(renderHtml);
        });

    });
});


$(function () {

    $(".connect .content_right .con_dataMod ul li").each(function () {

        var index = $(this).index();

        $(".connect .content_right .con_dataMod ul li").eq(0).addClass("active");

        $(this).click(function () {


            $(this).addClass("active").siblings().removeClass("active");

            $(".con_dataMod>div").eq(index).stop(true).addClass('ec_active').siblings().stop(true).removeClass('ec_active');

        })

    });


});