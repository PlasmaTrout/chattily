/**
 * Created with IntelliJ IDEA.
 * User: GXReiser
 * Date: 11/24/13
 * Time: 2:00 AM
 * To change this template use File | Settings | File Templates.
 */



var _users = {};
exports.addUser = function(name, socketId){
    _users[socketId] = name;
};
exports.getUser = function(socketId){
    return _users[socketId];
};
exports.getRoomsForUser = function(socketId){
    return io.sockets.manager.rooms.map(function(item){
        console.log(item);
        return item;
    });
};
