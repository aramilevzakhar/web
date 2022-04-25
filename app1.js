
/*
import express from 'express'
import path from 'path'
import fs from 'fs'
import bodyParser from 'body-parser'
import {requestTime, logger} from './middlewaeres.js'
*/


// const { networkInterfaces } = require('os');
const express = require("express");
const app = express();

const fs = require("fs");
const bodyParser = require("body-parser");

// const fsPromise = require('fs/promise')
// const nets = networkInterfaces();
// console.log(nets)

const PORT = 8000;
// const __dirname = path.resolve();
let movie_name = "";

console.log("Server started ...");
// more code will go in here just befor the listening function




// app.use(express.static(path.resolve(__dirname)));
// app.use(requestTime)




app.get("/", function (req, res) {
	res.sendFile(__dirname + "/index.html");
	//res.sendFile(path.resolve(__dirname, 'index.html'));
})

// app.get("/download", (req, res) => {
// 	res.sendFile(path.resolve(__dirname, '1.mp4'));
// })


app.get("/video1", function (req, res) {
	console.log("start app.get");
	const range = req.headers.range;
	console.log(range);
	if (!range) {
		res.status(400).send("Requires Range header");
	}
	// console.log('movie_name: ', movie_name)
	const videoPath = '1.mp4';
	// console.log(videoPath)

	const videoSize = fs.statSync(videoPath).size;

	const CHUNK_SIZE = 10 ** 6;
	const start = Number(range.replace(/\D/g, ""))
	// console.log(start)
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
	// console.log(text);
  	// console.log(request.headers['user-agent']);
	// var ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
	// console.log(ip);
  	if (!request.body) return response.sendStatus(400);
	response.redirect('back');
 	//response.send(text);
});



app.listen(PORT, function (req, res) {
	console.log(`Listening on port ${PORT}!`);
});



