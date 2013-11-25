/**
 * Created with IntelliJ IDEA.
 * User: GXReiser
 * Date: 11/23/13
 * Time: 2:55 AM
 * To change this template use File | Settings | File Templates.
 */
jpackage("app.services", function(){
   this.client = function(){
       this._dataProcessor = new app.services.clientDataProcessor('#testResultPanel');
       this.init = function() {
       };
       this._data = function(data){
           this._dataProcessor._data(data);
       };
       this._info = function(message){
           var div = $('<div></div>');
           var container = $('#testResultPanel');
           div.addClass("info");
           div.html(message);
           container.append(div);
           container.parent().animate({ scrollTop: container.parent()[0].scrollHeight}, 100);
       }
       this.connect = function(){
           var _this = this;
           this.socket = io.connect();
           this.socket.emit("auth", {"user":App.settings.user.name, "pass":App.settings.user.enc_pass});
           setTimeout(function(){_this._info('<br/>Joined Channel!')}, 500);
           this.socket.on("channel",function(clientObj){
               _this._data(clientObj);
           });
           this.socket.on("private_message",function(clientObj){
               _this._data(clientObj);
           });
           this.socket.on("info",function(clientObj){
               _this._info(clientObj);
           });
           this.socket.on("rejected",function(clientObj){
              window.location = "/logout";
           });
       };
       this.send = function(command){
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
   };
});