var Handlebars=require("handlebars");module.exports.body=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<body>\n  <div id="wrapper">\n    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">\n      <div class="navbar-header">\n        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse" data-hook="toggle-nav">\n          <span class="sr-only">Toggle navigation</span>\n          <span class="icon-bar"></span>\n          <span class="icon-bar"></span>\n          <span class="icon-bar"></span>\n        </button>\n        <span class="navbar-brand" href="/">Boss</span>\n      </div>\n\n      <div class="collapse navbar-collapse navbar-ex1-collapse" data-hook="host-list"></div>\n    </nav>\n\n    <div id="page-wrapper" data-hook="page-container"></div>\n  </div>\n</body>\n'},useData:!0}),module.exports.head=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0"/>\n<meta name="apple-mobile-web-app-capable" content="yes"/>'},useData:!0}),module.exports.includes={},module.exports.includes.hostlist=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(n){var e,a=this.lambda,l=this.escapeExpression;return'<ul id="active" class="nav navbar-nav side-nav host-list">\n  <li class="host-name">'+l(a(null!=(e=null!=n?n.model:n)?e.name:e,n))+'</li>\n  <li><a href="/host/'+l(a(null!=(e=null!=n?n.model:n)?e.name:e,n))+'/system"><i class="fa fa-area-chart"></i> System</a></li>\n  <li><a href="/host/'+l(a(null!=(e=null!=n?n.model:n)?e.name:e,n))+'/processes"><i class="fa fa-tasks"></i> Processes</a></li>\n</ul>\n\n'},useData:!0}),module.exports.includes.resources=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<div class="panel panel-primary">\n  <div class="panel-heading">\n    <h4 class="panel-title">Resource usage</h4>\n  </div>\n  <div class="panel-body resource-data">\n    <div data-hook="cpu-usage" style="min-width: 340px; height: 150px; margin: 0 auto 20px auto; display: inline-block"></div>\n    <div data-hook="memory-usage" style="min-width: 340px; height: 160px; margin: 0 auto; display: inline-block"></div>\n  </div>\n</div>'},useData:!0}),module.exports.includes.system=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(n){var e,a=this.lambda,l=this.escapeExpression;return'<div class="panel panel-primary">\n  <div class="panel-heading">\n    <h4 class="panel-title">Vital statistics</h4>\n  </div>\n  <div class="panel-body">\n    <ul class="information">\n      <li class="expand">\n        <h3>Hostname</h3>\n        <p>'+l(a(null!=(e=null!=n?n.model:n)?e.hostname:e,n))+"</p>\n      </li>\n      <li>\n        <h3>Type</h3>\n        <p>"+l(a(null!=(e=null!=n?n.model:n)?e.type:e,n))+"</p>\n      </li>\n      <li>\n        <h3>Platform</h3>\n        <p>"+l(a(null!=(e=null!=n?n.model:n)?e.platform:e,n))+"</p>\n      </li>\n      <li>\n        <h3>Arch</h3>\n        <p>"+l(a(null!=(e=null!=n?n.model:n)?e.arch:e,n))+"</p>\n      </li>\n      <li>\n        <h3>Release</h3>\n        <p>"+l(a(null!=(e=null!=n?n.model:n)?e.release:e,n))+"</p>\n      </li>\n      <li>\n        <h3>Boss</h3>\n        <p>"+l(a(null!=(e=null!=n?n.model:n)?e.version:e,n))+'</p>\n      </li>\n      <li>\n        <h3>Uptime</h3>\n        <p data-hook="uptime">'+l(a(null!=(e=null!=n?n.model:n)?e.uptimeFormatted:e,n))+"</p>\n      </li>\n    </ul>\n  </div>\n</div>"},useData:!0}),module.exports.pages={},module.exports.pages.error=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(n){var e,a=this.lambda,l=this.escapeExpression;return'<section class="page host">\n  <div class="alert alert-danger" role="alert">\n    <strong>Could not connect to '+l(a(null!=(e=null!=n?n.model:n)?e.name:e,n))+"</strong> Sorry it didn't work out.\n  </div>\n</section>\n"},useData:!0}),module.exports.pages.connecting=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(n){var e,a=this.lambda,l=this.escapeExpression;return'<section class="page host">\n  <div class="alert alert-info" role="alert">Connecting to '+l(a(null!=(e=null!=n?n.model:n)?e.name:e,n))+"...</div>\n</section>\n"},useData:!0}),module.exports.pages.incompatible=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(n,e,a,l){var s,t="function",i=e.helperMissing,o=this.escapeExpression;return'<section class="page host">\n  <div class="alert alert-danger">\n    <p><strong>'+o((s=null!=(s=e.name||(null!=n?n.name:n))?s:i,typeof s===t?s.call(n,{name:"name",hash:{},data:l}):s))+" is running a version of boss incompatible with this version of boss-web</strong></p>\n    <p>It is running "+o((s=null!=(s=e.version||(null!=n?n.version:n))?s:i,typeof s===t?s.call(n,{name:"version",hash:{},data:l}):s))+" - please upgrade it to "+o((s=null!=(s=e.requiredVersion||(null!=n?n.requiredVersion:n))?s:i,typeof s===t?s.call(n,{name:"requiredVersion",hash:{},data:l}):s))+" or later</p>\n  </div>\n</section>\n"},useData:!0}),module.exports.pages.nohosts=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<section class="page host">\n  <div class="alert alert-info" role="alert">\n    <strong>No hosts to show</strong> Please configure some hosts in your boss-web config file.\n  </div>\n</section>\n'},useData:!0}),module.exports.pages.processes=Handlebars.template({1:function(n,e,a,l){var s,t='            <ul class="information">\n';return s=e.each.call(n,null!=n?n.processes:n,{name:"each",hash:{},fn:this.program(2,l),inverse:this.noop,data:l}),null!=s&&(t+=s),t+"            </ul>\n"},2:function(n){var e,a=this.lambda,l=this.escapeExpression;return'                <li class="expand">\n                  <h3>Hostname</h3>\n                  <p>'+l(a(null!=(e=null!=n?n.model:n)?e.hostname:e,n))+"</p>\n                </li>\n                <li>\n                  <h3>Type</h3>\n                  <p>"+l(a(null!=(e=null!=n?n.model:n)?e.type:e,n))+"</p>\n                </li>\n                <li>\n                  <h3>Platform</h3>\n                  <p>"+l(a(null!=(e=null!=n?n.model:n)?e.platform:e,n))+"</p>\n                </li>\n                <li>\n                  <h3>Arch</h3>\n                  <p>"+l(a(null!=(e=null!=n?n.model:n)?e.arch:e,n))+"</p>\n                </li>\n                <li>\n                  <h3>Release</h3>\n                  <p>"+l(a(null!=(e=null!=n?n.model:n)?e.release:e,n))+'</p>\n                </li>\n                <li>\n                  <h3>CPU(s)</h3>\n                  <p data-hook="cpuSpeed">'+l(a(null!=(e=null!=(e=null!=n?n.model:n)?e.cpus:e)?e.length:e,n))+"x "+l(a(null!=(e=null!=n?n.model:n)?e.cpuSpeed:e,n))+"</p>\n                </li>\n                <li>\n                  <h3>Boss</h3>\n                  <p>"+l(a(null!=(e=null!=n?n.model:n)?e.version:e,n))+'</p>\n                </li>\n                <li>\n                  <h3>Uptime</h3>\n                  <p data-hook="uptime">'+l(a(null!=(e=null!=n?n.model:n)?e.uptimeFormatted:e,n))+"</p>\n                </li>\n"},4:function(){return"            <p>There are no processes running.</p>\n"},compiler:[6,">= 2.0.0-beta.1"],main:function(n,e,a,l){var s,t=this.lambda,i=this.escapeExpression,o='<section class="page host">\n  <div class="row">\n    <div class="col-md-12">\n      <h1>'+i(t(null!=(s=null!=n?n.model:n)?s.name:s,n))+' <small>Process information</small></h1>\n      <div class="panel panel-primary">\n        <div class="panel-heading">\n          <h4 class="panel-title">Processes</h4>\n        </div>\n        <div class="panel-body">\n';return s=e["if"].call(n,null!=(s=null!=n?n.processes:n)?s.length:s,{name:"if",hash:{},fn:this.program(1,l),inverse:this.program(4,l),data:l}),null!=s&&(o+=s),o+"        </div>\n      </div>\n    </div>\n  </div>\n</section>\n"},useData:!0}),module.exports.pages.system=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(n){var e,a=this.lambda,l=this.escapeExpression;return'<section class="page host">\n  <div class="row">\n    <div class="col-md-12">\n      <h1>'+l(a(null!=(e=null!=n?n.model:n)?e.name:e,n))+' <small>System information</small></h1>\n      <span data-hook="system-data"></span>\n      <span data-hook="resource-data"></span>\n    </div>\n  </div>\n</section>\n'},useData:!0}),module.exports.pages.timeout=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(n){var e,a=this.lambda,l=this.escapeExpression;return'<section class="page host">\n  <div class="alert alert-warning" role="alert">\n    <strong>Could not connect to '+l(a(null!=(e=null!=n?n.model:n)?e.name:e,n))+"</strong> Connection timed out.\n  </div>\n</section>\n"},useData:!0});