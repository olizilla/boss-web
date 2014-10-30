var Handlebars=require("handlebars");module.exports.body=Handlebars.template({1:function(e,n,a,t){var l,s="function",i=n.helperMissing,r=this.escapeExpression;return'        <li class="active">\n          <a href="/host/'+r((l=null!=(l=n.name||(null!=e?e.name:e))?l:i,typeof l===s?l.call(e,{name:"name",hash:{},data:t}):l))+'">'+r((l=null!=(l=n.name||(null!=e?e.name:e))?l:i,typeof l===s?l.call(e,{name:"name",hash:{},data:t}):l))+"</a>\n        </li>\n"},compiler:[6,">= 2.0.0-beta.1"],main:function(e,n,a,t){var l,s='<body>\n  <nav class="navbar navbar-default navbar-inverse">\n    <div class="container-fluid">\n      <div class="navbar-header">\n        <span class="navbar-brand">Boss</span>\n      </div>\n      <ul class="nav navbar-nav">\n';return l=n.each.call(e,null!=e?e.hosts:e,{name:"each",hash:{},fn:this.program(1,t),inverse:this.noop,data:t}),null!=l&&(s+=l),s+'      </ul>\n    </div>\n  </nav>\n  <div class="container">\n    <main data-hook="page-container"></main>\n  </div>\n</body>\n'},useData:!0}),module.exports.head=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0"/>\n<meta name="apple-mobile-web-app-capable" content="yes"/>'},useData:!0}),module.exports.includes={},module.exports.includes.host=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e){var n,a=this.lambda,t=this.escapeExpression;return'<div class="panel panel-default" data-hook="host-data">\n  <div class="panel-heading" role="tab" id="headingOne">\n    <h4 class="panel-title">System information</h4>\n  </div>\n  <div class="panel-body host-data">\n    <table class="table table-striped table-bordered table-condensed">\n      <tr>\n        <th>Hostname</th>\n        <td>'+t(a(null!=(n=null!=e?e.model:e)?n.hostname:n,e))+"</td>\n      </tr>\n      <tr>\n        <th>Type</th>\n        <td>"+t(a(null!=(n=null!=e?e.model:e)?n.type:n,e))+"</td>\n      </tr>\n      <tr>\n        <th>Platform</th>\n        <td>"+t(a(null!=(n=null!=e?e.model:e)?n.platform:n,e))+"</td>\n      </tr>\n      <tr>\n        <th>Arch</th>\n        <td>"+t(a(null!=(n=null!=e?e.model:e)?n.arch:n,e))+"</td>\n      </tr>\n      <tr>\n        <th>Release</th>\n        <td>"+t(a(null!=(n=null!=e?e.model:e)?n.release:n,e))+"</td>\n      </tr>\n      <tr>\n        <th>CPUs</th>\n        <td>"+t(a(null!=(n=null!=(n=null!=e?e.model:e)?n.cpus:n)?n.length:n,e))+"x "+t(a(null!=(n=null!=e?e.model:e)?n.cpuSpeed:n,e))+"</td>\n      </tr>\n      <tr>\n        <th>Version</th>\n        <td>"+t(a(null!=(n=null!=e?e.model:e)?n.version:n,e))+'</td>\n      </tr>\n      <tr>\n        <th>Uptime</th>\n        <td><span data-hook="uptime">'+t(a(null!=(n=null!=e?e.model:e)?n.uptimeFormatted:n,e))+"</span></td>\n      </tr>\n    </table>\n  </div>\n</div>"},useData:!0}),module.exports.pages={},module.exports.pages.error=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e){var n,a=this.lambda,t=this.escapeExpression;return'<section class="page host">\n  <div class="alert alert-error" role="alert">\n    <strong>Could not connect to '+t(a(null!=(n=null!=e?e.model:e)?n.name:n,e))+"</strong> Sorry it didn't work out.\n  </div>\n</section>\n"},useData:!0}),module.exports.pages.connecting=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e){var n,a=this.lambda,t=this.escapeExpression;return'<section class="page host">\n  <div class="alert alert-info" role="alert">Connecting to '+t(a(null!=(n=null!=e?e.model:e)?n.name:n,e))+"...</div>\n</section>\n"},useData:!0}),module.exports.pages.host=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<section class="page host">\n  <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">\n    <div class="panel panel-default" data-hook="host-data">\n\n    </div>\n\n    <div class="panel panel-default">\n      <div class="panel-heading" role="tab" id="headingOne">\n        <h4 class="panel-title">Processes</h4>\n      </div>\n      <div class="panel-body">\n        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.\n      </div>\n    </div>\n  </div>\n</section>\n'},useData:!0}),module.exports.pages.incompatible=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e,n,a,t){var l,s="function",i=n.helperMissing,r=this.escapeExpression;return'<section class="page host">\n  <div class="alert alert-danger">\n    <p><strong>'+r((l=null!=(l=n.name||(null!=e?e.name:e))?l:i,typeof l===s?l.call(e,{name:"name",hash:{},data:t}):l))+" is running a version of boss incompatible with this version of boss-web</strong></p>\n    <p>It is running "+r((l=null!=(l=n.version||(null!=e?e.version:e))?l:i,typeof l===s?l.call(e,{name:"version",hash:{},data:t}):l))+" - please upgrade it to "+r((l=null!=(l=n.requiredVersion||(null!=e?e.requiredVersion:e))?l:i,typeof l===s?l.call(e,{name:"requiredVersion",hash:{},data:t}):l))+" or later</p>\n  </div>\n</section>\n"},useData:!0});