(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{169:function(t,e,r){"use strict";r.d(e,"a",(function(){return l})),r.d(e,"b",(function(){return d})),r.d(e,"c",(function(){return m}));var n=r(417),o=r(1),l=Object(o.g)("v-card__actions"),c=Object(o.g)("v-card__subtitle"),d=Object(o.g)("v-card__text"),m=Object(o.g)("v-card__title");n.a},539:function(t,e,r){"use strict";r.r(e);var n=r(26),o=(r(94),r(31),{data:function(){return{name:"",email:"",password:"",password_confirmation:"",role_id:3,show1:!1,show2:!1,error:[]}},methods:{register:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$axios.$get("sanctum/csrf-cookie");case 3:return e.next=5,t.$axios.$post("/api/register",{name:t.name,email:t.email,password:t.password,password_confirmation:t.password_confirmation,role_id:t.role_id});case 5:t.$router.push("/auth/done"),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),t.errors=e.t0.response.data.errors;case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()},reset:function(){this.name="",this.email="",this.password="",this.password_confirmation="",this.$refs.obs.reset()}}}),l=r(41),c=r(48),d=r.n(c),m=r(212),v=r(417),f=r(169),_=r(525),h=r(458),w=r(526),x=r(456),y=r(479),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-container",[r("v-row",{staticStyle:{height:"100vh"},attrs:{justify:"center","align-content":"center"}},[r("v-col",{attrs:{cols:"12",md:"4"}},[r("v-card",[r("v-card-title",{staticClass:"text-subtitle-1 text-md-h6 py-2 error"},[t._v("登録")]),t._v(" "),r("validation-observer",{ref:"obs",scopedSlots:t._u([{key:"default",fn:function(e){return[r("v-form",{staticClass:"pa-3"},[r("validation-provider",{attrs:{rules:"required|max:10",name:"名前"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("v-text-field",{attrs:{label:"名前",counter:"10",height:"30"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),t._v(" "),r("span",{staticClass:"text-md-subtitle-2 text-caption",staticStyle:{color:"red"}},[t._v(t._s(e.errors[0]))])]}}],null,!0)}),t._v(" "),r("validation-provider",{attrs:{rules:"required|email",name:"メールアドレス"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("v-text-field",{attrs:{label:"メールアドレス",type:"email",height:"30"},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),t._v(" "),r("span",{staticClass:"text-md-subtitle-2 text-caption",staticStyle:{color:"red"}},[t._v(t._s(e.errors[0]))])]}}],null,!0)}),t._v(" "),r("validation-provider",{attrs:{rules:"required|min:8|alpha_num",name:"パスワード"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("v-text-field",{attrs:{label:"パスワード",counter:"min","append-icon":t.show1?"mdi-eye":"mdi-eye-off",type:t.show1?"text":"password",height:"30"},on:{"click:append":function(e){t.show1=!t.show1}},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),t._v(" "),r("span",{staticClass:"text-md-subtitle-2 text-caption",staticStyle:{color:"red"}},[t._v(t._s(e.errors[0]))])]}}],null,!0)}),t._v(" "),r("validation-provider",{attrs:{rules:"required|min:8|alpha_num|confirmed:パスワード",name:"パスワード確認"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("v-text-field",{attrs:{label:"パスワード確認",counter:"min","append-icon":t.show2?"mdi-eye":"mdi-eye-off",type:t.show2?"text":"password",height:"30"},on:{"click:append":function(e){t.show2=!t.show2}},model:{value:t.password_confirmation,callback:function(e){t.password_confirmation=e},expression:"password_confirmation"}}),t._v(" "),r("span",{staticClass:"text-md-subtitle-2 text-caption",staticStyle:{color:"red"}},[t._v(t._s(e.errors[0]))])]}}],null,!0)}),t._v(" "),r("v-col",{staticClass:"text-right"},[r("v-btn",{attrs:{type:"button",color:"error"},on:{click:t.reset}},[t._v("\n                リセット\n              ")]),t._v(" "),r("v-btn",{staticClass:"ml-4",attrs:{type:"button",color:"primary",disabled:e.invalid||!e.validated},on:{click:t.register}},[t._v("\n                送信\n              ")])],1)],1)]}}])})],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;d()(component,{VBtn:m.a,VCard:v.a,VCardTitle:f.c,VCol:_.a,VContainer:h.a,VForm:w.a,VRow:x.a,VTextField:y.a})}}]);