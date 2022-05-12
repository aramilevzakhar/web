const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const { networkInterfaces } = require('os');
const path = require('path');
const { requestTime, logger } = require('./middlewares');
const { argv } = require("process");
const a1aa = require("xlsx");

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
app.use(express.static(path.resolve(__dirname, 'static')));
// app.use(express.static(__dirname + '/static'))


let urlencodedParser = express.urlencoded({extended: false});


app.get("/postform", (req, res) => {
	res.sendFile(__dirname + "/static/something_form.html");
})
app.post("/postform", urlencodedParser, function (request, response) {
	if(!request.body) return response.sendStatus(400);
	console.log(request.body);
	response.send(`${request.body.userName} - ${request.body.userAge}`);
});


app.get("/download", (req, res) => {
	res.download(path.resolve(__dirname, '/static/1.mp4'));
});
let acc = 0;

app.get("/about", (req, res) => {
	res.sendFile(__dirname + "/static/about.html");
});

app.get("/study", (req, res) => {
	res.sendFile(__dirname + "/static/study.html");
})
app.get("/pictures", (req, res) => {
	res.sendFile(__dirname + "/static/Pictures.html");
});

app.get("/price", (req, res) => {
	res.sendFile(__dirname + "/static/price.html");
});
// app.set('port', process.env.PORT || 8000)
// console.log(process.env.PORT)
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





const name1 = 3333333;
app.get("/video", function a1(req, res) {
	const range = req.headers.range;
	
	if (!range) {
		res.status(400).send("Requires Range header");
	}

	acc++;
	//console.log(`movie_name: ${movie_name}, index: ${acc}, name ${name}`);

	const videoPath = "static/1.mp4";
	// console.log(videoPath);

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
	console.log(headers);
	const videoStream = fs.createReadStream(videoPath, { start, end });

	// console.log(`videoStream ${videoStream.end}`)
	videoStream.pipe(res);

	// console.log(`videoStream ${videoStream.end}`)

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

// function tick(p1, p2) {
// 	console.log(`hello ${p1}, ${p2}`);
// }
// setTimeout(tick, 3000, "anime", "porno");
// setInterval(tick, 3000, "anime", "変態");
// let timerId = setTimeout(function tick() {
// 	console.log('Hi');
//   timerId = setTimeout(tick, 2000); // (*)



// }, 2000);

// let start = Date.now();
// let times = [];

// setTimeout(function run() {
//   times.push(Date.now() - start); // запоминаем задержку от предыдущего вызова

//   if (start + 100 < Date.now()) console.log(times); // показываем задержку через 100 мс
//   else setTimeout(run); // если нужно ещё запланировать
// });


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



