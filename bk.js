$(function() {
    // var items;
    // var activepower = $("#active-power");
    // var rmsvoltage = $("#rms-voltage");
    // var rmscurrent = $("#rms-current");
    // var idchannel = $("#channel");
    // var vtime = $("v-timestamp");
    // var pdata = [];
    // var getCurrentPower = function(guage){
    //   console.log("Get Current Power called",guage);
    //
    //   $.get( "https://pyz1xbouqb.execute-api.us-east-1.amazonaws.com/l/", function( res ) {
    //     items = res.Items;
    //     if(items.length){
    //       items.forEach(function(e,i){
    //         if( 1 == e.channel)
    //         // console.log(e);
    //         var ap = -1*parseFloat((e.powac/10000)).toFixed(2);
    //         var rv = parseFloat((e.vrms/1000)).toFixed(2);
    //         if( 0 != parseInt(e.vrms) ){
    //           // console.log("Non Zero values");
    //           idchannel.html(e.channel);
    //           activepower.html(Math.abs(ap));
    //           rmsvoltage.html(rv);
    //           vtime.html(e.utime);
    //
    //           rmscurrent.html(parseFloat((e.crms/10000)).toFixed(2));
    //           pdata= [{
    //             period: new Date().getTime(),
    //             power: e.crms
    //           }];
    //
    //           var point = guage.series[0].points[0];
    //           point.update(Math.abs(e.powac/10000));
    //         }
    //       });
    //     }
    //     console.log(pdata);
    //   });
    //
    //   return pdata;
    // };
    //
    // var hc = $("#hc-1");
    //
    // $.getJSON('https://pyz1xbouqb.execute-api.us-east-1.amazonaws.com/l/c5', function (data) {
    //   var powerdata = [];
    //   data.Items.forEach(function(e,i){
    //
    //     var timestamp = parseInt(Math.abs(e.utime/10));
    //     var power = isNaN(e.powac)? null: e.powac;
    //     var record = [timestamp, Math.abs(power/10000)];
    //     if(0 == record[1]){
    //       // console.log("Power Zero", i, new Date(timestamp));
    //       // powerdata.push(record);
    //     } else{
    //       // console.log("Time", new Date(timestamp));
    //       powerdata.push(record);
    //     }
    // });
    //   // console.log(powerdata);
    //   powerdata.sort((a,b) => {if (a[0] < b[0]) return -1;
    //    if (a[0] > b[0]) return 1;
    //    return 0;});
    //   // console.log(powerdata);
    //   Highcharts.setOptions({
    //   	global: {
    //   		useUTC: false,
    //       timezoneOffset: 330
    //   	}
    //   });
    //   // console.log(moment(24,"HH").format('x'));
    //   var daystart = moment(0,"HH").format('x');
    //   var dayend = moment(24,"HH").format('x');
    //   var pchart = Highcharts.chart('hc-1', {
    //       chart: {
    //           zoomType: 'x'
    //       },
    //       title: {
    //           text: 'Power over time'
    //       },
    //       subtitle: {
    //           text: document.ontouchstart === undefined ?
    //                   'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
    //       },
    //       xAxis: {
    //           type: 'datetime',
    //           // "max": dayend,
    //           // "min": daystart,
    //           "crosshair": true,
    //           "tickWidth": 1,
    //           "tickColor": "#ECEDED",
    //           "lineColor": "#ECEDED",
    //           "tickAmount": 0
    //       },
    //       yAxis: {
    //           // "min": 0.0,
    //           // "max": 300,
    //           "title": {
    //               "text": 'Power [ W ]'
    //           },
    //           // "tickWidth": 1,
    //           // "offset": 32,
    //           // "tickLength": 32,
    //           // "tickPosition": "inside",
    //           // "tickColor": "#ECEDED",
    //           // "tickAmount": 6
    //       },
    //       legend: {
    //           enabled: false
    //       },
    //       plotOptions: {
    //           area: {
    //               fillColor: {
    //                   linearGradient: {
    //                       x1: 0,
    //                       y1: 0,
    //                       x2: 0,
    //                       y2: 1
    //                   },
    //                   stops: [
    //                       [0, Highcharts.getOptions().colors[0]],
    //                       [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
    //                   ]
    //               },
    //               marker: {
    //                   radius: 2
    //               },
    //               lineWidth: 1,
    //               states: {
    //                   hover: {
    //                       lineWidth: 1
    //                   }
    //               },
    //               threshold: null
    //           },
    //           // "bubble": {
    //           //   "minSize": 8,
    //           //   "maxSize": 8
    //           // },
    //           "series": {
    //             "animation": false,
    //             "pointPadding": 0.0,
    //             "groupPadding": 0,
    //             "borderWidth": 0,
    //             "shadow": false
    //           }
    //       },
    //
    //       series: [{
    //           "type": 'area',
    //           // "stacking": "normal",
    //           "name": 'Power',
    //           "data": powerdata,
    //           "tooltip": {
    //             "valueSuffix": " W"
    //           },
    //           // "threshold": 0,
    //           // "lineWidth": 1
    //       }],
    //       "credits": {
    //         "enabled": false
    //       }
    //   });
    // });
    //
    // var gaugeOptions = {
    //
    //   chart: {
    //       type: 'solidgauge'
    //   },
    //
    //   title: null,
    //
    //   pane: {
    //       center: ['50%', '85%'],
    //       size: '140%',
    //       startAngle: -90,
    //       endAngle: 90,
    //       background: {
    //           backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
    //           innerRadius: '60%',
    //           outerRadius: '100%',
    //           shape: 'arc'
    //       }
    //   },
    //
    //   tooltip: {
    //       enabled: false
    //   },
    //
    //   // the value axis
    //   yAxis: {
    //       stops: [
    //           [0.1, '#55BF3B'], // green
    //           [0.5, '#DDDF0D'], // yellow
    //           [0.9, '#DF5353'] // red
    //       ],
    //       lineWidth: 0,
    //       minorTickInterval: null,
    //       tickAmount: 2,
    //       title: {
    //           y: -70
    //       },
    //       labels: {
    //           y: 16
    //       }
    //   },
    //
    //   plotOptions: {
    //       solidgauge: {
    //           dataLabels: {
    //               y: 5,
    //               borderWidth: 0,
    //               useHTML: true
    //           }
    //       }
    //   }
    // };
    //
    // var guage = Highcharts.chart('hc-guage', Highcharts.merge(gaugeOptions, {
    //   yAxis: {
    //       min: 0,
    //       max: 300,
    //       title: {
    //           text: 'Power'
    //       }
    //   },
    //
    //   credits: {
    //       enabled: false
    //   },
    //
    //   series: [{
    //       name: 'Power',
    //       data: [0],
    //       dataLabels: {
    //           format: '<div style="text-align:center"><span style="font-size:25px;color:' +
    //               ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
    //                  '<span style="font-size:12px;color:silver">W</span></div>'
    //       },
    //       tooltip: {
    //           valueSuffix: ' W'
    //       }
    //   }]
    //
    // }));
    //
    // // getCurrentPower(guage);
    // var updateData= function(){
    //   // console.log(guage);
    //   getCurrentPower(guage);
    // }
    // setInterval(updateData,10000);
    //
    // $("#full-screen").on("click",function(){
    //     toggleFullScreen(document.getElementById("power-full"));
    // });
    //
    // function toggleFullScreen(element) {
    //   if (!document.fullscreenElement) {
    //     if(element.requestFullscreen) {
    //       element.requestFullscreen();
    //     } else if(element.mozRequestFullScreen) {
    //       element.mozRequestFullScreen();
    //     } else if(element.webkitRequestFullscreen) {
    //       element.webkitRequestFullscreen();
    //     } else if(element.msRequestFullscreen) {
    //       element.msRequestFullscreen();
    //     }
    //   } else {
    //     if (document.exitFullscreen) {
    //       document.exitFullscreen();
    //     } else if(document.mozexitFullscreen) {
    //       document.mozexitFullscreen();
    //     } else if(document.webkitexitFullscreen) {
    //       document.webkitexitFullscreen();
    //     } else if(document.msexitFullscreen) {
    //       document.msexitFullscreen();
    //     }
    //   }
    // }
    //
    // // function used to calculate the total - _.sumBy not available in old lodash
    // var totalHours = function(total, project){
    //     return total + project.Hours;
    // }
    //
    //
    // var sumProjects = function(projects){
    //     return {
    //         Projectkey: projects[0].Projectkey,
    //         Hours: _.reduce(projects, totalHours, 0)
    //     }
    // }
    // function minuteData(){
    //   $.getJSON('https://pyz1xbouqb.execute-api.us-east-1.amazonaws.com/l/chart/', function (data) {
    //     var energydata = [];
    //     var hourdata = [];
    //     var en = 0;
    //     var hen = 0;
    //     var today = new Date();
    //     console.log(data.Items);
    //     var grouped = _.groupBy(data.Items, function(o) {
    //       var date = new Date(parseInt(Math.abs(o.utime/10)));
    //       console.log(date.getHours());
    //       if(date.getDate() == today.getDate())
    //       return date.getHours();
    //       else
    //       return -1;
    //     });
    //     console.log("Grouped by Hour",grouped, typeof grouped);
    //
    //     var groupedArr = _.forEach(grouped, function(value, key) {
    //       var sum = _.sumBy(value,function(o){
    //         // console.log(o,"Hello");
    //         return Number(isNaN(o.enac)? 0: Math.abs(o.enac));
    //       });
    //       console.log(sum,"KEY",key);
    //       if( key != '-1')
    //       hourdata.push([key,Math.abs((sum/10000))]);
    //     });
    //     console.log(groupedArr);
    //     data.Items.forEach(function(e,i){
    //
    //       var timestamp = parseInt(Math.abs(e.utime/10));
    //       var energy = isNaN(e.enac)? null: e.enac;
    //       var record = [timestamp, Math.abs(energy/10000)];
    //       var d =  new Date(timestamp);
    //
    //       if(0 == record[1]){
    //         // console.log("Power Zero: Date", i, d.getDate(),d.getHours(), d.getMinutes());
    //         // powerdata.push(record);
    //       } else{
    //
    //         // console.log("Date", d.getDate(), d.getHours(), d.getMinutes());
    //
    //         if( d.getDate() == today.getDate()){
    //           en = en+Math.abs(energy/10000);
    //           if(d.getHours() == today.getHours()){
    //             // hourdata[today.getHours()] = hen+Math.abs(energy/10000);
    //             // console.log(hourdata);
    //           }
    //           // console.log("Today",d.getDate(), d.getHours(), d.getMinutes(),"Energy",en,"Current",Math.abs(energy/10000));
    //         }
    //
    //         // energydata.push(record);
    //       }
    //   });
    //     // console.log(powerdata);
    //     energydata.sort((a,b) => {if (a[0] < b[0]) return -1;
    //      if (a[0] > b[0]) return 1;
    //      return 0;});
    //      var ndate = new Date();
    //      var bar = [moment().format('DD-MM-YY'), en ];
    //      energydata.push(bar);
    //      console.log(energydata);
    //     // console.log(powerdata);
    //     Highcharts.setOptions({
    //     	global: {
    //     		useUTC: false,
    //         timezoneOffset: 330
    //     	}
    //     });
    //     console.log(moment(24,"HH").format('x'));
    //     var daystart = moment(0,"HH").format('x');
    //     var dayend = moment(24,"HH").format('x');
    //     var echart = Highcharts.chart('hc-energy', {
    //         chart: {
    //             type: 'column'
    //         },
    //         title: {
    //             text: 'Energy'
    //         },
    //         xAxis: {
    //             type: 'category',
    //             labels: {
    //                 rotation: -45,
    //                 style: {
    //                     fontSize: '13px',
    //                     fontFamily: 'Verdana, sans-serif'
    //                 }
    //             }
    //         },
    //         yAxis: {
    //             min: 0,
    //             title: {
    //                 text: 'Wh'
    //             }
    //         },
    //         legend: {
    //             enabled: false
    //         },
    //         tooltip: {
    //             pointFormat: '<b>{point.y:.1f} Wh</b>'
    //         },
    //         "credits": {
    //           "enabled": false
    //         },
    //         series: [{
    //             name: 'Energy',
    //             data: energydata,
    //             dataLabels: {
    //                 enabled: false,
    //                 rotation: -90,
    //                 color: '#FFFFFF',
    //                 align: 'right',
    //                 format: '{point.y:.1f}', // one decimal
    //                 y: 10, // 10 pixels down from the top
    //                 style: {
    //                     fontSize: '13px',
    //                     fontFamily: 'Verdana, sans-serif'
    //                 }
    //             }
    //         }]
    //     });
    //
    //     var hchart = Highcharts.chart('hc-energy-hour', {
    //         chart: {
    //             type: 'column'
    //         },
    //         title: {
    //             text: 'Energy'
    //         },
    //         xAxis: {
    //             type: 'category',
    //             labels: {
    //                 rotation: -45,
    //                 style: {
    //                     fontSize: '13px',
    //                     fontFamily: 'Verdana, sans-serif'
    //                 }
    //             }
    //         },
    //         yAxis: {
    //             min: 0,
    //             title: {
    //                 text: 'Wh'
    //             }
    //         },
    //         legend: {
    //             enabled: false
    //         },
    //         tooltip: {
    //             pointFormat: '<b>{point.y:.1f} Wh</b>'
    //         },
    //         "credits": {
    //           "enabled": false
    //         },
    //         series: [{
    //             name: 'Energy',
    //             data: hourdata,
    //             dataLabels: {
    //                 enabled: false,
    //                 rotation: -90,
    //                 color: '#FFFFFF',
    //                 align: 'right',
    //                 format: '{point.y:.1f}', // one decimal
    //                 y: 10, // 10 pixels down from the top
    //                 style: {
    //                     fontSize: '13px',
    //                     fontFamily: 'Verdana, sans-serif'
    //                 }
    //             }
    //         }]
    //     });
    //
    //   });
    // }
    // minuteData();
    // setInterval(minuteData,60000);

    Highcharts.chart('bk-bar', {
        chart: {
            type: 'column'
        },
        title: {
            text: null, //'Solar vs Grid'
        },
        xAxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Energy (kWh)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Solar',
            color: '#f36f23',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6]

        }, {
            name: 'Grid',
            color: '#42a5f5',
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0]

        }]
    });

    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    Highcharts.chart('bk-live-power', {
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function () {

                    // set up the updating of the chart each second
                    var series = this.series[0];
                    setInterval(function () {
                        var x = (new Date()).getTime(), // current time
                            y = Math.random()*80+20;
                        series.addPoint([x, y], true, true);
                    }, 1000);
                }
            }
        },
        title: {
            text: null
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'Power in Watts'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                    Highcharts.numberFormat(this.y, 2);
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: 'Instant Power',
            data: (function () {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                for (i = -19; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 1000,
                        y: (Math.random()*80)+20
                    });
                }
                return data;
            }())
        }]
    });
});
