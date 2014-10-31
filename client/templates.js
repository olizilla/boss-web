var Handlebars=require("handlebars");module.exports.body=Handlebars.template({1:function(n,a,e,l){var s,t="function",i=a.helperMissing,o=this.escapeExpression;return'            <li class="host-name">'+o((s=null!=(s=a.name||(null!=n?n.name:n))?s:i,typeof s===t?s.call(n,{name:"name",hash:{},data:l}):s))+'</li>\n            <li class="selected"><a href="/host/'+o((s=null!=(s=a.name||(null!=n?n.name:n))?s:i,typeof s===t?s.call(n,{name:"name",hash:{},data:l}):s))+'/system"><i class="fa fa-area-chart"></i> System</a></li>\n            <li><a href="/host/'+o((s=null!=(s=a.name||(null!=n?n.name:n))?s:i,typeof s===t?s.call(n,{name:"name",hash:{},data:l}):s))+'/processes"><i class="fa fa-tasks"></i> Processes</a></li>\n'},compiler:[6,">= 2.0.0-beta.1"],main:function(n,a,e,l){var s,t='<body>\n  <div id="wrapper">\n    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">\n      <div class="navbar-header">\n        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse" data-hook="toggle-nav">\n          <span class="sr-only">Toggle navigation</span>\n          <span class="icon-bar"></span>\n          <span class="icon-bar"></span>\n          <span class="icon-bar"></span>\n        </button>\n        <span class="navbar-brand" href="/">Boss</span>\n      </div>\n\n      <div class="collapse navbar-collapse navbar-ex1-collapse">\n        <ul id="active" class="nav navbar-nav side-nav host-list">\n';return s=a.each.call(n,null!=n?n.hosts:n,{name:"each",hash:{},fn:this.program(1,l),inverse:this.noop,data:l}),null!=s&&(t+=s),t+'        </ul>\n        </ul>\n      </div>\n    </nav>\n\n    <div id="page-wrapper" data-hook="page-container">\n\n    </div>\n  </div>\n</body>\n'},useData:!0}),module.exports.head=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0"/>\n<meta name="apple-mobile-web-app-capable" content="yes"/>'},useData:!0}),module.exports.includes={},module.exports.includes.system=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(n){var a,e=this.lambda,l=this.escapeExpression;return'<div class="panel panel-primary">\n  <div class="panel-heading">\n    <h4 class="panel-title">Vital statistics</h4>\n  </div>\n  <div class="panel-body">\n    <ul class="information">\n      <li class="expand">\n        <h3>Hostname</h3>\n        <p>'+l(e(null!=(a=null!=n?n.model:n)?a.hostname:a,n))+"</p>\n      </li>\n      <li>\n        <h3>Type</h3>\n        <p>"+l(e(null!=(a=null!=n?n.model:n)?a.type:a,n))+"</p>\n      </li>\n      <li>\n        <h3>Platform</h3>\n        <p>"+l(e(null!=(a=null!=n?n.model:n)?a.platform:a,n))+"</p>\n      </li>\n      <li>\n        <h3>Arch</h3>\n        <p>"+l(e(null!=(a=null!=n?n.model:n)?a.arch:a,n))+"</p>\n      </li>\n      <li>\n        <h3>Release</h3>\n        <p>"+l(e(null!=(a=null!=n?n.model:n)?a.release:a,n))+'</p>\n      </li>\n      <li>\n        <h3>CPU(s)</h3>\n        <p data-hook="cpuSpeed">'+l(e(null!=(a=null!=(a=null!=n?n.model:n)?a.cpus:a)?a.length:a,n))+"x "+l(e(null!=(a=null!=n?n.model:n)?a.cpuSpeed:a,n))+"</p>\n      </li>\n      <li>\n        <h3>Boss</h3>\n        <p>"+l(e(null!=(a=null!=n?n.model:n)?a.version:a,n))+'</p>\n      </li>\n      <li>\n        <h3>Uptime</h3>\n        <p data-hook="uptime">'+l(e(null!=(a=null!=n?n.model:n)?a.uptimeFormatted:a,n))+"</p>\n      </li>\n    </ul>\n  </div>\n</div>"},useData:!0}),module.exports.includes.cpu=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<div class="panel panel-primary">\n  <div class="panel-heading">\n    <h4 class="panel-title">Resource usage</h4>\n  </div>\n  <div class="panel-body resource-data">\n    <div data-hook="cpu-usage" style="min-width: 340px; height: 150px; margin: 0 auto 20px auto; display: inline-block"></div>\n    <div data-hook="memory-usage" style="min-width: 340px; height: 160px; margin: 0 auto; display: inline-block"></div>\n  </div>\n</div>'},useData:!0}),module.exports.pages={},module.exports.pages.connecting=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(n){var a,e=this.lambda,l=this.escapeExpression;return'<section class="page host">\n  <div class="alert alert-info" role="alert">Connecting to '+l(e(null!=(a=null!=n?n.model:n)?a.name:a,n))+"...</div>\n</section>\n"},useData:!0}),module.exports.pages.error=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(n){var a,e=this.lambda,l=this.escapeExpression;return'<section class="page host">\n  <div class="alert alert-error" role="alert">\n    <strong>Could not connect to '+l(e(null!=(a=null!=n?n.model:n)?a.name:a,n))+"</strong> Sorry it didn't work out.\n  </div>\n</section>\n"},useData:!0}),module.exports.pages.host=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(n){var a,e=this.lambda,l=this.escapeExpression;return'<section class="page host">\n  <div class="row">\n    <div class="col-md-12">\n      <h1>'+l(e(null!=(a=null!=n?n.model:n)?a.name:a,n))+' <small>System information</small></h1>\n      <span data-hook="system-data"></span>\n      <span data-hook="cpu-data"></span>\n    </div>\n  </div>\n</section>\n'},useData:!0}),module.exports.pages.incompatible=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(n,a,e,l){var s,t="function",i=a.helperMissing,o=this.escapeExpression;return'<section class="page host">\n  <div class="alert alert-danger">\n    <p><strong>'+o((s=null!=(s=a.name||(null!=n?n.name:n))?s:i,typeof s===t?s.call(n,{name:"name",hash:{},data:l}):s))+" is running a version of boss incompatible with this version of boss-web</strong></p>\n    <p>It is running "+o((s=null!=(s=a.version||(null!=n?n.version:n))?s:i,typeof s===t?s.call(n,{name:"version",hash:{},data:l}):s))+" - please upgrade it to "+o((s=null!=(s=a.requiredVersion||(null!=n?n.requiredVersion:n))?s:i,typeof s===t?s.call(n,{name:"requiredVersion",hash:{},data:l}):s))+" or later</p>\n  </div>\n</section>\n"},useData:!0});