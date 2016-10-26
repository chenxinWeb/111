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

    });
    var userId = $('#wrapper .title').not('div[style*="display: none"]').find('.userId').val(),
        tableTempl = $('#listTemplate').html().trim().tmpl();
    $.ajax({
        url: '/getList',
        type: 'post',
        data: {userId: userId},
        success: function (data) {
            getReport(data);
        }
    });
    //获取行驶报告
    function getReport(data) {
        var renderedHtml = '';
        if (data.result == 0) {
            renderedHtml = tableTempl({listData: data.rows});
        } else {
            alert(data);
        }
        // console.log(data.rows);
        $('.con_report').html(renderedHtml);
        $('.con_report .report_la').last().css('display', 'block');
    }


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
    var myChart = echarts.init(document.getElementById('echarts_data')),
        option = {
            legend: {
                bottom: '30',
                data: ['图一', '图二'],
                icon: 'circle'
            },
            radar: [
                {
                    indicator: [
                        {text: "急减速  评分 - 36分", max: 10},
                        {text: '急加速', max: 10},
                        {text: '急刹车', max: 10},
                        {text: '超速驾驶', max: 10},
                        {text: '疲劳驾驶', max: 10},
                        {text: '急转弯', max: 10}
                    ],
                    center: ['50%', '50%'],
                    radius: 120,
                    startAngle: 90,
                    splitNumber: 5,
//          shape: 'circle',
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
                            value: [5, 6, 7, 8, 9, 5],
                            name: '图一',
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
                            value: [1, 2, 3, 4, 5, 6],
                            name: '图二',
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
                data: ['行驶数量', '行驶里程'],
//                icon:'circle'
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['5月', '6月', '7月', '8月', '9月']
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '单位-KM',
                    min: 0,
                    max: 2000,
                    interval: 400,
                    axisLabel: {
                        formatter: '{value} '
                    }
                },
                {
                    type: 'value',
                    name: '单位-次',
                    min: 0,
                    max: 500,
                    interval: 100,
                    axisLabel: {
                        formatter: '{value}'
                    }
                }
            ],
            series: [
                {
                    name: '行驶数量',
                    type: 'bar',
                    barWidth: 20,
                    markLine: {
                        symbol: 'arrow'
                    },
                    data: [100, 200, 300, 400, 500]
                },
                {
                    name: '行驶里程',
                    type: 'line',
                    yAxisIndex: 1,
//                  symbol :'pin',
//                  symbolSize:5,
                    data: [100, 120, 150, 220, 210]
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
                data: ['四急数据1', '四急数据2', '四急数据3', '四急数据4']
//                icon:'circle'
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['5月', '6月', '7月', '8月', '9月']
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '单位-KM',
                    min: 0,
                    max: 2000,
                    interval: 400,
                    axisLabel: {
                        formatter: '{value} '
                    }
                },
                {
                    type: 'value',
                    name: '单位-次',
                    min: 0,
                    max: 500,
                    interval: 100,
                    axisLabel: {
                        formatter: '{value}'
                    }
                }
            ],
            series: [
                {
                    name: '四急数据1',
                    type: 'line',
                    yAxisIndex: 1,
//                  symbol :'pin',
//                  symbolSize:5,
                    data: [100, 120, 150, 220, 210]
                },
                {
                    name: '四急数据2',
                    type: 'line',
                    yAxisIndex: 1,
//                  symbol :'pin',
//                  symbolSize:5,
                    data: [120, 150, 190, 220, 110]
                },
                {
                    name: '四急数据3',
                    type: 'line',
                    yAxisIndex: 1,
//                  symbol :'pin',
//                  symbolSize:5,
                    data: [180, 200, 210, 20, 200]
                },
                {
                    name: '四急数据4',
                    type: 'line',
                    yAxisIndex: 1,
//                  symbol :'pin',
//                  symbolSize:5,
                    data: [300, 220, 150, 120, 410]
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
                data: ['四急数据1', '四急数据2']
//                icon:'circle'
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['5月', '6月', '7月', '8月', '9月']
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '单位-KM',
                    min: 0,
                    max: 2000,
                    interval: 400,
                    axisLabel: {
                        formatter: '{value} '
                    }
                },
                {
                    type: 'value',
                    name: '单位-次',
                    min: 0,
                    max: 500,
                    interval: 100,
                    axisLabel: {
                        formatter: '{value}'
                    }
                }
            ],
            series: [
                {
                    name: '四急数据1',
                    type: 'line',
                    yAxisIndex: 1,
//                  symbol :'pin',
//                  symbolSize:5,
                    data: [100, 120, 150, 220, 210]
                },
                {
                    name: '四急数据2',
                    type: 'line',
                    yAxisIndex: 1,
//                  symbol :'pin',
//                  symbolSize:5,
                    data: [120, 150, 190, 220, 110]
                }
            ]
        };

    ec_dangerous.setOption(op_dangerous);
});


$(function () {

    $(".connect .content_right .con_dataMod ul li").each(function () {

        var index = $(this).index();

        $("ul li").eq(0).addClass("active");

        $(this).click(function () {


            $(this).addClass("active").siblings().removeClass("active");

            $(".con_dataMod>div").eq(index).stop(true).addClass('ec_active').siblings().stop(true).removeClass('ec_active');

        })

    })

})