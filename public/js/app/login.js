/**
 * Created with IntelliJ IDEA.
 * User: GXReiser
 * Date: 11/22/13
 * Time: 8:03 PM
 * To change this template use File | Settings | File Templates.
 */


$(document).ready(function(){
   $("form").submit(function(event){
       event.preventDefault();
       var username = $("#form-u").val();
       var password = base64.encode($("#form-p").val());
       $.ajax({
           headers: { user: username, pass: password },
           url:'/users/authenticate',
           method: 'post',
           success: function(data){
                if(data.success){
                    App.settings.user = {};
                    App.settings.user.name = data.user.cn;
                    App.settings.user.fullName = data.user.fullName;
                    App.settings.user.email = data.user.mail;

                    CookieUtil.write("sec", JSON.stringify(App.settings.user), null, '/', null);
                    window.location = "/";
                } else {

                }

           },
           error: function(err){

           }
       });

   })
});