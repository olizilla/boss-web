var Handlebars=require("handlebars");module.exports.head=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0"/>\n<meta name="apple-mobile-web-app-capable" content="yes"/>\n<meta name="mobile-web-app-capable" content="yes"/>\n<script src="/socket.io/socket.io.js"></script>\n'},useData:!0}),module.exports.body=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(a){var e,s=this.lambda,n=this.escapeExpression;return'<body>\n  <div id="wrapper">\n    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">\n      <div class="navbar-header">\n        <button type="button" class="navbar-toggle" data-hook="toggle-nav">\n          <span class="sr-only">Toggle navigation</span>\n          <span class="icon-bar"></span>\n          <span class="icon-bar"></span>\n          <span class="icon-bar"></span>\n        </button>\n        <span class="navbar-brand" href="/">Boss</span>\n        <small>Hello '+n(s(null!=(e=null!=a?a.model:a)?e.name:e,a))+'</small>\n      </div>\n\n      <div class="collapse navbar-collapse" data-hook="nav-container">\n        <ul id="active" class="nav navbar-nav side-nav host-list" data-hook="host-list">\n        </ul>\n      </div>\n    </nav>\n    <div id="nav-shadow"></div>\n\n    <div id="page-wrapper" data-hook="page-container"></div>\n    <footer>\n      <small><a href="http://github.com/tableflip/boss-web" class="boss-web">boss-web</a> <span data-hook="version">5</span> by <a href="http://tableflip.io" class="tableflip">TABLEFLIP</a></small>\n      <small>A side effect of the JavaScript Adventure Club</small>\n    </footer>\n  </div>\n</body>\n'},useData:!0}),module.exports.includes={},module.exports.includes.host={},module.exports.includes.host.resources=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<div class="panel panel-primary">\n  <div class="panel-heading">\n    <h4 class="panel-title">Resource usage</h4>\n  </div>\n  <div class="panel-body resource-data">\n    <div data-hook="cpu-usage" style="min-width: 340px; height: 150px; margin: 0 auto 20px auto; display: inline-block"></div>\n    <div data-hook="memory-usage" style="min-width: 340px; height: 160px; margin: 0 auto; display: inline-block"></div>\n  </div>\n</div>'},useData:!0}),module.exports.includes.host.system=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(a){var e,s=this.lambda,n=this.escapeExpression;return'<div class="panel panel-primary system">\n  <div class="panel-heading">\n    <h4 class="panel-title">Vital statistics</h4>\n  </div>\n  <div class="panel-body">\n    <table class="table table-striped info system-details">\n      <thead>\n        <tr>\n          <th class="hostname">Hostname</th>\n          <th class="type">Type</th>\n          <th class="platform">Platform</th>\n          <th class="arch">Arch</th>\n          <th class="release">Release</th>\n          <th class="boss">Boss</th>\n          <th class="uptime">Uptime</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr>\n          <td class="hostname">'+n(s(null!=(e=null!=a?a.model:a)?e.hostname:e,a))+'</td>\n          <td class="type">'+n(s(null!=(e=null!=a?a.model:a)?e.type:e,a))+'</td>\n          <td class="platform">'+n(s(null!=(e=null!=a?a.model:a)?e.platform:e,a))+'</td>\n          <td class="arch">'+n(s(null!=(e=null!=a?a.model:a)?e.arch:e,a))+'</td>\n          <td class="release">'+n(s(null!=(e=null!=a?a.model:a)?e.release:e,a))+'</td>\n          <td class="boss">'+n(s(null!=(e=null!=a?a.model:a)?e.version:e,a))+'</td>\n          <td class="uptime" data-hook="uptime">'+n(s(null!=(e=null!=a?a.model:a)?e.uptimeFormatted:e,a))+"</td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</div>"},useData:!0}),module.exports.includes.hostlist={},module.exports.includes.hostlist.host=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(a){var e,s=this.lambda,n=this.escapeExpression;return'<li class="host-name">\n  <span>'+n(s(null!=(e=null!=a?a.model:a)?e.name:e,a))+'</span>\n  <ul>\n    <li><a href="/host/'+n(s(null!=(e=null!=a?a.model:a)?e.name:e,a))+'/system"><i class="fa fa-area-chart"></i> System</a></li>\n    <li><a href="/host/'+n(s(null!=(e=null!=a?a.model:a)?e.name:e,a))+'/processes"><i class="fa fa-tasks"></i> Processes</a></li>\n  </ul>\n</li>\n'},useData:!0}),module.exports.includes.process={},module.exports.includes.process.cpu=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<div class="panel panel-primary cpu">\n  <div class="panel-heading">\n    <h4 class="panel-title">CPU usage</h4>\n  </div>\n  <div class="panel-body">\n    <div data-hook="cpu-usage" style="width: 100%; height: 150px; margin: auto"></div>\n  </div>\n</div>\n'},useData:!0}),module.exports.includes.process.details=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(a){var e,s=this.lambda,n=this.escapeExpression;return'<div class="panel panel-primary details">\n  <div class="panel-heading">\n    <h4 class="panel-title">Vital statistics</h4>\n  </div>\n  <div class="panel-body">\n    <p><span data-hook="script">'+n(s(null!=(e=null!=a?a.model:a)?e.script:e,a))+'</span> has been running for <span data-hook="uptime">'+n(s(null!=(e=null!=a?a.model:a)?e.uptimeFormatted:e,a))+'</span> with <span data-hook="restarts">'+n(s(null!=(e=null!=a?a.model:a)?e.restarts:e,a))+'</span> restart(s).</p>\n    <p>The current pid is <span data-hook="pid">'+n(s(null!=(e=null!=a?a.model:a)?e.pid:e,a))+'</span> and it\'s running as <span data-hook="user">'+n(s(null!=(e=null!=a?a.model:a)?e.user:e,a))+'</span>:<span data-hook="group">'+n(s(null!=(e=null!=a?a.model:a)?e.group:e,a))+'</span>.</p>\n    <button type="button" class="btn btn-default btn-xs process-gc"><i class="fa fa-trash"></i> Garbage collect</button>\n    <button type="button" class="btn btn-default btn-xs process-heap"><i class="fa fa-h-square"></i> Heap dump</button>\n    <button type="button" class="btn btn-default btn-xs process-debug"><i class="fa fa-bug"></i> Debug</button>\n    <button type="button" class="btn btn-default btn-xs process-restart"><i class="fa fa-refresh"></i> Restart</button>\n    <button type="button" class="btn btn-default btn-xs process-stop"><i class="fa fa-stop"></i> Stop</button>\n  </div>\n</div>\n'},useData:!0}),module.exports.includes.process.loglist={},module.exports.includes.process.loglist.entry=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(a){var e,s=this.lambda,n=this.escapeExpression,t='<li class="'+n(s(null!=(e=null!=a?a.model:a)?e.type:e,a))+' visible">';return e=s(null!=(e=null!=a?a.model:a)?e.messageFormatted:e,a),null!=e&&(t+=e),t+"</li>\n"},useData:!0}),module.exports.includes.process.loglist.list=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<div class="panel panel-primary logs">\n  <div class="panel-heading panel-heading-logs">\n    <button type="button" class="btn btn-default btn-xs logs-pin active"><i class="fa fa-paperclip"></i> Pin</button>\n    <button type="button" class="btn btn-default btn-xs logs-clear"><i class="fa fa-trash"></i> Clear</button>\n    <h4 class="panel-title">Logs</h4>\n  </div>\n  <div class="panel-body panel-logs">\n    <ul class="logs" data-hook="logs"></ul>\n  </div>\n</div>\n'},useData:!0}),module.exports.includes.process.memory=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<div class="panel panel-primary memory">\n  <div class="panel-heading">\n    <h4 class="panel-title">Memory usage</h4>\n  </div>\n  <div class="panel-body">\n    <div data-hook="memory-usage" style="width: 100%; height: 200px; margin: auto"></div>\n  </div>\n</div>\n'},useData:!0}),module.exports.includes.processlist={},module.exports.includes.processlist.empty=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return"\n<p>There are no running processes</p>\n"},useData:!0}),module.exports.includes.processlist.list=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<table class="table table-striped table-hover info process-list">\n  <thead>\n    <tr>\n      <th class="title">Title</th>\n      <th class="pid">Pid</th>\n      <th class="uptime">Uptime</th>\n      <th class="restarts">Restarts</th>\n      <th class="memory">Memory</th>\n      <th class="cpu">CPU</th>\n    </tr>\n  </thead>\n  <tbody data-hook="processes"></tbody>\n</table>\n'},useData:!0}),module.exports.includes.processlist.process=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(a){var e,s=this.lambda,n=this.escapeExpression;return'<tr>\n  <td class="title">'+n(s(null!=(e=null!=a?a.model:a)?e.title:e,a))+"<br /><small>"+n(s(null!=(e=null!=a?a.model:a)?e.script:e,a))+'</small></td>\n  <td class="pid" data-hook="pid">'+n(s(null!=(e=null!=a?a.model:a)?e.pid:e,a))+'</td>\n  <td class="uptime" data-hook="uptime">'+n(s(null!=(e=null!=a?a.model:a)?e.uptimeFormatted:e,a))+'</td>\n  <td class="restarts" data-hook="restarts">'+n(s(null!=(e=null!=a?a.model:a)?e.restarts:e,a))+'</td>\n  <td class="memory" data-hook="memory">'+n(s(null!=(e=null!=a?a.model:a)?e.memoryFormatted:e,a))+'</td>\n  <td class="cpu" data-hook="cpu">'+n(s(null!=(e=null!=a?a.model:a)?e.cpuFormatted:e,a))+"</td>\n</tr>\n"},useData:!0}),module.exports.pages={},module.exports.pages.badsignature=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(a){var e,s=this.lambda,n=this.escapeExpression;return'<section class="page badsignature">\n  <div class="alert alert-danger" role="alert">\n    <strong>Could not connect to '+n(s(null!=(e=null!=a?a.model:a)?e.name:e,a))+"</strong> Message signature was invalid.\n  </div>\n</section>\n"},useData:!0}),module.exports.pages.connecting=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(a){var e,s=this.lambda,n=this.escapeExpression;return'<section class="page connecting">\n  <div class="alert alert-info" role="alert">Connecting to '+n(s(null!=(e=null!=a?a.model:a)?e.name:e,a))+"...</div>\n</section>\n"},useData:!0}),module.exports.pages.error=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(a){var e,s=this.lambda,n=this.escapeExpression;return'<section class="page error">\n  <div class="alert alert-danger" role="alert">\n    <strong>Could not connect to '+n(s(null!=(e=null!=a?a.model:a)?e.name:e,a))+"</strong> Sorry it didn't work out.\n  </div>\n</section>\n"},useData:!0}),module.exports.pages.incompatible=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(a,e,s,n){var t,l="function",o=e.helperMissing,i=this.escapeExpression;return'<section class="page incompatible">\n  <div class="alert alert-danger">\n    <p><strong>'+i((t=null!=(t=e.name||(null!=a?a.name:a))?t:o,typeof t===l?t.call(a,{name:"name",hash:{},data:n}):t))+" is running a version of boss incompatible with this version of boss-web</strong></p>\n    <p>It is running "+i((t=null!=(t=e.version||(null!=a?a.version:a))?t:o,typeof t===l?t.call(a,{name:"version",hash:{},data:n}):t))+" - please upgrade it to "+i((t=null!=(t=e.requiredVersion||(null!=a?a.requiredVersion:a))?t:o,typeof t===l?t.call(a,{name:"requiredVersion",hash:{},data:n}):t))+" or later</p>\n  </div>\n</section>\n"},useData:!0}),module.exports.pages.host=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(a){var e,s=this.lambda,n=this.escapeExpression;return'<section class="page host">\n  <div class="row">\n    <div class="col-md-12">\n      <h1>'+n(s(null!=(e=null!=a?a.model:a)?e.name:e,a))+'</h1>\n      <span data-hook="system-data"></span>\n      <span data-hook="resource-data"></span>\n    </div>\n  </div>\n</section>\n'},useData:!0}),module.exports.pages.loadinghosts=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<section class="page loadinghosts">\n  <div class="alert alert-info" role="alert">Waiting for hosts...</div>\n</section>\n'},useData:!0}),module.exports.pages.nohosts=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<section class="page nohosts">\n  <div class="alert alert-warning" role="alert">\n    <strong>No hosts to show</strong> Please configure some hosts in your boss-web config file.\n  </div>\n</section>\n'},useData:!0}),module.exports.pages.process=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(a){var e,s=this.lambda,n=this.escapeExpression;return'<section class="page process">\n  <div class="row">\n    <div class="col-md-12">\n      <h1>'+n(s(null!=(e=null!=a?a.model:a)?e.title:e,a))+'</h1>\n      <span data-hook="details"></span>\n      <span data-hook="memory"></span>\n      <span data-hook="cpu"></span>\n      <span data-hook="logs"></span>\n    </div>\n  </div>\n</section>\n'},useData:!0}),module.exports.pages.processes=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(a){var e,s=this.lambda,n=this.escapeExpression;return'<section class="page processes">\n  <div class="row">\n    <div class="col-md-12">\n      <h1>'+n(s(null!=(e=null!=a?a.model:a)?e.name:e,a))+'</h1>\n      <div class="panel panel-primary">\n        <div class="panel-heading">\n          <h4 class="panel-title">Processes</h4>\n        </div>\n        <div class="panel-body" data-hook="view"></div>\n      </div>\n    </div>\n  </div>\n</section>\n'},useData:!0}),module.exports.pages.timeout=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(a){var e,s=this.lambda,n=this.escapeExpression;return'<section class="page timeout">\n  <div class="alert alert-warning" role="alert">\n    <strong>Could not connect to '+n(s(null!=(e=null!=a?a.model:a)?e.name:e,a))+"</strong> Connection timed out.\n  </div>\n</section>\n"},useData:!0});