var socket = io.connect();

socket.on('health-check',function(data){
	console.log(data);
	alert(data);
});
