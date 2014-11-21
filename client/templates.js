var Handlebars=require("handlebars");module.exports.body=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e){var n,a=this.lambda,s=this.escapeExpression;return'<body>\n  <div id="wrapper">\n    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">\n      <div class="navbar-header">\n        <button type="button" class="navbar-toggle" data-hook="toggle-nav">\n          <span class="sr-only">Toggle navigation</span>\n          <span class="icon-bar"></span>\n          <span class="icon-bar"></span>\n          <span class="icon-bar"></span>\n        </button>\n        <span class="navbar-brand" href="/">Boss</span>\n        <small>Hello '+s(a(null!=(n=null!=e?e.model:e)?n.name:n,e))+'</small>\n      </div>\n\n      <div class="collapse navbar-collapse" data-hook="nav-container"></div>\n    </nav>\n    <div id="nav-shadow"></div>\n\n    <div id="page-wrapper" data-hook="page-container"></div>\n    <footer>\n      <small><a href="http://github.com/tableflip/boss-web" class="boss-web">boss-web</a> <span data-hook="version">5</span> by <a href="http://tableflip.io" class="tableflip">TABLEFLIP</a></small>\n      <small>A side effect of the JavaScript Adventure Club</small>\n    </footer>\n  </div>\n</body>\n'},useData:!0}),module.exports.head=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0"/>\n<meta name="apple-mobile-web-app-capable" content="yes"/>\n<meta name="mobile-web-app-capable" content="yes"/>\n<script src="/socket.io/socket.io.js"></script>\n'},useData:!0}),module.exports.includes={},module.exports.includes.host={},module.exports.includes.host.connecting=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e){var n,a=this.lambda,s=this.escapeExpression;return'<div class="alert alert-info" role="alert">Connecting to '+s(a(null!=(n=null!=e?e.model:e)?n.name:n,e))+"...</div>\n"},useData:!0}),module.exports.includes.host.badsignature=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e){var n,a=this.lambda,s=this.escapeExpression;return'<section class="page badsignature">\n  <div class="alert alert-danger" role="alert">\n    <h4>Could not connect to '+s(a(null!=(n=null!=e?e.model:e)?n.name:n,e))+' - message signature was invalid</h4>\n    <p>This usually means that you did not configure boss-web correctly.</p>\n    <p>Please see the <a href="https://github.com/tableflip/boss-web#step-3-still-on-the-boss-machine-add-a-remote-user">README entry about adding remote users</a>.</p>\n  </div>\n</section>\n'},useData:!0}),module.exports.includes.host.connectionreset=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e){var n,a=this.lambda,s=this.escapeExpression;return'<section class="page badsignature">\n  <div class="alert alert-danger" role="alert">\n    <h4>Could not connect to '+s(a(null!=(n=null!=e?e.model:e)?n.name:n,e))+" - connection reset</h4>\n    <p>Has something disrupted your network conneciton?</p>\n  </div>\n</section>\n"},useData:!0}),module.exports.includes.host.connectionrefused=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e){var n,a=this.lambda,s=this.escapeExpression;return'<section class="page badsignature">\n  <div class="alert alert-danger" role="alert">\n    <h4>Could not connect to '+s(a(null!=(n=null!=e?e.model:e)?n.name:n,e))+" - connection refused</h4>\n    <p>Is boss running on the remote machine?</p>\n  </div>\n</section>\n"},useData:!0}),module.exports.includes.host.connectiontimedout=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e){var n,a=this.lambda,s=this.escapeExpression;return'<div class="alert alert-danger" role="alert">\n  <h4>Could not connect to '+s(a(null!=(n=null!=e?e.model:e)?n.name:n,e))+"</h4>\n  <p>Connection timed out, will attempt to reconnect shortly.</p>\n</div>\n"},useData:!0}),module.exports.includes.host.error=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e){var n,a=this.lambda,s=this.escapeExpression;return'<section class="page error">\n  <div class="alert alert-danger" role="alert">\n    <h4>Could not connect to '+s(a(null!=(n=null!=e?e.model:e)?n.name:n,e))+"</h4>\n    <p>Sorry it didn't work out. Maybe check the logs?</p>\n  </div>\n</section>\n"},useData:!0}),module.exports.includes.host.hostnotfound=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e){var n,a=this.lambda,s=this.escapeExpression;return'<section class="page badsignature">\n  <div class="alert alert-danger" role="alert">\n    <h4>Could not connect to '+s(a(null!=(n=null!=e?e.model:e)?n.name:n,e))+" - host not found</h4>\n    <p>Either the configured hostname is wrong or your DNS is b0rked</p>\n  </div>\n</section>\n"},useData:!0}),module.exports.includes.host.incompatible=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e,n,a,s){var t,l="function",o=n.helperMissing,i=this.escapeExpression;return'<section class="page incompatible">\n  <div class="alert alert-danger">\n    <p><strong>'+i((t=null!=(t=n.name||(null!=e?e.name:e))?t:o,typeof t===l?t.call(e,{name:"name",hash:{},data:s}):t))+" is running a version of boss incompatible with this version of boss-web</strong></p>\n    <p>It is running "+i((t=null!=(t=n.version||(null!=e?e.version:e))?t:o,typeof t===l?t.call(e,{name:"version",hash:{},data:s}):t))+" - please upgrade it to "+i((t=null!=(t=n.requiredVersion||(null!=e?e.requiredVersion:e))?t:o,typeof t===l?t.call(e,{name:"requiredVersion",hash:{},data:s}):t))+" or later</p>\n  </div>\n</section>\n"},useData:!0}),module.exports.includes.host.overview=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<span>\n  <span data-hook="system-data"></span>\n  <span data-hook="resource-data"></span>\n</span>\n'},useData:!0}),module.exports.includes.host.networkdown=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e){var n,a=this.lambda,s=this.escapeExpression;return'<section class="page timeout">\n  <div class="alert alert-danger" role="alert">\n    <h4>Connection to '+s(a(null!=(n=null!=e?e.model:e)?n.name:n,e))+" lost</h4>\n    <p>Your network connection went down.</p>\n  </div>\n</section>\n"},useData:!0}),module.exports.includes.host.timeout=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e){var n,a=this.lambda,s=this.escapeExpression;return'<section class="page timeout">\n  <div class="alert alert-warning" role="alert">\n    <h4>Connection to '+s(a(null!=(n=null!=e?e.model:e)?n.name:n,e))+" lost</h4>\n    <p>Connection timed out.</p>\n  </div>\n</section>\n"},useData:!0}),module.exports.includes.hostlist={},module.exports.includes.hostlist.host=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e){var n,a=this.lambda,s=this.escapeExpression;return'<li class="host-name">\n  <ul>\n    <li><a href="/host/'+s(a(null!=(n=null!=e?e.model:e)?n.name:n,e))+'"><i class="fa fa-desktop"></i> '+s(a(null!=(n=null!=e?e.model:e)?n.name:n,e))+'</a></li>\n    <li class="processes"><a href="/host/'+s(a(null!=(n=null!=e?e.model:e)?n.name:n,e))+'/processes"><i class="fa fa-tasks"></i> Processes</a></li>\n    <li class="process-list" data-hook="process-list"></li>\n  </ul>\n</li>\n'},useData:!0}),module.exports.includes.host.system=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e){var n,a=this.lambda,s=this.escapeExpression;return'<div class="panel panel-primary table-panel system">\n  <div class="panel-heading">\n    <h4 class="panel-title">Vital statistics</h4>\n  </div>\n  <div class="panel-body">\n    <table class="table table-striped system-details">\n      <thead>\n        <tr>\n          <th class="hostname">Hostname</th>\n          <th class="type">Type</th>\n          <th class="platform">Platform</th>\n          <th class="arch">Arch</th>\n          <th class="release">Release</th>\n          <th class="boss">Boss</th>\n          <th class="uptime">Uptime</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr>\n          <td class="hostname">'+s(a(null!=(n=null!=e?e.model:e)?n.hostname:n,e))+'</td>\n          <td class="type">'+s(a(null!=(n=null!=e?e.model:e)?n.type:n,e))+'</td>\n          <td class="platform">'+s(a(null!=(n=null!=e?e.model:e)?n.platform:n,e))+'</td>\n          <td class="arch">'+s(a(null!=(n=null!=e?e.model:e)?n.arch:n,e))+'</td>\n          <td class="release">'+s(a(null!=(n=null!=e?e.model:e)?n.release:n,e))+'</td>\n          <td class="boss">'+s(a(null!=(n=null!=e?e.model:e)?n.version:n,e))+'</td>\n          <td class="uptime" data-hook="uptime">'+s(a(null!=(n=null!=e?e.model:e)?n.uptimeFormatted:n,e))+"</td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</div>"},useData:!0}),module.exports.includes.host.resources=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<div class="panel panel-primary">\n  <div class="panel-heading">\n    <h4 class="panel-title">Resource usage</h4>\n  </div>\n  <div class="panel-body resource-data">\n    <div data-hook="cpu-usage" style="min-width: 340px; height: 150px; margin: 0 auto 20px auto; display: inline-block"></div>\n    <div data-hook="memory-usage" style="min-width: 340px; height: 160px; margin: 0 auto; display: inline-block"></div>\n  </div>\n</div>'},useData:!0}),module.exports.includes.hostlist.list=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<ul id="active" class="nav navbar-nav side-nav host-list" data-hook="host-list">\n</ul>'},useData:!0}),module.exports.includes.process={},module.exports.includes.process.exceptionlist={},module.exports.includes.process.exceptionlist.empty=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<div class="panel panel-primary exceptions">\n  <div class="panel-heading panel-heading-exceptions">\n    <h4 class="panel-title">Exceptions</h4>\n  </div>\n  <div class="panel-body panel-exceptions">\n    <p>No exceptions have been thrown</p>\n  </div>\n</div>\n\n'},useData:!0}),module.exports.includes.hostlist.process=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e){var n,a=this.lambda,s=this.escapeExpression;return'<ul class="process">\n  <li class="processName"><a href="/host/'+s(a(null!=(n=null!=(n=null!=(n=null!=e?e.model:e)?n.collection:n)?n.parent:n)?n.name:n,e))+"/process/"+s(a(null!=(n=null!=e?e.model:e)?n.id:n,e))+'"><span class="nodeIcon">&#11042;</span> <span data-hook="process-name">'+s(a(null!=(n=null!=e?e.model:e)?n.name:n,e))+'</span></a></li>\n  <li class="processLogs"><a href="/host/'+s(a(null!=(n=null!=(n=null!=(n=null!=e?e.model:e)?n.collection:n)?n.parent:n)?n.name:n,e))+"/process/"+s(a(null!=(n=null!=e?e.model:e)?n.id:n,e))+'/logs"><i class="fa fa-book"></i> Logs</a></li>\n  <li class="processExceptions"><a href="/host/'+s(a(null!=(n=null!=(n=null!=(n=null!=e?e.model:e)?n.collection:n)?n.parent:n)?n.name:n,e))+"/process/"+s(a(null!=(n=null!=e?e.model:e)?n.id:n,e))+'/exceptions"><i class="fa fa-exclamation-triangle"></i> Exceptions</a></li>\n</ul>\n'},useData:!0}),module.exports.includes.process.exceptionlist.list=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<div class="panel panel-primary table-panel exceptions">\n  <div class="panel-heading panel-heading-exceptions">\n    <h4 class="panel-title">Exceptions</h4>\n  </div>\n  <div class="panel-body panel-exceptions">\n    <ul class="exceptions">\n      <li class="date">Date</li>\n      <li class="code">Code</li>\n      <li class="message">Message</li>\n      <li class="list" data-hook="exceptions"></li>\n    </ul>\n  </div>\n</div>\n'},useData:!0}),module.exports.includes.process.exceptions=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<span data-hook="exceptions"></span>\n'},useData:!0}),module.exports.includes.process.exceptionlist.entry=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e){var n,a=this.lambda,s=this.escapeExpression;return'<ul>\n  <li class="date">'+s(a(null!=(n=null!=e?e.model:e)?n.dateFormatted:n,e))+'</li>\n  <li class="code">'+s(a(null!=(n=null!=e?e.model:e)?n.code:n,e))+'</li>\n  <li class="message">'+s(a(null!=(n=null!=e?e.model:e)?n.messageOrStackSummary:n,e))+'</li>\n  <li class="stack"><pre><code>'+s(a(null!=(n=null!=e?e.model:e)?n.stack:n,e))+"</code></pre></li>\n</ul>\n"},useData:!0}),module.exports.includes.process.loglist={},module.exports.includes.process.loglist.entry=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e){var n,a=this.lambda,s=this.escapeExpression,t='<li class="'+s(a(null!=(n=null!=e?e.model:e)?n.type:n,e))+' visible">';return n=a(null!=(n=null!=e?e.model:e)?n.messageFormatted:n,e),null!=n&&(t+=n),t+"</li>\n"},useData:!0}),module.exports.includes.process.loglist.list=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<div class="panel panel-primary logs">\n  <div class="panel-heading panel-heading-logs">\n    <button type="button" class="btn btn-default btn-xs logs-pin active"><i class="fa fa-paperclip"></i> Pin</button>\n    <button type="button" class="btn btn-default btn-xs logs-clear"><i class="fa fa-trash"></i> Clear</button>\n    <h4 class="panel-title">Logs</h4>\n  </div>\n  <div class="panel-body panel-logs">\n    <ul class="logs" data-hook="logs"></ul>\n  </div>\n</div>\n'},useData:!0}),module.exports.includes.process.logs=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<span data-hook="logs"></span>\n'},useData:!0}),module.exports.includes.process.overview={},module.exports.includes.process.overview.details=Handlebars.template({1:function(){return'      <button type="button" class="btn btn-default btn-xs process-addworker" data-hook="addworkerbutton"><i class="fa fa-plus"></i> Add worker</button>\n      <button type="button" class="btn btn-default btn-xs process-removeworker" data-hook="removeworkerbutton"><i class="fa fa-minus"></i> Remove worker</button>\n'},compiler:[6,">= 2.0.0-beta.1"],main:function(e,n,a,s){var t,l=this.lambda,o=this.escapeExpression,i='<div class="panel panel-primary details">\n  <div class="panel-heading">\n    <h4 class="panel-title">Vital statistics</h4>\n  </div>\n  <div class="panel-body">\n    <p><span data-hook="script">'+o(l(null!=(t=null!=e?e.model:e)?t.script:t,e))+'</span> has been running for <span data-hook="uptime">'+o(l(null!=(t=null!=e?e.model:e)?t.uptimeFormatted:t,e))+'</span> with <span data-hook="restarts">'+o(l(null!=(t=null!=e?e.model:e)?t.restarts:t,e))+'</span> restart(s).</p>\n    <p>The current pid is <span data-hook="pid">'+o(l(null!=(t=null!=e?e.model:e)?t.pid:t,e))+'</span> and it\'s running as <span data-hook="user">'+o(l(null!=(t=null!=e?e.model:e)?t.user:t,e))+'</span>:<span data-hook="group">'+o(l(null!=(t=null!=e?e.model:e)?t.group:t,e))+'</span>.</p>\n    <button type="button" class="btn btn-default btn-xs process-gc" data-hook="gcbutton"><i class="fa fa-trash"></i> Garbage collect</button>\n    <button type="button" class="btn btn-default btn-xs process-heap" data-hook="heapdumpbutton"><i class="fa fa-h-square"></i> Heap dump</button>\n    <button type="button" class="btn btn-default btn-xs process-debug"><i class="fa fa-bug"></i> Debug</button>\n    <button type="button" class="btn btn-default btn-xs process-restart" data-hook="restartbutton"><i class="fa fa-refresh"></i> Restart</button>\n    <button type="button" class="btn btn-default btn-xs process-stop" data-hook="stopbutton"><i class="fa fa-stop"></i> Stop</button>\n\n';return t=n["if"].call(e,null!=(t=null!=e?e.model:e)?t.cluster:t,{name:"if",hash:{},fn:this.program(1,s),inverse:this.noop,data:s}),null!=t&&(i+=t),i+"  </div>\n</div>\n"},useData:!0}),module.exports.includes.process.overview.index=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<span>\n  <span data-hook="details"></span>\n  <span data-hook="memory"></span>\n  <span data-hook="cpu"></span>\n</span>\n'},useData:!0}),module.exports.includes.process.overview.cpu=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<div class="panel panel-primary cpu">\n  <div class="panel-heading">\n    <h4 class="panel-title">CPU usage</h4>\n  </div>\n  <div class="panel-body">\n    <div data-hook="cpu-usage" style="width: 100%; height: 150px; margin: auto"></div>\n  </div>\n</div>\n'},useData:!0}),module.exports.includes.processlist={},module.exports.includes.processlist.empty=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<div class="panel panel-primary processes">\n  <div class="panel-heading panel-heading-processes">\n    <h4 class="panel-title">Processes</h4>\n  </div>\n  <div class="panel-body panel-processes">\n    <p>There are no running processes</p>\n  </div>\n</div>\n\n'},useData:!0}),module.exports.includes.processlist.list=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<div class="panel panel-primary table-panel processes">\n  <div class="panel-heading">\n    <h4 class="panel-title">Processes</h4>\n  </div>\n  <div class="panel-body">\n    <table class="table table-striped table-hover process-list">\n      <thead>\n      <tr>\n        <th class="title">Title</th>\n        <th class="pid">Pid</th>\n        <th class="uptime">Uptime</th>\n        <th class="restarts">Restarts</th>\n        <th class="memory">Memory</th>\n        <th class="cpu">CPU</th>\n      </tr>\n      </thead>\n      <tbody data-hook="processes"></tbody>\n    </table>\n  </div>\n</div>\n'},useData:!0}),module.exports.includes.process.overview.memory=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<div class="panel panel-primary memory">\n  <div class="panel-heading">\n    <h4 class="panel-title">Memory usage</h4>\n  </div>\n  <div class="panel-body">\n    <div data-hook="memory-usage" style="width: 100%; height: 200px; margin: auto"></div>\n  </div>\n</div>\n'},useData:!0}),module.exports.includes.processlist.process=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e){var n,a=this.lambda,s=this.escapeExpression;return'<tr>\n  <td class="title" data-hook="name">'+s(a(null!=(n=null!=e?e.model:e)?n.name:n,e))+"<br /><small>"+s(a(null!=(n=null!=e?e.model:e)?n.script:n,e))+'</small></td>\n  <td class="pid" data-hook="pid">'+s(a(null!=(n=null!=e?e.model:e)?n.pid:n,e))+'</td>\n  <td class="uptime" data-hook="uptime">'+s(a(null!=(n=null!=e?e.model:e)?n.uptimeFormatted:n,e))+'</td>\n  <td class="restarts" data-hook="restarts">'+s(a(null!=(n=null!=e?e.model:e)?n.restarts:n,e))+'</td>\n  <td class="memory" data-hook="memory">'+s(a(null!=(n=null!=e?e.model:e)?n.memoryFormatted:n,e))+'</td>\n  <td class="cpu" data-hook="cpu">'+s(a(null!=(n=null!=e?e.model:e)?n.cpuFormatted:n,e))+"</td>\n</tr>\n"},useData:!0}),module.exports.pages={},module.exports.pages.host=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e){var n,a=this.lambda,s=this.escapeExpression;return'<section class="page host">\n  <div class="row">\n    <div class="col-md-12">\n      <h1>'+s(a(null!=(n=null!=e?e.model:e)?n.name:n,e))+'</h1>\n      <span data-hook="view"></span\n    </div>\n  </div>\n</section>\n'},useData:!0}),module.exports.pages.loadinghosts=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<section class="page loadinghosts">\n  <div class="alert alert-info" role="alert">Waiting for hosts...</div>\n</section>\n'},useData:!0}),module.exports.pages.process=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e){var n,a=this.lambda,s=this.escapeExpression;return'<section class="page process">\n  <div class="row">\n    <div class="col-md-12">\n      <h1 data-hook="process-name">'+s(a(null!=(n=null!=e?e.model:e)?n.name:n,e))+'</h1>\n      <span data-hook="view"></span>\n    </div>\n  </div>\n</section>\n'},useData:!0}),module.exports.pages.processes=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e){var n,a=this.lambda,s=this.escapeExpression;return'<section class="page processes">\n  <div class="row">\n    <div class="col-md-12">\n      <h1>'+s(a(null!=(n=null!=e?e.model:e)?n.name:n,e))+'</h1>\n      <div class="panel panel-primary">\n        <div class="panel-heading">\n          <h4 class="panel-title">Processes</h4>\n        </div>\n        <div class="panel-body" data-hook="view"></div>\n      </div>\n    </div>\n  </div>\n</section>\n'},useData:!0}),module.exports.pages.nohosts=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<section class="page nohosts">\n  <div class="alert alert-warning" role="alert">\n    <strong>No hosts to show</strong> Please configure some hosts in your boss-web config file.\n  </div>\n</section>\n'},useData:!0});