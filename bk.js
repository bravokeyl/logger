$(function() {
    let powerDOM = $(".bk-instant-power");
    let voltageDOM = $(".bk-instant-voltage");
    let curentDOM = $(".bk-instant-current");
    let timeDOM = $(".bk-instant-time");
    let dateDOM = $(".bk-instant-date");
    let voltage = 0;
    let current = 0;
    let power = voltage*current;
    timeDOM.html(moment().format('HH:mm:ss'));
    dateDOM.html(moment().format('Do MMM'));
    function instantValues() {
      voltage = Math.random()*20+220;
      current = Math.random()*1.1+0.2;
      power = voltage*current;
      voltageDOM.html(voltage.toFixed(2));
      curentDOM.html(current.toFixed(2));
      powerDOM.html(power.toFixed(2));
      timeDOM.html(moment().format('HH:mm:ss'));

      return power;
    }
    setInterval(instantValues,1000);
    Highcharts.chart('bk-bar', {
        chart: {
            type: 'column'
        },
        title: {
            text: null, //'Solar vs Grid'
        },
        xAxis: {
            // type: "datetime",
            categories: [
                '23',
                '24',
                '25',
                '26',
                '27',
                '28',
                '29'
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
                '<td style="padding:0"><b>{point.y:.1f} kWh</b></td></tr>',
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
                            y = power;
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
            color: '#42a5f5',
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

    Highcharts.chart('bk-today-hour', {
        chart: {
            type: 'area'
        },
        title: {
            text: null,
        },
        xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    return this.value; // clean, unformatted number for year
                }
            }
        },
        yAxis: {
            title: {
                text: 'Energy (kWh)'
            },
            labels: {
                formatter: function () {
                    return this.value / 1000 + 'kWh';
                }
            }
        },
        tooltip: {
            pointFormat: '{series.name} : <b>{point.y:,.0f}</b><br/>units in {point.x}'
        },
        plotOptions: {
            area: {
                pointStart: 2,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [{
            name: 'Solar',
            data: [null, null, null, null, null, 6, 11, 32, 110, 235, 369, 640,
                1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
                27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
                22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104]
        }, {
            name: 'Grid',
            data: [null, null, null, null, null, null, null, null, null, null,
                5, 25, 50, 120, 150, 200, 426, 660, 869, 1060, 1605, 2471, 3322,
                4238, 5221, 6129, 7089, 8339, 9399, 10538, 11643, 13092, 14478,
                15915, 17385, 19055, 21205, 23044, 25393, 27935, 30062, 32049,
                33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000, 37000,
                35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
                21000, 20000, 19000, 18000, 18000, 17000, 16000]
        }]
    });

    // var chart = Highcharts.chart('bk-today-energy', {
    //
    //     title: {
    //         text: 'Chart.update'
    //     },
    //
    //     subtitle: {
    //         text: 'Plain'
    //     },
    //
    //     xAxis: {
    //         categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    //     },
    //
    //     series: [{
    //         type: 'column',
    //         colorByPoint: true,
    //         data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
    //         showInLegend: false
    //     }]
    //
    // });
    //
    //
    // $('#plain').click(function () {
    //     chart.update({
    //         chart: {
    //             inverted: false,
    //             polar: false,
    //             bar: true
    //         },
    //         subtitle: {
    //             text: 'Plain'
    //         }
    //     });
    // });
    //
    // $('#inverted').click(function () {
    //     chart.update({
    //         chart: {
    //             inverted: true,
    //             polar: false
    //         },
    //         subtitle: {
    //             text: 'Inverted'
    //         }
    //     });
    // });
    //
    // $('#polar').click(function () {
    //     chart.update({
    //         chart: {
    //             inverted: false,
    //             polar: true
    //         },
    //         subtitle: {
    //             text: 'Polar'
    //         }
    //     });
    // });

    Highcharts.chart('bk-today-energy', {
        title: {
            text: null
        },
        xAxis: {
            categories: ['12', '13', '14', '15', '16']
        },
        labels: {
            items: [{
                html: null,
                style: {
                    left: '50px',
                    top: '18px',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                }
            }]
        },
        series: [{
            type: 'column',
            name: 'Solar',
            data: [3, 2, 1, 3, 4]
        }, {
            type: 'spline',
            name: 'Estimated',
            data: [3, 2.67, 3, 6.33, 3.33],
            marker: {
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[3],
                fillColor: 'white'
            }
        }]
    });
});
