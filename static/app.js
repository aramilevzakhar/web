const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const { networkInterfaces } = require('os');
const path = require('path');
const {requestTime, logger} = require('./middlewares');

// const nets = networkInterfaces();
// console.log(nets)

const PORT = 8000
console.log('Server started...')
// app.use(express.static(path.resolve(__dirname, 'static')));
app.use(express.static(__dirname))


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


app.get("/video", (req, res) => {
	const range = req.headers.range;
	console.log(range)
	if (!range) {
		res.status(400).send("Requires Range header");
	}


	console.log('movie_name: ', movie_name)
	const videoPath = "static/1.mp4";
	console.log(videoPath)
	const videoSize = fs.statSync(videoPath).size;
	const CHUNK_SIZE = 10 ** 6;
	const start = Number(range.replace(/\D/g, ""))
	const end = Math.min(start + CHUNK_SIZE, videoSize - 1)
	const contentLength = end - start + 1

	const headers = {
		"Content-Range": `bytes ${start}-${end}/${videoSize}`,
		"Accept-Ranges": "bytes",
		"Content-Length": contentLength,
		"Content-Type": "video/mp4",
	}

	res.writeHead(206, headers);
	const videoStream = fs.createReadStream(videoPath, {start, end});
	videoStream.pipe(res)

});

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




  //response.send(text);

});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}!`);
});



