
exports.getActiveRooms = function(req,res,sockets) {
	if(sockets){
		res.send(sockets.manager.rooms);
	}else{
		res.send({});
	}
}

exports.getSocketsInRoom = function(req,res,io) {
	var room = req.params.room;
	console.log(room);

	if(io) {
		var ids = [];
		io.of(room).clients((error,clients) => {
			clients.forEach(element => {
				ids.push({
					username: element.username
				});
			});
		});
		/*.map(function(item){
            return { "username":item.store.data.username, "id":item.store.data._id, "email":item.store.data.email };
		});*/
		console.log(ids);
		res.send(ids);
	}else{
		res.send({});
	}
}