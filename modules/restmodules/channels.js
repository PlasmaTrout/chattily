
exports.getActiveRooms = function(req,res,sockets) {
	if(sockets){
		res.send(sockets.manager.rooms);
	}else{
		res.send({});
	}
}

exports.getSocketsInRoom = function(req,res,sockets) {
	var room = req.params.room;
    var users = {};
	if(sockets) {
		var ids = sockets.clients(room).map(function(item){
            return { "username":item.store.data.username, "id":item.id, "email":item.store.data.email };
		});
        users.users = ids;
		res.send(users);
	}else{
		res.send({});
	}
}