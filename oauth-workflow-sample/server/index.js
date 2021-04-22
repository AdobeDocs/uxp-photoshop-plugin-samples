const express = require('express');
const app = express();
const session = require('express-session')
const request = require('request-promise');
const http = require('http');
const bodyParser = require('body-parser');
const dropboxApiKey = require('./public/config.js').dropboxApiKey;
const dropboxApiSecret = require('./public/config.js').dropboxApiSecret;
const publicUrl = require('./public/config.js').publicUrl;
const fs = require('fs');
const path = require('path');

/* Declare host name and port */
const hostname = 'localhost';
const port = 8000;

/* Authorized Request IDs (simulating database) */
const requestIds = {};

/* Middlewares */
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(session({
	/* Change this to your own secret value */
	secret: 'this-is-secret',
	resave: true,
	saveUninitialized: true,
	cookie: {
		secure: false,
		maxAge: 6000000
	}
}));

/* Routes */
app.get('/login', function (req, res) {
	let requestId = req.query.requestId;
	/* This will prompt user with the Dropbox auth screen */
	res.redirect(`https://www.dropbox.com/oauth2/authorize?response_type=code&client_id=${dropboxApiKey}&redirect_uri=${publicUrl}/callback&state=${requestId}`)
})

app.get('/callback', function (req, res) {
	/* Retrieve authorization code from request */
	let code = req.query.code;
	let requestId = req.query.state;

	/* Set options with required paramters */
	let requestOptions = {
		uri: `https://api.dropboxapi.com/oauth2/token?grant_type=authorization_code&code=${code}&client_id=${dropboxApiKey}&client_secret=${dropboxApiSecret}&redirect_uri=${publicUrl}/callback`,
		method: 'POST',
		json: true
	}

	/* Send a POST request using the request library */
	request(requestOptions)
		.then(function (response) {
			/* Store the token in req.session.token */
			req.session.token = response.access_token;

			/* Simulating writing to a database */
			requestIds[requestId]["accessToken"] = response.access_token;
			res.send('Authentication successful. You can close this tab');
		})
		.catch(function (error) {
			res.json({ 'response': 'Log in failed!' });
		});
})

app.get('/getRequestId', function (req, res) {
	/* Simulating writing to a database */
	for (let i = 1; i < 100; i++) {
		if (!(i in requestIds)) {
			requestIds[i] = {};
			console.log(i)
			res.json({ id: i })
			break;
		}
	}
})

app.get('/getCredentials', function (req, res) {
	const requestId = req.query.requestId;
	/* Simulating getting data from a database */
	if (requestId in requestIds && "accessToken" in requestIds[requestId]) {
		res.json({ accessToken: requestIds[requestId].accessToken })
	} else {
		console.log("no token")
	}
})

var httpServer = http.createServer(app).listen(port, hostname, (err) => {
	if (err) console.log(`Error: ${err}`);
	console.log(`listening on port ${port}!`);
});
