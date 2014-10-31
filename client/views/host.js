var View = require('ampersand-view'),
  templates = require('../templates')//,
  HighCharts = require('Highcharts')

module.exports = View.extend({
  template: templates.includes.host,
  render: function () {
    this.renderWithTemplate(this);

    // cache an element for easy reference by other methods
    var usage = this.query('[data-hook=cpu-usage]')

    this._cpuChart = new Highcharts.Chart({
      chart: {
        type: 'column',
        renderTo: usage
      },
      title: {
        text: null
      },
      legend: {
        enabled: false
      },
      xAxis: {
        title: {
          text: null
        },
        labels: {
          enabled: false
        }
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
          }
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
  },
  bindings: {
    'model.uptimeFormatted': {
      type: 'text',
      hook: 'uptime'
    },
    'model.cpuSpeed': {
      type: 'text',
      hook: 'cpuSpeed'
    },
    'model.cpus': {
      type: function(el, cpus) {
        if(!cpus || !cpus.length) {
          return
        }

        var chart = HighCharts.charts[el.getAttribute('data-highcharts-chart')]

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
    }
  }
})
