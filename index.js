var program = require('commander');

program.version('1.0.2')
	.usage("rdcli [OPTIONS] [cmd [arg [arg ...]]]")
	.option("-h, --host <host>",'Server hostname (default: 127.0.0.1).')
	.option("-p, --port <port>","Server port (default: 6379).", parseInt)
	.option("-a, --auth <password>",'Server password.')
	.option("-s, --socket <socket>","Server socket (overrides hostname and port).")
	.option("-m, --mode <mode>","Server Type, only redis available now.")
	.parse(process.argv);

var host = program.host || "127.0.0.1";
var port = program.port || 6379;
var auth = program.auth || null;
var mode = program.mode || "redis";
var socket = program.socket;
if(mode.toLowerCase() == 'redis') {
	var redisClient;
	if(socket !== undefined) {
		redisClient = require('./lib/redis')(socket);
	} else {
		redisClient = require('./lib/redis')(host, port, auth);
	}	
	if(program.args && program.args.length > 0){
		redisClient.execute(program.args)
		.then(function(){
			process.exit(0);
		});
	} else {
		redisClient.attachEvent();
	}
} else {
	console.log("Not Support %s Now!", mode);
}
