// ------------------- Variables & Modules -------------------
const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// ------------------- Usage ---------------------

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../Client-Side/Pages/main.html'));
});

app.get('/favicon.ico', (req, res) => {
	res.sendFile(path.join(__dirname, '../Client-Side/Icons/favicon.ico'));
});

app.get('/welcome.html', (req, res) => {
	res.sendFile(path.join(__dirname, '../Client-Side/Pages/welcome.html'));
});

app.get('/data', (req, res) => {
	res.sendFile(path.join(__dirname, '../db.json'));
});

app.post('/welcome.html', (req, res) => {
	const { name, mobile, address, email } = req.body;
	let welcomePage = fs
		.readFileSync(path.join(__dirname, '../Client-Side/Pages/welcome.html'))
		.toString();
	welcomePage = welcomePage.replace('{username}', name);
	welcomePage = welcomePage.replace('{MobileNumber}', mobile);
	welcomePage = welcomePage.replace('{Email}', email);
	welcomePage = welcomePage.replace('{Address}', address);
	saveToDb(name, mobile, address, email);
	res.send(welcomePage);
});

app.listen(PORT, () => {
	console.log(`Listent at: http://localhost:${PORT}`);
});

// ------------------- Functions ---------------------------

function saveToDb(username, mobile, Address, Email) {
	let fileData;
	let existingData = [];
	try {
		fileData = fs.readFileSync('./db.json', 'utf8');
	} catch {}
	if (fileData) {
		existingData = JSON.parse(fileData);
	}

	existingData.push({
		username,
		mobile,
		Address,
		Email,
	});

	fs.writeFile('db.json', JSON.stringify(existingData), 'utf8', (err) => {
		if (err) {
			console.error('Error writing to file:', err);
			return;
		}
		console.log('New data has been appended to db.json');
	});
}
