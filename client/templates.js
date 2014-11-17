var Handlebars=require("handlebars");module.exports.head=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0"/>\n<meta name="apple-mobile-web-app-capable" content="yes"/>\n<meta name="mobile-web-app-capable" content="yes"/>\n<script src="/socket.io/socket.io.js"></script>\n'},useData:!0}),module.exports.body=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e){var a,n=this.lambda,s=this.escapeExpression;return'<body>\n  <div id="wrapper">\n    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">\n      <div class="navbar-header">\n        <button type="button" class="navbar-toggle" data-hook="toggle-nav">\n          <span class="sr-only">Toggle navigation</span>\n          <span class="icon-bar"></span>\n          <span class="icon-bar"></span>\n          <span class="icon-bar"></span>\n        </button>\n        <span class="navbar-brand" href="/">Boss</span>\n        <small>Hello '+s(n(null!=(a=null!=e?e.model:e)?a.name:a,e))+'</small>\n      </div>\n\n      <div class="collapse navbar-collapse" data-hook="nav-container"></div>\n    </nav>\n    <div id="nav-shadow"></div>\n\n    <div id="page-wrapper" data-hook="page-container"></div>\n    <footer>\n      <small><a href="http://github.com/tableflip/boss-web" class="boss-web">boss-web</a> <span data-hook="version">5</span> by <a href="http://tableflip.io" class="tableflip">TABLEFLIP</a></small>\n      <small>A side effect of the JavaScript Adventure Club</small>\n    </footer>\n  </div>\n</body>\n'},useData:!0}),module.exports.includes={},module.exports.includes.host={},module.exports.includes.host.connectiontimedout=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e){var a,n=this.lambda,s=this.escapeExpression;return'<div class="alert alert-danger" role="alert">\n  <h4>Could not connect to '+s(n(null!=(a=null!=e?e.model:e)?a.name:a,e))+"</h4>\n  <p>Connection timed out, will attempt to reconnect shortly.</p>\n</div>\n"},useData:!0}),module.exports.includes.host.connecting=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e){var a,n=this.lambda,s=this.escapeExpression;return'<div class="alert alert-info" role="alert">Connecting to '+s(n(null!=(a=null!=e?e.model:e)?a.name:a,e))+"...</div>\n"},useData:!0}),module.exports.includes.host.overview=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<span>\n  <span data-hook="system-data"></span>\n  <span data-hook="resource-data"></span>\n</span>\n'},useData:!0}),module.exports.includes.hostlist={},module.exports.includes.hostlist.host=Handlebars.template({1:function(e,a,n,s,t){var l,o,i=this.lambda,r=this.escapeExpression,d="function",p=a.helperMissing;return'      <li class="process"><a href="/host/'+r(i(null!=(l=null!=t[1]?t[1].model:t[1])?l.name:l,e))+"/process/"+r((o=null!=(o=a.id||(null!=e?e.id:e))?o:p,typeof o===d?o.call(e,{name:"id",hash:{},data:s}):o))+'"><i class="fa fa-code"></i> '+r((o=null!=(o=a.name||(null!=e?e.name:e))?o:p,typeof o===d?o.call(e,{name:"name",hash:{},data:s}):o))+'</a></li>\n      <li class="processLogs"><a href="/host/'+r(i(null!=(l=null!=t[1]?t[1].model:t[1])?l.name:l,e))+"/process/"+r((o=null!=(o=a.id||(null!=e?e.id:e))?o:p,typeof o===d?o.call(e,{name:"id",hash:{},data:s}):o))+'/logs"><i class="fa fa-book"></i> Logs</a></li>\n      <li class="processExceptions"><a href="/host/'+r(i(null!=(l=null!=t[1]?t[1].model:t[1])?l.name:l,e))+"/process/"+r((o=null!=(o=a.id||(null!=e?e.id:e))?o:p,typeof o===d?o.call(e,{name:"id",hash:{},data:s}):o))+'/exceptions"><i class="fa fa-exclamation-triangle"></i> Exceptions</a></li>\n'},compiler:[6,">= 2.0.0-beta.1"],main:function(e,a,n,s,t){var l,o=this.lambda,i=this.escapeExpression,r='<li class="host-name">\n  <ul>\n    <li><a href="/host/'+i(o(null!=(l=null!=e?e.model:e)?l.name:l,e))+'"><i class="fa fa-desktop"></i> '+i(o(null!=(l=null!=e?e.model:e)?l.name:l,e))+'</a></li>\n    <li class="processes"><a href="/host/'+i(o(null!=(l=null!=e?e.model:e)?l.name:l,e))+'/processes"><i class="fa fa-tasks"></i> Processes</a></li>\n\n';return l=a.each.call(e,null!=(l=null!=(l=null!=e?e.model:e)?l.processes:l)?l.models:l,{name:"each",hash:{},fn:this.program(1,s,t),inverse:this.noop,data:s}),null!=l&&(r+=l),r+"  </ul>\n</li>\n"},useData:!0,useDepths:!0}),module.exports.includes.host.resources=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<div class="panel panel-primary">\n  <div class="panel-heading">\n    <h4 class="panel-title">Resource usage</h4>\n  </div>\n  <div class="panel-body resource-data">\n    <div data-hook="cpu-usage" style="min-width: 340px; height: 150px; margin: 0 auto 20px auto; display: inline-block"></div>\n    <div data-hook="memory-usage" style="min-width: 340px; height: 160px; margin: 0 auto; display: inline-block"></div>\n  </div>\n</div>'},useData:!0}),module.exports.includes.host.system=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e){var a,n=this.lambda,s=this.escapeExpression;return'<div class="panel panel-primary system">\n  <div class="panel-heading">\n    <h4 class="panel-title">Vital statistics</h4>\n  </div>\n  <div class="panel-body">\n    <table class="table table-striped info system-details">\n      <thead>\n        <tr>\n          <th class="hostname">Hostname</th>\n          <th class="type">Type</th>\n          <th class="platform">Platform</th>\n          <th class="arch">Arch</th>\n          <th class="release">Release</th>\n          <th class="boss">Boss</th>\n          <th class="uptime">Uptime</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr>\n          <td class="hostname">'+s(n(null!=(a=null!=e?e.model:e)?a.hostname:a,e))+'</td>\n          <td class="type">'+s(n(null!=(a=null!=e?e.model:e)?a.type:a,e))+'</td>\n          <td class="platform">'+s(n(null!=(a=null!=e?e.model:e)?a.platform:a,e))+'</td>\n          <td class="arch">'+s(n(null!=(a=null!=e?e.model:e)?a.arch:a,e))+'</td>\n          <td class="release">'+s(n(null!=(a=null!=e?e.model:e)?a.release:a,e))+'</td>\n          <td class="boss">'+s(n(null!=(a=null!=e?e.model:e)?a.version:a,e))+'</td>\n          <td class="uptime" data-hook="uptime">'+s(n(null!=(a=null!=e?e.model:e)?a.uptimeFormatted:a,e))+"</td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</div>"},useData:!0}),module.exports.includes.hostlist.list=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<ul id="active" class="nav navbar-nav side-nav host-list" data-hook="host-list">\n</ul>'},useData:!0}),module.exports.includes.process={},module.exports.includes.process.exceptionlist={},module.exports.includes.process.exceptionlist.empty=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<div class="panel panel-primary exceptions">\n  <div class="panel-heading panel-heading-exceptions">\n    <h4 class="panel-title">Exceptions</h4>\n  </div>\n  <div class="panel-body panel-exceptions">\n    <p>No exceptions have been thrown</p>\n  </div>\n</div>\n\n'},useData:!0}),module.exports.includes.process.exceptionlist.list=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<div class="panel panel-primary exceptions">\n  <div class="panel-heading panel-heading-exceptions">\n    <h4 class="panel-title">Exceptions</h4>\n  </div>\n  <div class="panel-body panel-exceptions">\n    <table class="exceptions" data-hook="exceptions"></table>\n  </div>\n</div>\n'},useData:!0}),module.exports.includes.process.exceptionlist.entry=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return"<tr>\n  <td>Date</td>\n  <td>Message</td>\n  <td>Details</td>\n</tr>\n"},useData:!0}),module.exports.includes.process.loglist={},module.exports.includes.process.loglist.entry=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e){var a,n=this.lambda,s=this.escapeExpression,t='<li class="'+s(n(null!=(a=null!=e?e.model:e)?a.type:a,e))+' visible">';return a=n(null!=(a=null!=e?e.model:e)?a.messageFormatted:a,e),null!=a&&(t+=a),t+"</li>\n"},useData:!0}),module.exports.includes.process.exceptions=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<span data-hook="exceptions"></span>\n'},useData:!0}),module.exports.includes.process.logs=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<span data-hook="logs"></span>\n'},useData:!0}),module.exports.includes.process.loglist.list=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<div class="panel panel-primary logs">\n  <div class="panel-heading panel-heading-logs">\n    <button type="button" class="btn btn-default btn-xs logs-pin active"><i class="fa fa-paperclip"></i> Pin</button>\n    <button type="button" class="btn btn-default btn-xs logs-clear"><i class="fa fa-trash"></i> Clear</button>\n    <h4 class="panel-title">Logs</h4>\n  </div>\n  <div class="panel-body panel-logs">\n    <ul class="logs" data-hook="logs"></ul>\n  </div>\n</div>\n'},useData:!0}),module.exports.includes.process.overview={},module.exports.includes.process.overview.cpu=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<div class="panel panel-primary cpu">\n  <div class="panel-heading">\n    <h4 class="panel-title">CPU usage</h4>\n  </div>\n  <div class="panel-body">\n    <div data-hook="cpu-usage" style="width: 100%; height: 150px; margin: auto"></div>\n  </div>\n</div>\n'},useData:!0}),module.exports.includes.process.overview.details=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e){var a,n=this.lambda,s=this.escapeExpression;return'<div class="panel panel-primary details">\n  <div class="panel-heading">\n    <h4 class="panel-title">Vital statistics</h4>\n  </div>\n  <div class="panel-body">\n    <p><span data-hook="script">'+s(n(null!=(a=null!=e?e.model:e)?a.script:a,e))+'</span> has been running for <span data-hook="uptime">'+s(n(null!=(a=null!=e?e.model:e)?a.uptimeFormatted:a,e))+'</span> with <span data-hook="restarts">'+s(n(null!=(a=null!=e?e.model:e)?a.restarts:a,e))+'</span> restart(s).</p>\n    <p>The current pid is <span data-hook="pid">'+s(n(null!=(a=null!=e?e.model:e)?a.pid:a,e))+'</span> and it\'s running as <span data-hook="user">'+s(n(null!=(a=null!=e?e.model:e)?a.user:a,e))+'</span>:<span data-hook="group">'+s(n(null!=(a=null!=e?e.model:e)?a.group:a,e))+'</span>.</p>\n    <button type="button" class="btn btn-default btn-xs process-gc" data-hook="gcbutton"><i class="fa fa-trash"></i> Garbage collect</button>\n    <button type="button" class="btn btn-default btn-xs process-heap" data-hook="heapdumpbutton"><i class="fa fa-h-square"></i> Heap dump</button>\n    <button type="button" class="btn btn-default btn-xs process-debug"><i class="fa fa-bug"></i> Debug</button>\n    <button type="button" class="btn btn-default btn-xs process-restart" data-hook="restartbutton"><i class="fa fa-refresh"></i> Restart</button>\n    <button type="button" class="btn btn-default btn-xs process-stop" data-hook="stopbutton"><i class="fa fa-stop"></i> Stop</button>\n  </div>\n</div>\n'},useData:!0}),module.exports.includes.process.overview.index=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<span>\n  <span data-hook="details"></span>\n  <span data-hook="memory"></span>\n  <span data-hook="cpu"></span>\n</span>\n'},useData:!0}),module.exports.includes.process.overview.memory=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<div class="panel panel-primary memory">\n  <div class="panel-heading">\n    <h4 class="panel-title">Memory usage</h4>\n  </div>\n  <div class="panel-body">\n    <div data-hook="memory-usage" style="width: 100%; height: 200px; margin: auto"></div>\n  </div>\n</div>\n'},useData:!0}),module.exports.includes.processlist={},module.exports.includes.processlist.empty=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return"\n<p>There are no running processes</p>\n"},useData:!0}),module.exports.includes.processlist.list=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<div class="panel panel-primary processes">\n  <div class="panel-heading">\n    <h4 class="panel-title">Processes</h4>\n  </div>\n  <div class="panel-body">\n    <table class="table table-striped table-hover info process-list">\n      <thead>\n      <tr>\n        <th class="title">Title</th>\n        <th class="pid">Pid</th>\n        <th class="uptime">Uptime</th>\n        <th class="restarts">Restarts</th>\n        <th class="memory">Memory</th>\n        <th class="cpu">CPU</th>\n      </tr>\n      </thead>\n      <tbody data-hook="processes"></tbody>\n    </table>\n  </div>\n</div>\n'},useData:!0}),module.exports.includes.processlist.process=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e){var a,n=this.lambda,s=this.escapeExpression;return'<tr>\n  <td class="title" data-hook="name">'+s(n(null!=(a=null!=e?e.model:e)?a.name:a,e))+"<br /><small>"+s(n(null!=(a=null!=e?e.model:e)?a.script:a,e))+'</small></td>\n  <td class="pid" data-hook="pid">'+s(n(null!=(a=null!=e?e.model:e)?a.pid:a,e))+'</td>\n  <td class="uptime" data-hook="uptime">'+s(n(null!=(a=null!=e?e.model:e)?a.uptimeFormatted:a,e))+'</td>\n  <td class="restarts" data-hook="restarts">'+s(n(null!=(a=null!=e?e.model:e)?a.restarts:a,e))+'</td>\n  <td class="memory" data-hook="memory">'+s(n(null!=(a=null!=e?e.model:e)?a.memoryFormatted:a,e))+'</td>\n  <td class="cpu" data-hook="cpu">'+s(n(null!=(a=null!=e?e.model:e)?a.cpuFormatted:a,e))+"</td>\n</tr>\n"},useData:!0}),module.exports.pages={},module.exports.pages.badsignature=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e){var a,n=this.lambda,s=this.escapeExpression;return'<section class="page badsignature">\n  <div class="alert alert-danger" role="alert">\n    <strong>Could not connect to '+s(n(null!=(a=null!=e?e.model:e)?a.name:a,e))+"</strong> Message signature was invalid.\n  </div>\n</section>\n"},useData:!0}),module.exports.pages.connecting=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e){var a,n=this.lambda,s=this.escapeExpression;return'<section class="page connecting">\n  <div class="alert alert-info" role="alert">Connecting to '+s(n(null!=(a=null!=e?e.model:e)?a.name:a,e))+"...</div>\n</section>\n"},useData:!0}),module.exports.pages.host=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e){var a,n=this.lambda,s=this.escapeExpression;return'<section class="page host">\n  <div class="row">\n    <div class="col-md-12">\n      <h1>'+s(n(null!=(a=null!=e?e.model:e)?a.name:a,e))+'</h1>\n      <span data-hook="view"></span\n    </div>\n  </div>\n</section>\n'},useData:!0}),module.exports.pages.error=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e){var a,n=this.lambda,s=this.escapeExpression;return'<section class="page error">\n  <div class="alert alert-danger" role="alert">\n    <strong>Could not connect to '+s(n(null!=(a=null!=e?e.model:e)?a.name:a,e))+"</strong> Sorry it didn't work out.\n  </div>\n</section>\n"},useData:!0}),module.exports.pages.incompatible=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e,a,n,s){var t,l="function",o=a.helperMissing,i=this.escapeExpression;return'<section class="page incompatible">\n  <div class="alert alert-danger">\n    <p><strong>'+i((t=null!=(t=a.name||(null!=e?e.name:e))?t:o,typeof t===l?t.call(e,{name:"name",hash:{},data:s}):t))+" is running a version of boss incompatible with this version of boss-web</strong></p>\n    <p>It is running "+i((t=null!=(t=a.version||(null!=e?e.version:e))?t:o,typeof t===l?t.call(e,{name:"version",hash:{},data:s}):t))+" - please upgrade it to "+i((t=null!=(t=a.requiredVersion||(null!=e?e.requiredVersion:e))?t:o,typeof t===l?t.call(e,{name:"requiredVersion",hash:{},data:s}):t))+" or later</p>\n  </div>\n</section>\n"},useData:!0}),module.exports.pages.loadinghosts=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<section class="page loadinghosts">\n  <div class="alert alert-info" role="alert">Waiting for hosts...</div>\n</section>\n'},useData:!0}),module.exports.pages.nohosts=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<section class="page nohosts">\n  <div class="alert alert-warning" role="alert">\n    <strong>No hosts to show</strong> Please configure some hosts in your boss-web config file.\n  </div>\n</section>\n'},useData:!0}),module.exports.pages.process=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e){var a,n=this.lambda,s=this.escapeExpression;return'<section class="page process">\n  <div class="row">\n    <div class="col-md-12">\n      <h1>'+s(n(null!=(a=null!=e?e.model:e)?a.name:a,e))+'</h1>\n      <span data-hook="view"></span>\n    </div>\n  </div>\n</section>\n'},useData:!0}),module.exports.pages.timeout=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e){var a,n=this.lambda,s=this.escapeExpression;return'<section class="page timeout">\n  <div class="alert alert-warning" role="alert">\n    <strong>Could not connect to '+s(n(null!=(a=null!=e?e.model:e)?a.name:a,e))+"</strong> Connection timed out.\n  </div>\n</section>\n"},useData:!0}),module.exports.pages.processes=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e){var a,n=this.lambda,s=this.escapeExpression;return'<section class="page processes">\n  <div class="row">\n    <div class="col-md-12">\n      <h1>'+s(n(null!=(a=null!=e?e.model:e)?a.name:a,e))+'</h1>\n      <div class="panel panel-primary">\n        <div class="panel-heading">\n          <h4 class="panel-title">Processes</h4>\n        </div>\n        <div class="panel-body" data-hook="view"></div>\n      </div>\n    </div>\n  </div>\n</section>\n'},useData:!0});