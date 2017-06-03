$(function() {
    let powerDOM = $(".bk-instant-power");
    let voltageDOM = $(".bk-instant-voltage");
    let curentDOM = $(".bk-instant-current");
    let timeDOM = $(".bk-instant-time");
    let dateDOM = $(".bk-instant-date");
    let gpowerDOM = $(".bk-ginstant-power");
    let gvoltageDOM = $(".bk-ginstant-voltage");
    let gcurentDOM = $(".bk-ginstant-current");
    let gtimeDOM = $(".bk-ginstant-time");
    let gdateDOM = $(".bk-ginstant-date");
    let todayRevenuDOM = $(".today-revenue");
    let totalRevenuDOM = $(".total-revenue");
    let todayUnits = $(".today-units");
    let gtodayUnits = $(".gtoday-units");
    let voltage = 0;
    let current = 0;
    let power = voltage*current;
    let utime = 0;
    let gvoltage = 0;
    let gcurrent = 0;
    let gpower = voltage*current;
    let gutime = 0;
    let tounits = 0;
    let gtounits = 0;
    timeDOM.html(moment().format('HH:mm:ss'));
    dateDOM.html(moment().format('Do MMM'));

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
                        var point = instantValues();
                        console.log(point,"Point");
                        series.addPoint(point, true, true);
                    }, 3000);
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

    Highcharts.chart('bk-today-energy-bar', {
      chart: {
          type: 'column'
      },
      title: {
          text: 'Energy Today'
      },
      xAxis: {
          categories: [
              'S Energy',
              'G Energy',
          ]
      },
      yAxis: [{
          min: 0,
          title: {
              text: 'Energy Today'
          }
      }, {
          title: {
              text: 'Units (kWh)'
          },
          opposite: true
      }],
      legend: {
          shadow: false
      },
      tooltip: {
          shared: true
      },
      plotOptions: {
          column: {
              grouping: false,
              shadow: false,
              borderWidth: 0
          }
      },
      series: [{
          name: 'Solar',
          color: 'rgba(165,170,217,1)',
          data: [150],
          pointPadding: 0.3,
          pointPlacement: -0.2
      }, {
          name: 'Grid',
          color: 'rgba(126,86,134,.9)',
          data: [140],
          pointPadding: 0.4,
          pointPlacement: -0.2
      }]
    });


    var chartpie = Highcharts.chart('bk-energy-pie', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: null
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Total',
            colorByPoint: true,
            data: [{
                name: 'Solar',
                y: 56.33
            }, {
                name: 'Grid',
                y: 124.03,
                sliced: true,
                selected: true
            }]
        }]
    });

    // Highcharts.chart('', {
    //
    //   chart: {
    //       type: 'column'
    //   },
    //
    //   title: {
    //       text: 'Today Energy'
    //   },
    //
    //   xAxis: {
    //       categories: ['Energy']
    //   },
    //
    //   yAxis: {
    //       allowDecimals: false,
    //       min: 0,
    //       title: {
    //           text: 'Units'
    //       }
    //   },
    //
    //   tooltip: {
    //       formatter: function () {
    //           return '<b>' + this.x + '</b><br/>' +
    //               this.series.name + ': ' + this.y + '<br/>' +
    //               'Load: ' + this.point.stackTotal;
    //       }
    //   },
    //
    //   plotOptions: {
    //       column: {
    //           stacking: 'normal'
    //       }
    //   },
    //
    //   series: [{
    //       name: 'Load',
    //       data: [5, 3],
    //       stack: 'male'
    //   }, {
    //       name: 'Solar',
    //       data: [3, 4],
    //       stack: 'male'
    //   }]
    // });

    var stackbar = Highcharts.chart('bk-today-energy-stackbar', {
    chart: {
        type: 'column'
    },
    title: {
        text: null
    },
    xAxis: {
        categories: ['Energy']
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Today Energy'
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
                color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
            }
        }
    },
    legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
    },
    tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Load: {point.stackTotal}'
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: true,
                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
            }
        }
    },
    series: [{
        name: 'Solar',
        data: [8]
    }, {
        name: 'Grid',
        data: [20]
    }]
  });


  $("#se-energy").flatpickr({
      defaultDate: new Date(),
      enableTime: false
  });
  $(document).ready(function() {
      c3.generate({
          bindto: '#ks-next-payout-chart',
          data: {
              columns: [
                  ['data1', 6, 5, 6, 5, 7, 8, 7]
              ],
              types: {
                  data1: 'area'
              },
              colors: {
                  data1: '#81c159'
              }
          },
          legend: {
              show: false
          },
          tooltip: {
              show: false
          },
          point: {
              show: false
          },
          axis: {
              x: {
                  show: false
              },
              y: {
                  show: false
              }
          }
      });

      c3.generate({
          bindto: '#ks-total-earning-chart',
          data: {
              columns: [
                  ['data1', 6, 5, 6, 5, 7, 8, 7]
              ],
              types: {
                  data1: 'area'
              },
              colors: {
                  data1: '#4e54a8'
              }
          },
          legend: {
              show: false
          },
          tooltip: {
              show: false
          },
          point: {
              show: false
          },
          axis: {
              x: {
                  show: false
              },
              y: {
                  show: false
              }
          }
      });

      // c3.generate({
      //     bindto: '.ks-chart-orders-block',
      //     data: {
      //         columns: [
      //             ['Units Generated', 150, 200, 220, 280, 400, 160, 260, 400, 300, 400, 500, 420, 500, 300, 200, 100, 400, 600, 300, 360, 600],
      //             ['Units Consumed', 350, 300, 200, 140, 200, 30, 200, 100, 400, 600, 300, 200, 100, 50, 200, 600, 300, 500, 30, 200, 320]
      //         ],
      //         colors: {
      //             'Units Generated': '#f88528',
      //             'Units Consumed': '#81c159'
      //         }
      //     },
      //     point: {
      //         r: 5
      //     },
      //     grid: {
      //         y: {
      //             show: true
      //         }
      //     }
      // });
  });


  function instantValues() {
    fetch('https://api.blufieldsenergy.com/v1/l/1')
    .then(
      function(response) {
        response.json().then(function(res) {
          console.log(res,"Channel 1");
            res.Items.forEach(function(e,i){
              // console.log(e,i);
              voltage = 0;
              current = 0;
              power = e.powac/1000;
              voltage = e.vrms/1000;
              current = e.crms/1000;
              utime = e.utime;
              powerDOM.html(parseFloat(Math.abs(power)).toFixed(2));
              voltageDOM.html(parseFloat(voltage).toFixed(2));
              curentDOM.html(parseFloat(current).toFixed(2));
              let tr = parseFloat(Math.abs(e.enac*0.007)).toFixed(2);
              let tor = parseFloat(Math.abs(e.enac*0.007)).toFixed(2);
              console.log(tr,tor);
              todayRevenuDOM.html(tr);
              // totalRevenuDOM.html(tor);
              tounits = parseFloat(Math.abs(e.enac*0.001)).toFixed(2);
              todayUnits.html(tounits);
              timeDOM.html(moment(e.utime).format('HH:mm:ss'));
              stackbar.series[0].setData([Math.abs(tounits)]);
            });
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
    // $.get('https://api.blufieldsenergy.com/v1/l/',function(res){
    //   // console.log(res);
    //   res.Items.forEach(function(e,i){
    //     console.log(e,i);
    //     voltage = 0;
    //     current = 0;
    //     power = e.powac;
    //     voltage = e.vol;
    //     powerDOM.html(power);
    //     voltageDOM.html(voltage);
    //   });
    // });
    // voltage = Math.random()*20+220;
    // current = Math.random()*1.1+0.2;
    // power = voltage*current;
    // voltageDOM.html(voltage.toFixed(2));
    // curentDOM.html(current.toFixed(2));
    // powerDOM.html(power.toFixed(2));
    // timeDOM.html(moment().format('HH:mm:ss'));
    let series = [];
    series[0] = utime;
    series[1] = power;
    return series;
  }
  function instant3Values() {
    fetch('https://api.blufieldsenergy.com/v1/l/4')
    .then(
      function(response) {
        response.json().then(function(res) {
          // console.log(res);
            res.Items.forEach(function(e,i){
              console.log(e,i);
              gvoltage = 0;
              gcurrent = 0;
              gpower = e.powac/1000;
              gvoltage = e.vrms/1000;
              gcurrent = e.crms/1000;
              gutime = e.utime;
              gpowerDOM.html(parseFloat(Math.abs(gpower)).toFixed(2));
              gvoltageDOM.html(parseFloat(gvoltage).toFixed(2));
              gcurentDOM.html(parseFloat(gcurrent).toFixed(2));
              // let tr = parseFloat(Math.abs(e.enac*0.007*0.001)).toFixed(2);
              let tor = parseFloat(Math.abs(e.enac*0.007)).toFixed(2);
              totalRevenuDOM.html(tor);
              gtounits = parseFloat(Math.abs(e.enac*0.001)).toFixed(2);
              gtodayUnits.html(gtounits);
              gtimeDOM.html(moment(e.utime).format('HH:mm:ss'));
              console.log("Type of:",typeof Math.abs(gtounits),typeof Math.abs(e.enac*0.001));
              stackbar.series[1].setData([Math.abs(gtounits-tounits)]);
              let pieData = [["serie1", tounits],["serie2", gtounits]];

              var seriesData = [{
                  name: 'Solar',
                  y: Math.abs(tounits),
              }, {
                  name: 'Grid',
                  y: Math.abs(gtounits-tounits),
              }];
              // $.each(chartpie.series[0], function(i, item) {
              //   console.log(i,item);
              //   // if(item.name == 'Grid'){
              //   //   seriesData.push(["serie"+i, gtounits]);
              //   // }
              // });
              console.log("pieData",seriesData);
              chartpie.series[0].setData(seriesData, true);
              // chartpie.series[0].setData([Math.abs(pieData,true)]);
            });
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
  }
  function tseries() {
    fetch('https://api.blufieldsenergy.com/v1/l/1?l=1440')
    .then(
      function(response) {
        response.json().then(function(res) {
          console.log(res);
            let da = [];
            let ca = [];
            res.Items.forEach(function(e,i){
              da[i] = [e.utime,Math.abs(e.enac)];
              ca[i] = [e.utime,Math.abs(e.powac)]
            });
            console.log(da);
            Highcharts.chart('line-series', {
                  chart: {
                      zoomType: 'x'
                  },
                  title: {
                      text: 'Generated'
                  },
                  subtitle: {
                      text: document.ontouchstart === undefined ?
                              'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
                  },
                  xAxis: {
                      type: 'datetime'
                  },
                  yAxis: {
                      title: {
                          text: 'Energy'
                      }
                  },
                  legend: {
                      enabled: false
                  },
                  plotOptions: {
                    series: {
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function (e) {
                                    hs.htmlExpand(null, {
                                        pageOrigin: {
                                            x: e.pageX || e.clientX,
                                            y: e.pageY || e.clientY
                                        },
                                        headingText: this.series.name,
                                        maincontentText: Highcharts.dateFormat('%H:%M:%S', this.x) + ':<br/> ' +
                                            this.y + ' visits',
                                        width: 200
                                    });
                                }
                            }
                        },
                        marker: {
                            lineWidth: 1
                        }
                    }
                  },

                  series: [
                  // {
                  //     type: 'spline',
                  //     name: 'Energy',
                  //     data: da
                  // },
                  {
                      type: 'spline',
                      name: 'Power',
                      data: ca
                  }]
              });
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
  }
  tseries();
  setInterval(instantValues,4000);
  setInterval(instant3Values,4000);
});
