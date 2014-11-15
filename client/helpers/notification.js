require('bootstrap-growl')

module.exports = function(options) {
  jQuery.growl('<h4>' + options.header + '</h4>' +
    (options.process && options.host ? '<strong>' +  options.process + '</strong> on <strong>' + options.host + '</strong> ' : '') +
    options.message, {
    type: options.type ? options.type : 'info',
    offset: 15
  })
}
