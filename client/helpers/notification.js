require('bootstrap-growl')

module.exports = function(options) {
  jQuery.growl('<h4>' + options.header + '</h4><strong>' +
    options.process + '</strong> on <strong>' +
    options.host + '</strong> ' + options.message, {
    type: options.type,
    offset: 15
  })
}
