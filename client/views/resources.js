var View = require('ampersand-view'),
  templates = require('../templates'),
  HighCharts = require('Highcharts')

require('HighchartsMore')
require('HighchartsSolidGauge')

module.exports = View.extend({
  template: templates.includes.resources,
  render: function () {
    this.renderWithTemplate(this);

    var cpuUsage = this.query('[data-hook=cpu-usage]')

    new Highcharts.Chart({
      colors: [
        '#2A9FD6', '#0F0', '#FF5C5C', '#F5FF5C'
      ],
      chart: {
        type: 'column',
        renderTo: cpuUsage,
        spacing: [0, 0, 5, 0],
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor: '#444'
      },
      title: {
        text: 'CPU',
        style: {
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          fontSize: '14px',
          fontWeight: 'normal',
          color: '#BDBDBD'
        }
      },
      legend: {
        itemStyle: {
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          fontSize: '14px',
          fontWeight: 'normal',
          color: '#BDBDBD'
        },
        itemHiddenStyle: {
          color: '#444'
        },
        itemHoverStyle: {
          color: '#777'
        }
      },
      xAxis: {
        title: {
          text: null
        },
        labels: {
          enabled: false
        },
        tickLength: 0,
        lineColor: '#444'
      },
      yAxis: {
        min: 0,
        max: 100,
        gridLineColor: 'transparent',
        title: {
          text: null
        },
        labels: {
          enabled: false
        }
      },
      credits: {
        enabled: false
      },
      tooltip: {
        enabled: false
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: false
          },
          borderColor: '#222'
        }
      },
      series: [{
        name: 'user',
        data: []
      }, {
        name: 'sys',
        data: []
      }, {
        name: 'nice',
        data: []
      }, {
        name: 'irq',
        data: []
      }]
    })

    // cache an element for easy reference by other methods
    var memoryUsage = this.query('[data-hook=memory-usage]')

    new Highcharts.Chart({
      chart: {
        type: 'solidgauge',
        renderTo: memoryUsage,
        backgroundColor: 'rgba(0, 0, 0, 0)'
      },
      title: {
        text: 'Memory',
        style: {
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          fontSize: '14px',
          fontWeight: 'normal',
          color: '#BDBDBD'
        }
      },
      credits: {
        enabled: false
      },
      pane: {
        center: ['50%', '73%'],
        size: '140%',
        startAngle: -90,
        endAngle: 90,
        background: {
          backgroundColor: '#181818',
          innerRadius: '60%',
          outerRadius: '100%',
          shape: 'arc',
          borderColor: '#444'
        }
      },
      tooltip: {
        enabled: false
      },
      yAxis: {
        stops: [
          [0.1, '#55BF3B'], // green
          [0.6, '#DDDF0D'], // yellow
          [0.8, '#DF5353'] // red
        ],
        lineWidth: 0,
        minorTickInterval: null,
        tickPixelInterval: 400,
        tickWidth: 0,
        labels: {
          y: 16,
          style: {
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize: '14px',
            fontWeight: 'normal',
            color: '#BDBDBD'
          }
        },
        min: 0,
        max: 100,
        title: {
          text: null
        },
        plotBands: [{
          from: 0,
          to: 60,
          color: '#55BF3B', // green
          zIndex: 5
        }, {
          from: 60,
          to: 80,
          color: '#DDDF0D', // yellow
          zIndex: 5
        }, {
          from: 80,
          to: 100,
          color: '#DF5353', // red
          zIndex: 5
        }]
      },
      plotOptions: {
        solidgauge: {
          dataLabels: {
            y: -5,
            borderWidth: 0,
            useHTML: true
          }
        }
      },
      series: [{
        name: 'Memory',
        data: [this.model.usedMemory ? this.model.usedMemory : 0],
        dataLabels: {
          format: '<div style="text-align:center;font-size:25px;color:#BDBDBD">{y}%</span></div>',
          borderColor: 'rgba(0, 0, 0, 0)',
          y: 50
        }
      }]
    })
  },
  bindings: {
    'model.cpus': {
      type: function(el, cpus) {
        if(!cpus || !cpus.length) {
          return
        }

        var chart = HighCharts.charts[el.getAttribute('data-highcharts-chart')]

        if(!chart) {
          return
        }

        var data = [{
          name: 'user',
          data: []
        }, {
          name: 'sys',
          data: []
        }, {
          name: 'nice',
          data: []
        }, {
          name: 'irq',
          data: []
        }]

        cpus.forEach(function(cpu, index) {
          data[0].data[index] = cpu.load.user
          data[1].data[index] = cpu.load.sys
          data[2].data[index] = cpu.load.nice
          data[3].data[index] = cpu.load.irq
        })

        data.forEach(function(data, index) {
          chart.series[index].setData(data.data)
        })
      },
      selector: '[data-hook=cpu-usage]'
    },

    'model.usedMemory': {
      type: function (el, usedMemory) {
        if(!usedMemory) {
          return
        }

        var chart = HighCharts.charts[el.getAttribute('data-highcharts-chart')]

        if(!chart) {
          return
        }

        var point = chart.series[0].points[0]
        point.update(usedMemory)
      },
      selector: '[data-hook=memory-usage]'
    }
  }
})
