/**
 * Created with IntelliJ IDEA.
 * User: GXReiser
 * Date: 11/25/13
 * Time: 7:40 PM
 * To change this template use File | Settings | File Templates.
 */
var co = require("./clientobject");
var users = require("../collections/users");

exports.execute = function(context, callback){

    var ctx = new co.ClientObject(context);
    for(var s in context.sockets.clients(context.args)){
        if(s.id === context.socket.id){
            context.socket.leave(context.args);
            context.channel = context.args;
            if(context.sockets) {
                ctx.setMessage(context.user);
                context.sockets.in(context.args).emit("left",ctx);
            }
            break;
        }
    }



    callback();

};