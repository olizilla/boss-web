var View = require('ampersand-view'),
  templates = require('../../templates'),
  prettysize = require('prettysize')

module.exports = View.extend({
  template: templates.includes.process.memory,
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
      colors: [
        "rgba(245, 255, 92, 0.8)",
        "rgba(0, 255, 0, 0.8)",
        "rgba(42, 159, 214, 0.8)",
      ],
      chart: {
        type: "areaspline",
        renderTo: this.query('[data-hook=memory-usage]'),
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor: '#444',
        events: {
          load: function() {
            this.query('[data-hook=memory-usage] .highcharts-container').style.width = '100%'
          }.bind(this)
        }
      },
      title: {
        text: null
      },
      legend: {
        itemStyle: fontStyle,
        itemHiddenStyle: {
          color: '#444'
        },
        itemHoverStyle: {
          color: '#777'
        }
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
          formatter: function() {
            return prettysize(this.value)
          },
          style: fontStyle
        },
        //min: 0,
        //max: 100,
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
          name: "Heap used",
          data: this.model.heapUsed
        }, {
          name: "Heap size",
          data: this.model.heapTotal
        }, {
          name: "Resident set size",
          data: this.model.residentSize
        }
      ]
    })
  },
  bindings: {
    'model.residentSize': {
      type: function(el, residentSize) {
        if(!residentSize || !residentSize.length) {
          return
        }

        var chart = Highcharts.charts[el.getAttribute('data-highcharts-chart')]

        if(!chart) {
          return
        }

        chart.series[2].setData(residentSize)
      },
      selector: '[data-hook=memory-usage]'
    },
    'model.heapTotal': {
      type: function(el, heapTotal) {
        if(!heapTotal || !heapTotal.length) {
          return
        }

        var chart = Highcharts.charts[el.getAttribute('data-highcharts-chart')]

        if(!chart) {
          return
        }

        chart.series[1].setData(heapTotal)
      },
      selector: '[data-hook=memory-usage]'
    },
    'model.heapUsed': {
      type: function(el, heapUsed) {
        if(!heapUsed || !heapUsed.length) {
          return
        }

        var chart = Highcharts.charts[el.getAttribute('data-highcharts-chart')]

        if(!chart) {
          return
        }

        chart.series[0].setData(heapUsed)
      },
      selector: '[data-hook=memory-usage]'
    }
  }
})
