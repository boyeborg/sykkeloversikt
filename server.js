/* eslint-disable no-console */

const express = require("express");
const fetch = require("node-fetch");

const { CLIENT_IDENTIFIER } = process.env;

const app = express();

app.get("/oslobysykkel/*", async (req, res) => {
	const url = `https://oslobysykkel.no/api/v1/${req.params[0]}`;

	const response = await fetch(url, {
		headers: { "Client-Identifier": CLIENT_IDENTIFIER }
	});

	const log = `${req.path} - ${response.status} ${response.statusText}`;

	if (!response.ok) {
		console.error(log);
		res.status(response.status);
		res.send({ error: response.statusText });
	} else {
		console.log(log);
		const jsonResponse = await response.json();
		res.send(jsonResponse);
	}
});

app.use(express.static("dist"));

app.listen(1234);

console.log("Visit http://localhost:1234");
