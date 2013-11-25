/**
 * Created with IntelliJ IDEA.
 * User: GXReiser
 * Date: 11/24/13
 * Time: 7:59 PM
 * To change this template use File | Settings | File Templates.
 */
var co = require("./clientobject");
var users = require("../collections/users");
exports.execute = function(context, callback){

    var ctx = new co.ClientObject(context);
    var parts = context.args;
    parts.reverse();
    var username = parts.pop();
    parts.reverse();
    context.args = parts.join(' ');
    context.type = "private_message";

    if(context.sockets) {
        ctx.setMessage(context.args);
        //send a message to the sender (so his sent /tell shows up in chat)
        context.sockets.in(context.user).emit("private_message",ctx);
        //send a message to target (so it's only seen by him and the sender)
        context.sockets.in(username).emit("private_message",ctx);
        console.log("private message send to "+username);
    }

    callback(true);

};