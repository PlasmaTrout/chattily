/**
 * Created with IntelliJ IDEA.
 * User: GXReiser
 * Date: 11/22/13
 * Time: 2:32 PM
 * To change this template use File | Settings | File Templates.
 */
var co = require("./clientobject");

exports.execute = function(context, callback){

    var ctx = new co.ClientObject(context);

    if(context.sockets){
        context.socket.get("nickname",function(err, name){
            var nick = "unknown";

            if(name){
                nick = name;
            }
            ctx.user = nick;


            var dice_args = context.args.toString().toLowerCase().split('d');
            var num_dice = dice_args[0];
            var type_dice = dice_args[1];
            var result = "result: ";
            var total = 0;
            for(var i=0; i<num_dice; i++){
                var val = Math.floor(Math.random()*type_dice)+1;
                result += " "+i+"d"+type_dice+":"+val+" ";
                total += val;
            }
            result += " total: "+total;
            ctx.setMessage(result);
            context.sockets.in(context.channel).emit("channel",ctx);
        });

    }

    callback();

};