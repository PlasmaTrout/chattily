/**
 * Created with IntelliJ IDEA.
 * User: GXReiser
 * Date: 11/23/13
 * Time: 2:55 AM
 * To change this template use File | Settings | File Templates.
 */
jpackage("app.services", function(){
   this.client = function(){
       this._dataProcessor = new app.services.clientDataProcessor('#ChatView');
       this.init = function() {
       };
       this._data = function(data){
           this._dataProcessor._data(data);
       };
       this._info = function(message){
           var div = $('<div></div>');
           var container = $('#ChatView');
           div.addClass("info");
           div.html(message);
           container.append(div);
           var scrollHeight = $('.page')[0].scrollHeight;
           if(scrollHeight > DOC_HEIGHT){
               $(".page").animate({ scrollTop: scrollHeight }, 100);
           }

           $.titleAlert("Attention!", {
               requireBlur:true,
               stopOnFocus:true,
               duration:30000,
               interval:500
           });
           //container.parent().animate({ scrollTop: container.parent()[0].scrollHeight}, 100);
       }
       this.connect = function(){
           $.ajax({
               url: '/revision',
               success: function(data){
                   App.settings.revision = data;
                   console.log(data);
               }
           })
           var _this = this;
           this.socket = io.connect();

           this.socket.on("channel",function(clientObj){
               _this._data(clientObj);
           });
           this.socket.on("private_message",function(clientObj){
               _this._data(clientObj);
           });
           this.socket.on("info",function(clientObj){
               _this._info(clientObj);
               App.usersView.update();
           });
           this.socket.on("joined",function(clientObj){
               _this._info(clientObj.user+" has joined "+clientObj.channel);
           });
           this.socket.on("left",function(clientObj){
               _this._info(clientObj.user+" has left "+clientObj.channel);
           });
           this.socket.on("rejected",function(clientObj){
              window.location = "/logout";
           });
           this.socket.on("disconnect", function(clientObj){
               alert("You have been disconnected, please wait to be reconnected!<br/>If a reload is required, it will do that automatically!");
           });
           this.socket.on("connect", function(clientObj){
               _this.isReloadRequired();
               $("#errorAlert").hide();
               _this.socket.emit("auth", {"user":App.settings.user.name, "pass":App.settings.user.enc_pass});
               setTimeout(function(){_this._info('<br/>Joined Channel!')}, 500);
           });
       };
       this.send = function(command){
           App.history.push(command);
           App.localstorage.setItem("history", JSON.stringify(App.history));
           if(App.history.length > 10){
               App.history.reverse();
               App.history.pop();
               App.history.reverse();
           }
           var cmdObj = {
               user: App.settings.user.name,
               channel: "global"
           };
           // If the incoming line is an actual command its prefixed with a /
           if (command.charAt(0) === "/") {
               // First split the spaces and then reverse so we can pop out
               // the actual command.
               var parts = command.split(' ');
               parts.reverse();
               cmdObj.command = parts.pop();
               parts.reverse();
               cmdObj.args = parts;
           } else {
               // Otherwise the command is just a say command to the channel
               cmdObj.command = "/say";
               cmdObj.args = command;

           }
           this.socket.emit("command", cmdObj);
           return false;
       };
       this.isReloadRequired = function(){
           $.ajax({
               url: '/revision',
               success: function(data){
                   if(App.settings.revision != data){
                       window.location = '/';
                   }
               }
           });
       }
   };
});