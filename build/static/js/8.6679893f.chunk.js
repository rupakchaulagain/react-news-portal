(this["webpackJsonpnews-portal"]=this["webpackJsonpnews-portal"]||[]).push([[8],{664:function(e,a,t){"use strict";t.r(a);var n=t(174),l=t(90),o=t(91),r=t(94),c=t(92),s=t(0),m=t.n(s),u=t(93),i=t(40),p=t(55),h=t(173),d=function(e){Object(r.a)(t,e);var a=Object(c.a)(t);function t(){var e;Object(l.a)(this,t);for(var o=arguments.length,r=new Array(o),c=0;c<o;c++)r[c]=arguments[c];return(e=a.call.apply(a,[this].concat(r))).loginmethod=function(a){a.preventDefault(),console.log(e.state.username),console.log(e.state.password);var t={username:e.state.username,password:e.state.password};h.post("https://frozen-refuge-74833.herokuapp.com/users/login",t).then((function(e){if(console.log(e),200===e.data.code){var a=new u.a;console.log(e.data.token),a.set("token","Bearer "+e.data.token,{path:"/"}),console.log(a.get("token")),window.location.replace("/home/")}else alert("Authentication Failed")})).catch((function(e){alert("Authentication Failed"),console.log(e)}))},e.handleInputChange=function(a){var t=a.target,l=t.name,o=t.value;e.setState(Object(n.a)({},l,o))},e}return Object(o.a)(t,[{key:"render",value:function(){return m.a.createElement("div",{className:"c-app c-default-layout flex-row align-items-center"},m.a.createElement(i.l,null,m.a.createElement(i.Q,{className:"justify-content-center"},m.a.createElement(i.k,{md:"8"},m.a.createElement(i.i,null,m.a.createElement(i.g,{className:"p-4"},m.a.createElement(i.h,null,m.a.createElement(i.u,{onSubmit:this.loginmethod},m.a.createElement("h1",null,"Login"),m.a.createElement("p",{className:"text-muted"},"Sign In to your account"),m.a.createElement(i.A,{className:"mb-3"},m.a.createElement(i.B,null,m.a.createElement(i.C,null,m.a.createElement(p.a,{name:"cil-user"}))),m.a.createElement(i.z,{type:"text",name:"username",onChange:this.handleInputChange,placeholder:"Username",autoComplete:"username"})),m.a.createElement(i.A,{className:"mb-4"},m.a.createElement(i.B,null,m.a.createElement(i.C,null,m.a.createElement(p.a,{name:"cil-lock-locked"}))),m.a.createElement(i.z,{type:"password",name:"password",onChange:this.handleInputChange,placeholder:"Password",autoComplete:"current-password"})),m.a.createElement(i.Q,null,m.a.createElement(i.k,{xs:"6"},m.a.createElement(i.f,{type:"submit",color:"primary",className:"px-4"},"Login")))))))))))}}]),t}(m.a.Component);a.default=d}}]);
//# sourceMappingURL=8.6679893f.chunk.js.map