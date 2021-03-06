/**
 * Created by rolly_000 on 7/17/2015.
 */
YAML=function(){function i(e){return{parent:null,length:0,level:e,lines:[],children:[],addChild:function(e){this.children.push(e);e.parent=this;++this.length}}}function s(){var e;try{e=new XMLHttpRequest}catch(t){var n=new Array("MSXML2.XMLHTTP.5.0","MSXML2.XMLHTTP.4.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP");var r=false;for(var i=0;i<n.length&&!r;i++){try{e=new ActiveXObject(n[i]);r=true}catch(t){}}if(!r){throw new Error("Unable to create XMLHttpRequest.")}}return e}function o(e,t){var n=s();n.onreadystatechange=function(){if(this.readyState==4||this.status==200){var e=this.responseText;t(YAML.eval(e))}};n.open("GET",e);n.send()}function u(t){var n=r["regLevel"];var s=r["invalidLine"];var o=t.split("\n");var u;var a=0,f=0;var l=[];var c=new i(-1);var h=new i(0);c.addChild(h);var p=[];var d="";l.push(h);p.push(a);for(var v=0,m=o.length;v<m;++v){d=o[v];if(d.match(s)){continue}if(u=n.exec(d)){a=u[1].length}else a=0;if(a>f){var g=h;h=new i(a);g.addChild(h);l.push(h);p.push(a)}else if(a<f){var y=false;var b=p.length-1;for(;b>=0;--b){if(p[b]==a){h=new i(a);l.push(h);p.push(a);if(l[b].parent!=null)l[b].parent.addChild(h);y=true;break}}if(!y){e.push("Error: Invalid indentation at line "+v+": "+d);return}}h.lines.push(d.replace(r["trim"],""));f=a}return c}function a(e){e=e.replace(r["trim"],"");var t=null;if(e=="true"){return true}else if(e=="false"){return false}else if(e==".NaN"){return Number.NaN}else if(e=="null"){return null}else if(e==".inf"){return Number.POSITIVE_INFINITY}else if(e=="-.inf"){return Number.NEGATIVE_INFINITY}else if(t=e.match(r["dashesString"])){return t[1]}else if(t=e.match(r["quotesString"])){return t[1]}else if(t=e.match(r["float"])){return parseFloat(t[0])}else if(t=e.match(r["integer"])){return parseInt(t[0])}else if(!isNaN(t=Date.parse(e))){return new Date(t)}else if(t=e.match(r["single_key_value"])){var n={};n[t[1]]=a(t[2]);return n}else if(t=e.match(r["array"])){var i=0,s=" ";var n=[];var o="";var u=false;for(var f=0,l=t[1].length;f<l;++f){s=t[1][f];if(s=="'"||s=='"'){if(u===false){u=s;o+=s;continue}else if(s=="'"&&u=="'"||s=='"'&&u=='"'){u=false;o+=s;continue}}else if(u===false&&(s=="["||s=="{")){++i}else if(u===false&&(s=="]"||s=="}")){--i}else if(u===false&&i==0&&s==","){n.push(a(o));o="";continue}o+=s}if(o.length>0)n.push(a(o));return n}else if(t=e.match(r["map"])){var i=0,s=" ";var n=[];var o="";var u=false;for(var f=0,l=t[1].length;f<l;++f){s=t[1][f];if(s=="'"||s=='"'){if(u===false){u=s;o+=s;continue}else if(s=="'"&&u=="'"||s=='"'&&u=='"'){u=false;o+=s;continue}}else if(u===false&&(s=="["||s=="{")){++i}else if(u===false&&(s=="]"||s=="}")){--i}else if(u===false&&i==0&&s==","){n.push(o);o="";continue}o+=s}if(o.length>0)n.push(o);var c={};for(var f=0,l=n.length;f<l;++f){if(t=n[f].match(r["key_value"])){c[t[1]]=a(t[2])}}return c}else return e}function f(e){var t=e.lines;var n=e.children;var r=t.join(" ");var i=[r];for(var s=0,o=n.length;s<o;++s){i.push(f(n[s]))}return i.join("\n")}function l(e){var t=e.lines;var n=e.children;var r=t.join("\n");for(var i=0,s=n.length;i<s;++i){r+=l(n[i])}return r}function c(n){var i=null;var s={};var o=null;var u=null;var h=null;var p=-1;var d=[];var v=true;for(var m=0,g=n.length;m<g;++m){if(p!=-1&&p!=n[m].level)continue;d.push(m);p=n[m].level;o=n[m].lines;u=n[m].children;h=null;for(var y=0,b=o.length;y<b;++y){var w=o[y];if(i=w.match(r["key"])){var E=i[1];if(E[0]=="-"){E=E.replace(r["item"],"");if(v){v=false;if(typeof s.length==="undefined"){s=[]}}if(h!=null)s.push(h);h={};v=true}if(typeof i[2]!="undefined"){var S=i[2].replace(r["trim"],"");if(S[0]=="&"){var x=c(u);if(h!=null)h[E]=x;else s[E]=x;t[S.substr(1)]=x}else if(S[0]=="|"){if(h!=null)h[E]=l(u.shift());else s[E]=l(u.shift())}else if(S[0]=="*"){var T=S.substr(1);var N={};if(typeof t[T]=="undefined"){e.push("Reference '"+T+"' not found!")}else{for(var C in t[T]){N[C]=t[T][C]}if(h!=null)h[E]=N;else s[E]=N}}else if(S[0]==">"){if(h!=null)h[E]=f(u.shift());else s[E]=f(u.shift())}else{if(h!=null)h[E]=a(S);else s[E]=a(S)}}else{if(h!=null)h[E]=c(u);else s[E]=c(u)}}else if(w.match(/^-\s*$/)){if(v){v=false;if(typeof s.length==="undefined"){s=[]}}if(h!=null)s.push(h);h={};v=true;continue}else if(i=w.match(/^-\s*(.*)/)){if(h!=null)h.push(a(i[1]));else{if(v){v=false;if(typeof s.length==="undefined"){s=[]}}s.push(a(i[1]))}continue}}if(h!=null){if(v){v=false;if(typeof s.length==="undefined"){s=[]}}s.push(h)}}for(var m=d.length-1;m>=0;--m){n.splice.call(n,d[m],1)}return s}function h(e){var t=c(e.children);return t}function p(e){var t;var n=e.split("\n");var i=r["comment"];for(var s in n){if(t=n[s].match(i)){if(typeof t[3]!=="undefined"){n[s]=t[0].substr(0,t[0].length-t[3].length)}}}return n.join("\n")}function d(r){e=[];t=[];n=(new Date).getTime();var i=p(r);var s=u(i);var o=h(s);n=(new Date).getTime()-n;return o}var e=[],t=[],n=0,r={regLevel:new RegExp("^([\\s\\-]+)"),invalidLine:new RegExp("^\\-\\-\\-|^\\.\\.\\.|^\\s*#.*|^\\s*$"),dashesString:new RegExp('^\\s*\\"([^\\"]*)\\"\\s*$'),quotesString:new RegExp("^\\s*\\'([^\\']*)\\'\\s*$"),"float":new RegExp("^[+-]?[0-9]+\\.[0-9]+(e[+-]?[0-9]+(\\.[0-9]+)?)?$"),integer:new RegExp("^[+-]?[0-9]+$"),array:new RegExp("\\[\\s*(.*)\\s*\\]"),map:new RegExp("\\{\\s*(.*)\\s*\\}"),key_value:new RegExp("([a-z0-9_-][ a-z0-9_-]*):( .+)","i"),single_key_value:new RegExp("^([a-z0-9_-][ a-z0-9_-]*):( .+?)$","i"),key:new RegExp("([a-z0-9_-][ a-z0-9_-]+):( .+)?","i"),item:new RegExp("^-\\s+"),trim:new RegExp("^\\s+|\\s+$"),comment:new RegExp("([^\\'\\\"#]+([\\'\\\"][^\\'\\\"]*[\\'\\\"])*)*(#.*)?")};return{fromURL:o,eval:d,getErrors:function(){return e},getProcessingTime:function(){return n}}}()
