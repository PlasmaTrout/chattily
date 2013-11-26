/**
 * Created with IntelliJ IDEA.
 * User: GXReiser
 * Date: 11/24/13
 * Time: 2:00 AM
 * To change this template use File | Settings | File Templates.
 */



GLOBAL._users = {};
exports.addUser = function(name, socketId){
    GLOBAL._users[socketId] = name;
};
exports.getUser = function(socketId){
    return GLOBAL._users[socketId];
};
exports.getSocketIdForUser = function(username){
    for(var u in GLOBAL._users){
        if(GLOBAL._users[u] === username){
            return u;
        }
    }
}
exports.getRoomsForUser = function(socketId){
    return io.sockets.manager.rooms.map(function(item){
        console.log(item);
        return item;
    });
};

exports.userExist = function(username){
    var ret = false;
    for(var u in GLOBAL._users){
        if(GLOBAL._users[u] === username){
            ret = true;
        }
    }
    return ret;

}
