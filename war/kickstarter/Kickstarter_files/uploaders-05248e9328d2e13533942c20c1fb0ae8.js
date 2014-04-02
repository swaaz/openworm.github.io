(function(c){typeof define==="function"&&define.amd?define(["jquery"],c):c(jQuery)})(function(c,a){var b=0,d=Array.prototype.slice,e=c.cleanData;c.cleanData=function(a){for(var b=0,d;(d=a[b])!=null;b++)try{c(d).triggerHandler("remove")}catch(i){}e(a)};c.widget=function(a,b,d){var e,h,j,l,m={},n=a.split(".")[0];a=a.split(".")[1];e=n+"-"+a;if(!d)d=b,b=c.Widget;c.expr[":"][e.toLowerCase()]=function(a){return!!c.data(a,e)};c[n]=c[n]||{};h=c[n][a];j=c[n][a]=function(a,b){if(!this._createWidget)return new j(a,
b);arguments.length&&this._createWidget(a,b)};c.extend(j,h,{version:d.version,_proto:c.extend({},d),_childConstructors:[]});l=new b;l.options=c.widget.extend({},l.options);c.each(d,function(a,f){m[a]=c.isFunction(f)?function(){var c=function(){return b.prototype[a].apply(this,arguments)},d=function(c){return b.prototype[a].apply(this,c)};return function(){var a=this._super,b=this._superApply,e;this._super=c;this._superApply=d;e=f.apply(this,arguments);this._super=a;this._superApply=b;return e}}():
f});j.prototype=c.widget.extend(l,{widgetEventPrefix:h?l.widgetEventPrefix||a:a},m,{constructor:j,namespace:n,widgetName:a,widgetFullName:e});h?(c.each(h._childConstructors,function(a,b){var f=b.prototype;c.widget(f.namespace+"."+f.widgetName,j,b._proto)}),delete h._childConstructors):b._childConstructors.push(j);c.widget.bridge(a,j)};c.widget.extend=function(b){for(var e=d.call(arguments,1),k=0,i=e.length,h,j;k<i;k++)for(h in e[k])j=e[k][h],e[k].hasOwnProperty(h)&&j!==a&&(b[h]=c.isPlainObject(j)?
c.isPlainObject(b[h])?c.widget.extend({},b[h],j):c.widget.extend({},j):j);return b};c.widget.bridge=function(b,e){var k=e.prototype.widgetFullName||b;c.fn[b]=function(i){var h=typeof i==="string",j=d.call(arguments,1),l=this;i=!h&&j.length?c.widget.extend.apply(null,[i].concat(j)):i;h?this.each(function(){var d,e=c.data(this,k);if(!e)return c.error("cannot call methods on "+b+" prior to initialization; attempted to call method '"+i+"'");if(!c.isFunction(e[i])||i.charAt(0)==="_")return c.error("no such method '"+
i+"' for "+b+" widget instance");d=e[i].apply(e,j);if(d!==e&&d!==a)return l=d&&d.jquery?l.pushStack(d.get()):d,!1}):this.each(function(){var a=c.data(this,k);a?a.option(i||{})._init():c.data(this,k,new e(i,this))});return l}};c.Widget=function(){};c.Widget._childConstructors=[];c.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(a,d){d=c(d||this.defaultElement||this)[0];this.element=c(d);this.uuid=b++;this.eventNamespace=
"."+this.widgetName+this.uuid;this.options=c.widget.extend({},this.options,this._getCreateOptions(),a);this.bindings=c();this.hoverable=c();this.focusable=c();if(d!==this)c.data(d,this.widgetFullName,this),this._on(!0,this.element,{remove:function(a){a.target===d&&this.destroy()}}),this.document=c(d.style?d.ownerDocument:d.document||d),this.window=c(this.document[0].defaultView||this.document[0].parentWindow);this._create();this._trigger("create",null,this._getCreateEventData());this._init()},_getCreateOptions:c.noop,
_getCreateEventData:c.noop,_create:c.noop,_init:c.noop,destroy:function(){this._destroy();this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(c.camelCase(this.widgetFullName));this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled ui-state-disabled");this.bindings.unbind(this.eventNamespace);this.hoverable.removeClass("ui-state-hover");this.focusable.removeClass("ui-state-focus")},
_destroy:c.noop,widget:function(){return this.element},option:function(b,d){var e=b,i,h,j;if(arguments.length===0)return c.widget.extend({},this.options);if(typeof b==="string")if(e={},i=b.split("."),b=i.shift(),i.length){h=e[b]=c.widget.extend({},this.options[b]);for(j=0;j<i.length-1;j++)h[i[j]]=h[i[j]]||{},h=h[i[j]];b=i.pop();if(arguments.length===1)return h[b]===a?null:h[b];h[b]=d}else{if(arguments.length===1)return this.options[b]===a?null:this.options[b];e[b]=d}this._setOptions(e);return this},
_setOptions:function(a){for(var b in a)this._setOption(b,a[b]);return this},_setOption:function(a,b){this.options[a]=b;a==="disabled"&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!b).attr("aria-disabled",b),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus"));return this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(a,b,d){var e,h=this;typeof a!==
"boolean"&&(d=b,b=a,a=!1);d?(b=e=c(b),this.bindings=this.bindings.add(b)):(d=b,b=this.element,e=this.widget());c.each(d,function(d,k){function m(){if(a||!(h.options.disabled===!0||c(this).hasClass("ui-state-disabled")))return(typeof k==="string"?h[k]:k).apply(h,arguments)}if(typeof k!=="string")m.guid=k.guid=k.guid||m.guid||c.guid++;var n=d.match(/^(\w+)\s*(.*)$/),o=n[1]+h.eventNamespace;(n=n[2])?e.delegate(n,o,m):b.bind(o,m)})},_off:function(a,b){b=(b||"").split(" ").join(this.eventNamespace+" ")+
this.eventNamespace;a.unbind(b).undelegate(b)},_delay:function(a,b){var c=this;return setTimeout(function(){return(typeof a==="string"?c[a]:a).apply(c,arguments)},b||0)},_hoverable:function(a){this.hoverable=this.hoverable.add(a);this._on(a,{mouseenter:function(a){c(a.currentTarget).addClass("ui-state-hover")},mouseleave:function(a){c(a.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(a){this.focusable=this.focusable.add(a);this._on(a,{focusin:function(a){c(a.currentTarget).addClass("ui-state-focus")},
focusout:function(a){c(a.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(a,b,d){var e,h=this.options[a];d=d||{};b=c.Event(b);b.type=(a===this.widgetEventPrefix?a:this.widgetEventPrefix+a).toLowerCase();b.target=this.element[0];if(a=b.originalEvent)for(e in a)e in b||(b[e]=a[e]);this.element.trigger(b,d);return!(c.isFunction(h)&&h.apply(this.element[0],[b].concat(d))===!1||b.isDefaultPrevented())}};c.each({show:"fadeIn",hide:"fadeOut"},function(a,b){c.Widget.prototype["_"+a]=function(d,
e,h){typeof e==="string"&&(e={effect:e});var j,l=!e?a:e===!0||typeof e==="number"?b:e.effect||b;e=e||{};typeof e==="number"&&(e={duration:e});j=!c.isEmptyObject(e);e.complete=h;e.delay&&d.delay(e.delay);if(j&&c.effects&&c.effects.effect[l])d[a](e);else if(l!==a&&d[l])d[l](e.duration,e.easing,h);else d.queue(function(b){c(this)[a]();h&&h.call(d[0]);b()})}})});
(function(c){typeof define==="function"&&define.amd?define(["jquery"],c):c(window.jQuery)})(function(c){var a=0;c.ajaxTransport("iframe",function(b){if(b.async){var d=b.initialIframeSrc||"javascript:false;",e,f,g;return{send:function(k,i){e=c('<form style="display:none;"></form>');e.attr("accept-charset",b.formAcceptCharset);g=/\?/.test(b.url)?"&":"?";if(b.type==="DELETE")b.url=b.url+g+"_method=DELETE",b.type="POST";else if(b.type==="PUT")b.url=b.url+g+"_method=PUT",b.type="POST";else if(b.type===
"PATCH")b.url=b.url+g+"_method=PATCH",b.type="POST";a+=1;f=c('<iframe src="'+d+'" name="iframe-transport-'+a+'"></iframe>').bind("load",function(){var a,j=c.isArray(b.paramName)?b.paramName:[b.paramName];f.unbind("load").bind("load",function(){var a;try{if(a=f.contents(),!a.length||!a[0].firstChild)throw Error();}catch(b){a=void 0}i(200,"success",{iframe:a});c('<iframe src="'+d+'"></iframe>').appendTo(e);window.setTimeout(function(){e.remove()},0)});e.prop("target",f.prop("name")).prop("action",b.url).prop("method",
b.type);b.formData&&c.each(b.formData,function(a,b){c('<input type="hidden"/>').prop("name",b.name).val(b.value).appendTo(e)});b.fileInput&&b.fileInput.length&&b.type==="POST"&&(a=b.fileInput.clone(),b.fileInput.after(function(b){return a[b]}),b.paramName&&b.fileInput.each(function(a){c(this).prop("name",j[a]||b.paramName)}),e.append(b.fileInput).prop("enctype","multipart/form-data").prop("encoding","multipart/form-data"),b.fileInput.removeAttr("form"));e.submit();a&&a.length&&b.fileInput.each(function(b,
d){var e=c(a[b]);c(d).prop("name",e.prop("name")).attr("form",e.attr("form"));e.replaceWith(d)})});e.append(f).appendTo(document.body)},abort:function(){f&&f.unbind("load").prop("src",d);e&&e.remove()}}}});c.ajaxSetup({converters:{"iframe text":function(a){return a&&c(a[0].body).text()},"iframe json":function(a){return a&&c.parseJSON(c(a[0].body).text())},"iframe html":function(a){return a&&c(a[0].body).html()},"iframe xml":function(a){return(a=a&&a[0])&&c.isXMLDoc(a)?a:c.parseXML(a.XMLDocument&&
a.XMLDocument.xml||c(a.body).html())},"iframe script":function(a){return a&&c.globalEval(c(a[0].body).text())}}})});
(function(c){typeof define==="function"&&define.amd?define(["jquery","jquery.ui.widget"],c):c(window.jQuery)})(function(c){c.support.fileInput=!(RegExp("(Android (1\\.[0156]|2\\.[01]))|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)|(w(eb)?OSBrowser)|(webOS)|(Kindle/(1\\.0|2\\.[05]|3\\.0))").test(window.navigator.userAgent)||c('<input type="file">').prop("disabled"));c.support.xhrFileUpload=!(!window.ProgressEvent||!window.FileReader);c.support.xhrFormDataFileUpload=!!window.FormData;c.support.blobSlice=
window.Blob&&(Blob.prototype.slice||Blob.prototype.webkitSlice||Blob.prototype.mozSlice);c.widget("blueimp.fileupload",{options:{dropZone:c(document),pasteZone:c(document),fileInput:void 0,replaceFileInput:!0,paramName:void 0,singleFileUploads:!0,limitMultiFileUploads:void 0,limitMultiFileUploadSize:void 0,limitMultiFileUploadSizeOverhead:512,sequentialUploads:!1,limitConcurrentUploads:void 0,forceIframeTransport:!1,redirect:void 0,redirectParamName:void 0,postMessage:void 0,multipart:!0,maxChunkSize:void 0,
uploadedBytes:void 0,recalculateProgress:!0,progressInterval:100,bitrateInterval:500,autoUpload:!0,messages:{uploadedBytes:"Uploaded bytes exceed file size"},i18n:function(a,b){a=this.messages[a]||a.toString();b&&c.each(b,function(b,c){a=a.replace("{"+b+"}",c)});return a},formData:function(a){return a.serializeArray()},add:function(a,b){if(a.isDefaultPrevented())return!1;(b.autoUpload||b.autoUpload!==!1&&c(this).fileupload("option","autoUpload"))&&b.process().done(function(){b.submit()})},processData:!1,
contentType:!1,cache:!1},_specialOptions:["fileInput","dropZone","pasteZone","multipart","forceIframeTransport"],_blobSlice:c.support.blobSlice&&function(){return(this.slice||this.webkitSlice||this.mozSlice).apply(this,arguments)},_BitrateTimer:function(){this.timestamp=Date.now?Date.now():(new Date).getTime();this.bitrate=this.loaded=0;this.getBitrate=function(a,b,c){var e=a-this.timestamp;if(!this.bitrate||!c||e>c)this.bitrate=(b-this.loaded)*(1E3/e)*8,this.loaded=b,this.timestamp=a;return this.bitrate}},
_isXHRUpload:function(a){return!a.forceIframeTransport&&(!a.multipart&&c.support.xhrFileUpload||c.support.xhrFormDataFileUpload)},_getFormData:function(a){var b;if(c.type(a.formData)==="function")return a.formData(a.form);if(c.isArray(a.formData))return a.formData;if(c.type(a.formData)==="object")return b=[],c.each(a.formData,function(a,c){b.push({name:a,value:c})}),b;return[]},_getTotal:function(a){var b=0;c.each(a,function(a,c){b+=c.size||1});return b},_initProgressObject:function(a){var b={loaded:0,
total:0,bitrate:0};a._progress?c.extend(a._progress,b):a._progress=b},_initResponseObject:function(a){var b;if(a._response)for(b in a._response)a._response.hasOwnProperty(b)&&delete a._response[b];else a._response={}},_onProgress:function(a,b){if(a.lengthComputable){var d=Date.now?Date.now():(new Date).getTime(),e;if(!b._time||!b.progressInterval||!(d-b._time<b.progressInterval&&a.loaded!==a.total))b._time=d,e=Math.floor(a.loaded/a.total*(b.chunkSize||b._progress.total))+(b.uploadedBytes||0),this._progress.loaded+=
e-b._progress.loaded,this._progress.bitrate=this._bitrateTimer.getBitrate(d,this._progress.loaded,b.bitrateInterval),b._progress.loaded=b.loaded=e,b._progress.bitrate=b.bitrate=b._bitrateTimer.getBitrate(d,e,b.bitrateInterval),this._trigger("progress",c.Event("progress",{delegatedEvent:a}),b),this._trigger("progressall",c.Event("progressall",{delegatedEvent:a}),this._progress)}},_initProgressListener:function(a){var b=this,d=a.xhr?a.xhr():c.ajaxSettings.xhr();if(d.upload)c(d.upload).bind("progress",
function(c){var d=c.originalEvent;c.lengthComputable=d.lengthComputable;c.loaded=d.loaded;c.total=d.total;b._onProgress(c,a)}),a.xhr=function(){return d}},_isInstanceOf:function(a,b){return Object.prototype.toString.call(b)==="[object "+a+"]"},_initXHRData:function(a){var b=this,d,e=a.files[0],f=a.multipart||!c.support.xhrFileUpload,g=c.type(a.paramName)==="array"?a.paramName[0]:a.paramName;a.headers=c.extend({},a.headers);if(a.contentRange)a.headers["Content-Range"]=a.contentRange;if(!f||a.blob||
!this._isInstanceOf("File",e))a.headers["Content-Disposition"]='attachment; filename="'+encodeURI(e.name)+'"';if(f){if(c.support.xhrFormDataFileUpload)a.postMessage?(d=this._getFormData(a),a.blob?d.push({name:g,value:a.blob}):c.each(a.files,function(b,e){d.push({name:c.type(a.paramName)==="array"&&a.paramName[b]||g,value:e})})):(b._isInstanceOf("FormData",a.formData)?d=a.formData:(d=new FormData,c.each(this._getFormData(a),function(a,b){d.append(b.name,b.value)})),a.blob?d.append(g,a.blob,e.name):
c.each(a.files,function(e,f){if(b._isInstanceOf("File",f)||b._isInstanceOf("Blob",f))d.append(c.type(a.paramName)==="array"&&a.paramName[e]||g,f,f.uploadName||f.name)})),a.data=d}else a.contentType=e.type||"application/octet-stream",a.data=a.blob||e;a.blob=null},_initIframeSettings:function(a){var b=c("<a></a>").prop("href",a.url).prop("host");a.dataType="iframe "+(a.dataType||"");a.formData=this._getFormData(a);a.redirect&&b&&b!==location.host&&a.formData.push({name:a.redirectParamName||"redirect",
value:a.redirect})},_initDataSettings:function(a){if(this._isXHRUpload(a)){if(this._chunkedUpload(a,!0)||(a.data||this._initXHRData(a),this._initProgressListener(a)),a.postMessage)a.dataType="postmessage "+(a.dataType||"")}else this._initIframeSettings(a)},_getParamName:function(a){var b=c(a.fileInput),d=a.paramName;d?c.isArray(d)||(d=[d]):(d=[],b.each(function(){var a=c(this),b=a.prop("name")||"files[]";for(a=(a.prop("files")||[1]).length;a;)d.push(b),a-=1}),d.length||(d=[b.prop("name")||"files[]"]));
return d},_initFormSettings:function(a){if(!a.form||!a.form.length)if(a.form=c(a.fileInput.prop("form")),!a.form.length)a.form=c(this.options.fileInput.prop("form"));a.paramName=this._getParamName(a);if(!a.url)a.url=a.form.prop("action")||location.href;a.type=(a.type||c.type(a.form.prop("method"))==="string"&&a.form.prop("method")||"").toUpperCase();if(a.type!=="POST"&&a.type!=="PUT"&&a.type!=="PATCH")a.type="POST";if(!a.formAcceptCharset)a.formAcceptCharset=a.form.attr("accept-charset")},_getAJAXSettings:function(a){a=
c.extend({},this.options,a);this._initFormSettings(a);this._initDataSettings(a);return a},_getDeferredState:function(a){if(a.state)return a.state();if(a.isResolved())return"resolved";if(a.isRejected())return"rejected";return"pending"},_enhancePromise:function(a){a.success=a.done;a.error=a.fail;a.complete=a.always;return a},_getXHRPromise:function(a,b,d){var e=c.Deferred(),f=e.promise();b=b||this.options.context||f;a===!0?e.resolveWith(b,d):a===!1&&e.rejectWith(b,d);f.abort=e.promise;return this._enhancePromise(f)},
_addConvenienceMethods:function(a,b){var d=this,e=function(a){return c.Deferred().resolveWith(d,a).promise()};b.process=function(a,g){if(a||g)b._processQueue=this._processQueue=(this._processQueue||e([this])).pipe(function(){if(b.errorThrown)return c.Deferred().rejectWith(d,[b]).promise();return e(arguments)}).pipe(a,g);return this._processQueue||e([this])};b.submit=function(){if(this.state()!=="pending")b.jqXHR=this.jqXHR=d._trigger("submit",c.Event("submit",{delegatedEvent:a}),this)!==!1&&d._onSend(a,
this);return this.jqXHR||d._getXHRPromise()};b.abort=function(){if(this.jqXHR)return this.jqXHR.abort();this.errorThrown="abort";d._trigger("fail",null,this);return d._getXHRPromise(!1)};b.state=function(){if(this.jqXHR)return d._getDeferredState(this.jqXHR);if(this._processQueue)return d._getDeferredState(this._processQueue)};b.processing=function(){return!this.jqXHR&&this._processQueue&&d._getDeferredState(this._processQueue)==="pending"};b.progress=function(){return this._progress};b.response=
function(){return this._response}},_getUploadedBytes:function(a){return(a=(a=(a=a.getResponseHeader("Range"))&&a.split("-"))&&a.length>1&&parseInt(a[1],10))&&a+1},_chunkedUpload:function(a,b){a.uploadedBytes=a.uploadedBytes||0;var d=this,e=a.files[0],f=e.size,g=a.uploadedBytes,k=a.maxChunkSize||f,i=this._blobSlice,h=c.Deferred(),j=h.promise(),l,m;if(!this._isXHRUpload(a)||!i||!(g||k<f)||a.data)return!1;if(b)return!0;if(g>=f)return e.error=a.i18n("uploadedBytes"),this._getXHRPromise(!1,a.context,[null,
"error",e.error]);m=function(){var b=c.extend({},a),j=b._progress.loaded;b.blob=i.call(e,g,g+k,e.type);b.chunkSize=b.blob.size;b.contentRange="bytes "+g+"-"+(g+b.chunkSize-1)+"/"+f;d._initXHRData(b);d._initProgressListener(b);l=(d._trigger("chunksend",null,b)!==!1&&c.ajax(b)||d._getXHRPromise(!1,b.context)).done(function(e,i,k){g=d._getUploadedBytes(k)||g+b.chunkSize;j+b.chunkSize-b._progress.loaded&&d._onProgress(c.Event("progress",{lengthComputable:!0,loaded:g-b.uploadedBytes,total:g-b.uploadedBytes}),
b);a.uploadedBytes=b.uploadedBytes=g;b.result=e;b.textStatus=i;b.jqXHR=k;d._trigger("chunkdone",null,b);d._trigger("chunkalways",null,b);g<f?m():h.resolveWith(b.context,[e,i,k])}).fail(function(a,c,e){b.jqXHR=a;b.textStatus=c;b.errorThrown=e;d._trigger("chunkfail",null,b);d._trigger("chunkalways",null,b);h.rejectWith(b.context,[a,c,e])})};this._enhancePromise(j);j.abort=function(){return l.abort()};m();return j},_beforeSend:function(a,b){if(this._active===0)this._trigger("start"),this._bitrateTimer=
new this._BitrateTimer,this._progress.loaded=this._progress.total=0,this._progress.bitrate=0;this._initResponseObject(b);this._initProgressObject(b);b._progress.loaded=b.loaded=b.uploadedBytes||0;b._progress.total=b.total=this._getTotal(b.files)||1;b._progress.bitrate=b.bitrate=0;this._active+=1;this._progress.loaded+=b.loaded;this._progress.total+=b.total},_onDone:function(a,b,d,e){var f=e._progress.total,g=e._response;e._progress.loaded<f&&this._onProgress(c.Event("progress",{lengthComputable:!0,
loaded:f,total:f}),e);g.result=e.result=a;g.textStatus=e.textStatus=b;g.jqXHR=e.jqXHR=d;this._trigger("done",null,e)},_onFail:function(a,b,c,e){var f=e._response;e.recalculateProgress&&(this._progress.loaded-=e._progress.loaded,this._progress.total-=e._progress.total);f.jqXHR=e.jqXHR=a;f.textStatus=e.textStatus=b;f.errorThrown=e.errorThrown=c;this._trigger("fail",null,e)},_onAlways:function(a,b,c,e){this._trigger("always",null,e)},_onSend:function(a,b){b.submit||this._addConvenienceMethods(a,b);var d=
this,e,f,g,k,i=d._getAJAXSettings(b),h=function(){d._sending+=1;i._bitrateTimer=new d._BitrateTimer;return e=e||((f||d._trigger("send",c.Event("send",{delegatedEvent:a}),i)===!1)&&d._getXHRPromise(!1,i.context,f)||d._chunkedUpload(i)||c.ajax(i)).done(function(a,b,c){d._onDone(a,b,c,i)}).fail(function(a,b,c){d._onFail(a,b,c,i)}).always(function(a,b,c){d._onAlways(a,b,c,i);d._sending-=1;d._active-=1;if(i.limitConcurrentUploads&&i.limitConcurrentUploads>d._sending)for(a=d._slots.shift();a;){if(d._getDeferredState(a)===
"pending"){a.resolve();break}a=d._slots.shift()}d._active===0&&d._trigger("stop")})};this._beforeSend(a,i);if(this.options.sequentialUploads||this.options.limitConcurrentUploads&&this.options.limitConcurrentUploads<=this._sending)return this.options.limitConcurrentUploads>1?(g=c.Deferred(),this._slots.push(g),k=g.pipe(h)):k=this._sequence=this._sequence.pipe(h,h),k.abort=function(){f=[void 0,"abort","abort"];if(!e)return g&&g.rejectWith(i.context,f),h();return e.abort()},this._enhancePromise(k);return h()},
_onAdd:function(a,b){var d=this,e=!0,f=c.extend({},this.options,b),g=b.files,k=g.length,i=f.limitMultiFileUploads,h=f.limitMultiFileUploadSize,j=f.limitMultiFileUploadSizeOverhead,l=0,m=this._getParamName(f),n,o,p=0;if(h&&(!k||g[0].size===void 0))h=void 0;if(!f.singleFileUploads&&!i&&!h||!this._isXHRUpload(f))o=[g],n=[m];else if(!f.singleFileUploads&&!h&&i){o=[];n=[];for(f=0;f<k;f+=i)o.push(g.slice(f,f+i)),l=m.slice(f,f+i),l.length||(l=m),n.push(l)}else if(!f.singleFileUploads&&h){o=[];n=[];for(f=
0;f<k;f+=1)if(l+=g[f].size+j,f+1===k||l+g[f+1].size+j>h||i&&f+1-p>=i)o.push(g.slice(p,f+1)),l=m.slice(p,f+1),l.length||(l=m),n.push(l),p=f+1,l=0}else n=m;b.originalFiles=g;c.each(o||g,function(f,h){var g=c.extend({},b);g.files=o?h:[h];g.paramName=n[f];d._initResponseObject(g);d._initProgressObject(g);d._addConvenienceMethods(a,g);return e=d._trigger("add",c.Event("add",{delegatedEvent:a}),g)});return e},_replaceFileInput:function(a){var b=a.clone(!0);c("<form></form>").append(b)[0].reset();a.after(b).detach();
c.cleanData(a.unbind("remove"));this.options.fileInput=this.options.fileInput.map(function(c,e){if(e===a[0])return b[0];return e});if(a[0]===this.element[0])this.element=b},_handleFileTreeEntry:function(a,b){var d=this,e=c.Deferred(),f=function(b){if(b&&!b.entry)b.entry=a;e.resolve([b])},g;b=b||"";a.isFile?a._file?(a._file.relativePath=b,e.resolve(a._file)):a.file(function(a){a.relativePath=b;e.resolve(a)},f):a.isDirectory?(g=a.createReader(),g.readEntries(function(c){d._handleFileTreeEntries(c,b+
a.name+"/").done(function(a){e.resolve(a)}).fail(f)},f)):e.resolve([]);return e.promise()},_handleFileTreeEntries:function(a,b){var d=this;return c.when.apply(c,c.map(a,function(a){return d._handleFileTreeEntry(a,b)})).pipe(function(){return Array.prototype.concat.apply([],arguments)})},_getDroppedFiles:function(a){a=a||{};var b=a.items;if(b&&b.length&&(b[0].webkitGetAsEntry||b[0].getAsEntry))return this._handleFileTreeEntries(c.map(b,function(a){var b;if(a.webkitGetAsEntry){if(b=a.webkitGetAsEntry())b._file=
a.getAsFile();return b}return a.getAsEntry()}));return c.Deferred().resolve(c.makeArray(a.files)).promise()},_getSingleFileInputFiles:function(a){a=c(a);var b=a.prop("webkitEntries")||a.prop("entries");if(b&&b.length)return this._handleFileTreeEntries(b);b=c.makeArray(a.prop("files"));if(b.length)b[0].name===void 0&&b[0].fileName&&c.each(b,function(a,b){b.name=b.fileName;b.size=b.fileSize});else{a=a.prop("value");if(!a)return c.Deferred().resolve([]).promise();b=[{name:a.replace(/^.*\\/,"")}]}return c.Deferred().resolve(b).promise()},
_getFileInputFiles:function(a){if(!(a instanceof c)||a.length===1)return this._getSingleFileInputFiles(a);return c.when.apply(c,c.map(a,this._getSingleFileInputFiles)).pipe(function(){return Array.prototype.concat.apply([],arguments)})},_onChange:function(a){var b=this,d={fileInput:c(a.target),form:c(a.target.form)};this._getFileInputFiles(d.fileInput).always(function(e){d.files=e;b.options.replaceFileInput&&b._replaceFileInput(d.fileInput);b._trigger("change",c.Event("change",{delegatedEvent:a}),
d)!==!1&&b._onAdd(a,d)})},_onPaste:function(a){var b=a.originalEvent&&a.originalEvent.clipboardData&&a.originalEvent.clipboardData.items,d={files:[]};b&&b.length&&(c.each(b,function(a,b){var c=b.getAsFile&&b.getAsFile();c&&d.files.push(c)}),this._trigger("paste",c.Event("paste",{delegatedEvent:a}),d)!==!1&&this._onAdd(a,d))},_onDrop:function(a){a.dataTransfer=a.originalEvent&&a.originalEvent.dataTransfer;var b=this,d=a.dataTransfer,e={};d&&d.files&&d.files.length&&(a.preventDefault(),this._getDroppedFiles(d).always(function(d){e.files=
d;b._trigger("drop",c.Event("drop",{delegatedEvent:a}),e)!==!1&&b._onAdd(a,e)}))},_onDragOver:function(a){a.dataTransfer=a.originalEvent&&a.originalEvent.dataTransfer;var b=a.dataTransfer;if(b&&c.inArray("Files",b.types)!==-1&&this._trigger("dragover",c.Event("dragover",{delegatedEvent:a}))!==!1)a.preventDefault(),b.dropEffect="copy"},_initEventHandlers:function(){this._isXHRUpload(this.options)&&(this._on(this.options.dropZone,{dragover:this._onDragOver,drop:this._onDrop}),this._on(this.options.pasteZone,
{paste:this._onPaste}));c.support.fileInput&&this._on(this.options.fileInput,{change:this._onChange})},_destroyEventHandlers:function(){this._off(this.options.dropZone,"dragover drop");this._off(this.options.pasteZone,"paste");this._off(this.options.fileInput,"change")},_setOption:function(a,b){var d=c.inArray(a,this._specialOptions)!==-1;d&&this._destroyEventHandlers();this._super(a,b);d&&(this._initSpecialOptions(),this._initEventHandlers())},_initSpecialOptions:function(){var a=this.options;if(a.fileInput===
void 0)a.fileInput=this.element.is('input[type="file"]')?this.element:this.element.find('input[type="file"]');else if(!(a.fileInput instanceof c))a.fileInput=c(a.fileInput);if(!(a.dropZone instanceof c))a.dropZone=c(a.dropZone);if(!(a.pasteZone instanceof c))a.pasteZone=c(a.pasteZone)},_getRegExp:function(a){a=a.split("/");var b=a.pop();a.shift();return RegExp(a.join("/"),b)},_isRegExpOption:function(a,b){return a!=="url"&&c.type(b)==="string"&&/^\/.*\/[igm]{0,3}$/.test(b)},_initDataAttributes:function(){var a=
this,b=this.options,d=c(this.element[0].cloneNode(!1));c.each(d.data(),function(c,f){var g="data-"+c.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase();d.attr(g)&&(a._isRegExpOption(c,f)&&(f=a._getRegExp(f)),b[c]=f)})},_create:function(){this._initDataAttributes();this._initSpecialOptions();this._slots=[];this._sequence=this._getXHRPromise(!0);this._sending=this._active=0;this._initProgressObject(this);this._initEventHandlers()},active:function(){return this._active},progress:function(){return this._progress},
add:function(a){var b=this;if(a&&!this.options.disabled)a.fileInput&&!a.files?this._getFileInputFiles(a.fileInput).always(function(c){a.files=c;b._onAdd(null,a)}):(a.files=c.makeArray(a.files),this._onAdd(null,a))},send:function(a){if(a&&!this.options.disabled){if(a.fileInput&&!a.files){var b=this,d=c.Deferred(),e=d.promise(),f,g;e.abort=function(){g=!0;if(f)return f.abort();d.reject(null,"abort","abort");return e};this._getFileInputFiles(a.fileInput).always(function(c){if(!g)c.length?(a.files=c,
f=b._onSend(null,a).then(function(a,b,c){d.resolve(a,b,c)},function(a,b,c){d.reject(a,b,c)})):d.reject()});return this._enhancePromise(e)}a.files=c.makeArray(a.files);if(a.files.length)return this._onSend(null,a)}return this._getXHRPromise(!1,a&&a.context)}})});
instrument_function(function(){(function(){$.fn.ksr_uploader=function(c){function a(a,d){return $.pollster(a,function(a){if(a.image_src)return d.find(".success img.preview").attr("src",a.image_src).removeAttr("data-status_url"),d.removeClass("encoding"),c.after_encode&&c.after_encode(),!0;return!1})}c=c||{};return $(this).each(function(){function b(a){s=a;f.data("uploading",a)}function c(d){var e=m.find(".success");if(typeof d==="string")try{d=$.parseJSON(d)||{}}catch(g){d={}}b(!1);d.image_src&&e.find("img.preview").attr("src",
d.image_src);d.status_url&&(q=a(d.status_url,l));n.attr("data-status_url",d.status_url);f.trigger("file_added",[d]);o.val(p);l.removeClass("uploading");l.addClass("has_file")}function e(a){$.ajax({url:f.data("assetPath"),data:{file_name:encodeURIComponent(a.name),content_type:a.type,updated_at:(a.lastModifiedDate||new Date).getTime(),file_size:a.size,s3_key:_.findWhere(i,{name:"key"}).value},type:"POST",success:function(a){c(a)},error:function(a){m.trigger("ksr_file_upload:reset");b(!1);growl({error:"Could not upload this file. "+
a.responseText});l.removeClass("uploading")}})}var f=$(this),g=RegExp(window.location.host+"|^/"),k=!f.attr("url").match(g),i=k?_.map(f.data("params"),function(a,b){return{name:b,value:a}}):[{name:"new_style",value:!0}],h=f.siblings(".progress"),j=f.parent(),l=j.parent(),m=f.closest("form"),n=l.find(".success img.preview"),o=m.find("input[type=submit]"),p=o.val(),q,s=!1,r;f.siblings("label").hide();f.fileupload({dataType:"text",dropZone:j,url:f.attr("url"),type:"POST",replaceFileInput:!1,add:function(a,
c){q&&q.stop();r=c.submit();b(!0);h.removeClass("finished");l.addClass("uploading");f.trigger("file_queued");window.onbeforeunload=function(){if(s)return'Your upload has not completed yet. Click "Stay on Page" to let your upload finish. Click "Leave Page" to abandon your upload.'}},submit:function(a,b){k||i.push({name:"authenticity_token",value:$('meta[name="csrf-token"]').attr("content")});b.formData=i},done:function(a,b){k?e(b.files[0]):c(b.result)},progress:function(a,b){var c=parseInt(b.loaded/
b.total*100,10);h.find(".bar").css("width",c+"%");h.find(".percentage").text(c+"%");c===100&&(h.addClass("finished"),h.find(".percentage").text("Processing..."),o.val("Processing, please wait..."))},fail:function(){f.trigger("error");m.trigger("ksr_file_upload:reset");b(!1);growl({error:"There was an error with this file. Please try a different file."});o.val(p);l.removeClass("uploading")}});n.data("status_url")&&(q=a(n.data("status_url"),l),n.removeAttr("status_url"));j.on("pollster:stop",function(){q&&
q.stop()});j.on("ksr_file_upload:cancel cancel",function(){r&&r.abort();m.trigger("ksr_file_upload:reset");f.trigger("error");b(!1)});j.on("destroy",function(){j.trigger("ksr_file_upload:cancel")});j.on("resize",function(){j.find("object").attr("width",j.outerWidth()).attr("height",j.outerHeight())})})}})()})(this);
instrument_function(function(){(function a(){var b=$("#curated_pages_show .published .add_photo_button, .header .image.value:visible"),d,e;b.length&&(d=$("#curated_pages_show .header .image.value"),e=d.find(".progress"),$(".curated_page_photo").fileupload({dataType:"text",dropZone:b,url:$(".curated_page_photo").attr("url"),type:"POST",formData:function(){return{authenticity_token:$('meta[name="csrf-token"]').attr("content")}},send:function(){d.show();e.show();d.find("img").hide();e.removeClass("finished");
b.is(".add_photo_button")&&(b.css("visibility","hidden"),b.closest(".header").removeClass("without_photo").addClass("with_photo"))},done:function(f,g){e.hide();d.find("img").attr("src",g.result);d.find("img").show();d.closest(".header").removeClass("without_photo").addClass("with_photo");e.find(".percentage").text("0%");b.is(".add_photo_button")&&(b.remove(),a())},progress:function(a,b){var d=Math.round(b.loaded/b.total*100);e.find(".bar").css("width",d+"%");e.find(".percentage").text(d+"%");d===
100&&(e.addClass("finished"),e.find(".percentage").text(""))},fail:function(){e.hide();d.find("img").show();b.is(".add_photo_button")&&(d.hide(),b.css("visibility","visible"),b.closest(".header").removeClass("with_photo").addClass("without_photo"))}}))})()})(this);
