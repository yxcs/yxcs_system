(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1c01abaa"],{"65b3":function(e,t,a){},baa5:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"user__wrap"},[a("Top"),a("div",{staticClass:"user__update"},[e.isUpdate?a("el-form",{attrs:{"label-position":"right","label-width":"80px",model:e.updateForm}},[a("el-form-item",{attrs:{label:"名称"}},[a("el-input",{attrs:{size:"small",disabled:""},model:{value:e.updateForm.username,callback:function(t){e.$set(e.updateForm,"username",t)},expression:"updateForm.username"}})],1),a("el-form-item",{attrs:{size:"small",label:"座右铭"}},[a("el-input",{attrs:{size:"small"},model:{value:e.updateForm.slogan,callback:function(t){e.$set(e.updateForm,"slogan",t)},expression:"updateForm.slogan"}})],1),a("el-form-item",{attrs:{label:"我的通知"}},[a("el-input",{attrs:{type:"textarea",rows:3,size:"small"},model:{value:e.updateForm.notice,callback:function(t){e.$set(e.updateForm,"notice",t)},expression:"updateForm.notice"}})],1),a("el-form-item",{attrs:{label:"头像"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:e.uploadUrl,"show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload}},[e.updateForm.avatar?a("img",{staticClass:"avatar",attrs:{src:e.updateForm.avatar}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),a("el-form-item",[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(t){return e.updateUser(!1)}}},[e._v("提交")]),a("el-button",{attrs:{size:"small"},on:{click:function(t){return e.resetPassword()}}},[e._v("重设密码")])],1)],1):a("el-form",{attrs:{"label-position":"right","label-width":"80px",model:e.resetPwd}},[a("el-form-item",{attrs:{label:"密码"}},[a("el-input",{attrs:{size:"small","show-password":""},model:{value:e.resetPwd.pwd,callback:function(t){e.$set(e.resetPwd,"pwd",t)},expression:"resetPwd.pwd"}})],1),a("el-form-item",{attrs:{size:"small",label:"确认密码"}},[a("el-input",{attrs:{size:"small","show-password":""},model:{value:e.resetPwd.resPwd,callback:function(t){e.$set(e.resetPwd,"resPwd",t)},expression:"resetPwd.resPwd"}})],1),a("el-form-item",[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(t){return e.updateUser(!0)}}},[e._v("重置")]),a("el-button",{attrs:{size:"small"},on:{click:function(t){return e.resetPassword()}}},[e._v("更新信息")])],1)],1),a("el-form",{attrs:{"label-width":"80px"}},[a("el-form-item",[a("el-button",{staticClass:"logout",attrs:{size:"small",type:"default"},on:{click:function(t){return e.gotoWorks()}}},[e._v("我的作品集")])],1),a("el-form-item",[a("el-button",{staticClass:"logout",attrs:{size:"small",type:"danger"},on:{click:function(t){return e.logout()}}},[e._v("退出")])],1)],1)],1)],1)},r=[],o=a("e20c"),n=(a("b667"),a("7249"),a("23b1")),l=a.n(n),i=(a("d83c"),a("2686")),u=a.n(i),d=(a("749b"),a("fea4")),c=a.n(d),p=(a("7d73"),a("e056")),m=a.n(p),g=(a("a229"),a("92e1")),f=a.n(g),h=a("591a"),w=a("db49"),b=function(){return a.e("chunk-1eb4c330").then(a.bind(null,"e9c9"))},v={name:"CurrentUser",data:function(){return{isUpdate:!0,updateForm:{id:"",username:"",slogan:"",notice:"",avatar:""},resetPwd:{pwd:"",resPwd:""},uploadUrl:""}},components:{Top:b,"el-form":f.a,"el-form-item":m.a,"el-input":c.a,"el-upload":u.a,"el-button":l.a},mounted:function(){this.uploadUrl="".concat(w["c"],"/uploadfile"),this.setNavType("user");var e=localStorage.getItem("token"),t=localStorage.getItem("userId");e&&t?this.getUserMsg(t):this.$router.push("/login?redirect=".concat(this.$route.path))},methods:Object(o["a"])({},Object(h["c"])("global",["setNavType","setUser"]),{getUserMsg:function(e){var t=this;this.$http.login.getUserById({id:e}).then(function(e){if(200===e.status&&200===e.data.status){var a=e.data.data;t.updateForm={id:a.id,username:a.username,slogan:a.slogan,notice:a.notice,avatar:a.avatar},t.setUser(a)}})},updateUser:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],a=this.updateForm,s=this.resetPwd,r={};if(t){if(r={password:s.pwd},!s.pwd)return this.$message.warning("请输入密码"),!1;if(s.pwd.length<4)return this.$message.warning("密码至少4个字符"),!1;if(s.pwd!==s.resPwd)return this.$message.warning("输入的密码不一致"),!1}else r={username:a.username,avatar:a.avatar,notice:a.notice,slogan:a.slogan};this.$http.login.updateUserById(a.id,r).then(function(t){if(200===t.status&&200===t.data.status){var a=t.data.data;e.isUpdate=!0,e.resetPwd={pwd:"",resPwd:""},e.updateForm={id:a.id,username:a.username,slogan:a.slogan,notice:a.notice,avatar:a.avatar},e.setUser(a),e.$message.success(t.data.message)}})},resetPassword:function(){this.isUpdate=!this.isUpdate},handleAvatarSuccess:function(e){this.updateForm.avatar=e.url},beforeAvatarUpload:function(e){var t=["image/png","image/jpeg","image/jpg","image/gif"],a=2;return-1===t.indexOf(e.type)?(this.$message.warning("图片格式只能是jpeg、jpg、png、gif"),!1):!(e.size>1024*a*1024)||(this.$message.warning("图片超过2M"),!1)},gotoWorks:function(){this.$router.push("/user/".concat(this.updateForm.id))},logout:function(){localStorage.removeItem("token"),localStorage.removeItem("userId"),this.$router.push("/login?redirect=".concat(this.$route.path))}})},U=v,k=(a("d79b"),a("17cc")),P=Object(k["a"])(U,s,r,!1,null,"0b442e69",null);t["default"]=P.exports},d79b:function(e,t,a){"use strict";var s=a("65b3"),r=a.n(s);r.a}}]);