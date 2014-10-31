var View = require('ampersand-view'),
  templates = require('../templates'),
  HighCharts = require('Highcharts')

module.exports = View.extend({
  template: templates.includes.cpu,
  render: function () {
    this.renderWithTemplate(this);

    // cache an element for easy reference by other methods
    var usage = this.query('[data-hook=cpu-usage]')

    new Highcharts.Chart({
      colors: [
        '#2A9FD6', '#0F0', '#FF5C5C', '#F5FF5C'
      ],
      chart: {
        type: 'column',
        renderTo: usage,
        spacing: [0, 0, 5, 0],
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor: '#444'
      },
      title: {
        text: null
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
  },
  bindings: {
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
