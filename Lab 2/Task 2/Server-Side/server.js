//Launch Server ==> req[URL - Method]
const http = require('http');
const fs = require('fs');
//#region Reading Files
let homeHTML = '';
fs.readFile('../Client-Side/Pages/main.html', 'utf-8', (err, data) => {
	if (err) {
		console.log('7asal Error');
	} else {
		homeHTML = data;
	}
});
const welcomeHTML = fs.readFileSync('../Client-Side/Pages/welcome.html', 'utf-8');
const FavIcon1ico = fs.readFileSync('../Client-Side/Icons/favicon.ico');
//#endregion

http
	.createServer((req, res) => {
		//#region GET
		if (req.method == 'GET') {
			switch (req.url) {
				case '/':
				case '/main.html':
				case '/Pages/main.html':
				case '/Client-Side/Pages/main.html':
					res.setHeader('Content-Type', 'text/html');
					res.write(homeHTML);
					break;
				case '/favicon.ico':
				case '/Icons/favicon.ico':
				case '/Client-Side/Icons/favicon.ico':
					res.setHeader('Content-Type', 'image/vnd.microsoft.icon');
					res.write(FavIcon1ico);
					break;
				case '/data':
					const fileData = fs.readFileSync('db.json', 'utf8');
					res.write(fileData);
					break;
				default:
					if (req.url.includes('welcome.html')) {
						res.setHeader('Content-Type', 'text/html');
						res.write(welcomeHTML);
					} else res.write('Invalid URL !!');
					break;
			}
			res.end();
		}
		//#endregion
		//#region POST
		else if (req.method == 'POST') {
			let username = '';
			let Email = '';
			let Address = '';
			let mobile = '';

			req.on('data', (data) => {
				userData = data.toString(); // Assuming data is in the form of "name=Sama&age=22"
				username = userData.split('&')[0].split('=')[1];
				mobile = userData.split('&')[1].split('=')[1];
				Address = userData.split('&')[2].split('=')[1];
				Email = userData.split('&')[3].split('=')[1];
				saveToDb(username, mobile, Address, Email);
			});

			req.on('end', () => {
				res.setHeader('Content-Type', 'text/html');
				let File = welcomeHTML.replace('{username}', username);
				File = File.replace('{Email}', Email);
				File = File.replace('{MobileNumber}', mobile);
				File = File.replace('{Address}', Address);
				File = File.replace('%40', '@');
				res.write(File);
				res.end();
			});

			req.on('error', () => {
				console.log('Error');
			});
			req.on('close', () => {
				console.log('Closed');
			});
		}
		//#endregion
		//#region PUT
		else if (req.method == 'PUT') {
		}
		//#endregion
		//#region PATCH
		else if (req.method == 'PATCH') {
		}
		//#endregion
		//#region DELETE
		else if (req.method == 'DELETE') {
		}
		//#endregion
		//#region Default
		else {
			res.end('Please Check ur Method [GET- POST - PATCH - PUT - DELETE]');
		}
		//#endregion
	})
	.listen(7000, () => {
		console.log('http://localhost:7000');
	});

function saveToDb(username, mobile, Address, Email) {
	const fileData = fs.readFileSync('./db.json', 'utf8');
	let existingData = [];
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
