var View = require('ampersand-view'),
  templates = require('../../templates')

module.exports = View.extend({
  template: templates.includes.process.overview.cpu,
  render: function () {
    this.renderWithTemplate(this);

    var fontStyle = {
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      fontSize: '14px',
      fontWeight: 'normal',
      color: '#BDBDBD'
    }
    var lineColour = '#444'

    var chart = new Highcharts.Chart({
      chart: {
        type: "areaspline",
        renderTo: this.query('[data-hook=cpu-usage]'),
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor: '#444',
        events: {
          load: function() {
            this.query('[data-hook=cpu-usage] .highcharts-container').style.width = '100%'
          }.bind(this)
        }
      },
      title: {
        text: null
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      xAxis: {
        type: "datetime",
        labels: {
          overflow: "justify",
          y: 25,
          style: fontStyle
        },
        gridLineColor: lineColour,
        gridLineWidth: 1
      },
      yAxis: {
        title: {
          text: null
        },
        labels: {
          format: '{value} %',
          style: fontStyle
        },
        min: 0,
        max: 100,
        gridLineColor: lineColour
      },
      tooltip: {
        // disabled until data interpolation is added
        enabled: false
        /*,
         formatter: function() {
         return prettysize(this.y)
         }*/
      },
      plotOptions: {
        areaspline: {
          lineWidth: 4,
          states: {
            hover: {
              lineWidth: 5
            }
          },
          // disabled markers until data interpolation is supported
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: false
              }
            }
          },
          fillOpacity: 0.1
        }
      },
      series: [{
        name: "CPU",
        data: this.model.cpu
      }]
    })
  },
  bindings: {
    'model.cpu': {
      type: function(el, cpu) {
        if(!cpu || !cpu.length) {
          return
        }

        var chart = Highcharts.charts[el.getAttribute('data-highcharts-chart')]

        if(!chart) {
          return
        }

        chart.series[0].setData(cpu)
      },
      selector: '[data-hook=cpu-usage]'
    }
  }
})
