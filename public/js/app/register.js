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
       var first = $("#form-first").val();
       var last = $("#form-last").val();
       var username = $("#form-u").val();
	   var password = $("#form-p").val();
	   var password2 = $("#form-p2").val();
	   var email = $("#form-e").val();
	   if(password !== password2){
		 $(".alert").fadeIn(function(){
         	setTimeout(function(){$(".alert").fadeOut();}, 3000);
         });
		 $("#error").html("Passwords must match");
	   }
       password = base64.encode(password);
       $.ajax({
           headers: { user: username, pass: password, email: email, firstname: first, lastname: last },
           url:'/users/register',
           method: 'post',
           success: function(data){
                console.log(data);
                if(data.success){
                    window.location = "/login";
                } else {
                    $(".alert").fadeIn(function(){
                        setTimeout(function(){$(".alert").fadeOut();}, 3000);
                    });
                    $("#error").html(data.errors.message);
                }

           },
           error: function(err){
               $(".alert").fadeIn(function(){
                   setTimeout(function(){$(".alert").fadeOut();}, 3000);
               });
                $("#error").html(err.message);
           }
       });

   })
});