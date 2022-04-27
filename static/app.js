const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const { networkInterfaces } = require('os');
const path = require('path');
const { requestTime, logger } = require('./middlewares');
const { argv } = require("process");
const { clear } = require("console");

// const nets = networkInterfaces();
// console.log(nets)
/*
app.use(function(request, response, next){

	console.log("center ccenter center");
	next();
});
*/

// const PORT = 8000
console.log('Server started...')
// app.use(express.static(path.resolve(__dirname, 'static')));
app.use(express.static(__dirname))


// app.set('port', process.env.PORT || 8000)
console.log(process.env.PORT)
const PORT = process.env.PORT ?? 8000
/*
app.use(function(request, response, next){
     
	console.log("Middleware 1");
	next();
});
app.use(function(request, response, next){
	 
	console.log("Middleware 2");
	next();
});
*/

let movie_name = "";

/*
app.get("/", (req, res) => {
	console.log(req)
	// res.sendFile(__dirname + "/index.html");
	res.sendFile(path.resolve(__dirname, 'static', 'index.html'));
})
*/

app.get("/download", (req, res) => {
	res.download(path.resolve(__dirname, '1.mp4'));
});
let acc = 0;


const name1 = 3333333;
app.get("/video", function a1(req, res) {
	argv.forEach((value, index) => {
		console.log(`Anime is ${value}, ${index}`);	
	})	
	const range = req.headers.range;
		
	// console.log(req, res)
	console.log(`this is: ${name1}`)	

	console.log(range);
	if (!range) {
		res.status(400).send("Requires Range header");
	}

	acc++;
	//console.log(`movie_name: ${movie_name}, index: ${acc}, name ${name}`);

	const videoPath = "static/1.mp4";
	console.log(videoPath);

	const videoSize = fs.statSync(videoPath).size;
	const CHUNK_SIZE = 10 ** 6;
	const start = Number(range.replace(/\D/g, ""));
	const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
	const contentLength = end - start + 1;
	const headers = {
		"Content-Range": `bytes ${start}-${end}/${videoSize}`,
		"Accept-Ranges": "bytes",
		"Content-Length": contentLength,
		"Content-Type": "video/mp4",
	};

	res.writeHead(206, headers);
	const videoStream = fs.createReadStream(videoPath, { start, end });

	console.log(`videoStream ${videoStream.end}`)
	videoStream.pipe(res);

	console.log(`videoStream ${videoStream.end}`)

});
/*
set_tim = setTimeout(()=>{
	console.log("Hello World")
}, 3000)
clearTimeout(set_tim);
*/

// setInterval(() => {
// 	console.log("私はバカです。")
// }, 100);


let timerId = setTimeout(function tick() {
	console.log('Hi');
  timerId = setTimeout(tick, 2000); // (*)
}, 2000);

app.use(bodyParser.json());
app.post("/save", async (request, response) => {

  console.log(request.body);

	text = request.body['movie'];
	movie_name = text;
	console.log(text);

  console.log(request.headers['user-agent']);

	var ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
	console.log(ip);

  if (!request.body) return response.sendStatus(400);


});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}!`);
});



