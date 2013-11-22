/**
 * Created with IntelliJ IDEA.
 * User: GXReiser
 * Date: 11/22/13
 * Time: 2:32 PM
 * To change this template use File | Settings | File Templates.
 */
exports.execute = function(context, callback){

    if(context.sockets){
        context.socket.get("nickname",function(err, name){
            var nick = "unknown";

            if(name){
                nick = name;
            }
            var dice_args = context.args.replace(' ','').toLowerCase().split('d');
            var num_dice = dice_args[0];
            var type_dice = dice_args[1];
            var result = "result: ";
            var total = 0;
            for(var i=0; i<num_dice; i++){
                result += Math.floor(Math.random()*type_dice)+1;
                total += result;
            }
            result += " total: "+total;
            context.sockets.in(context.channel).emit("channel",nick+": "+result);
        });

    }

    callback();

};