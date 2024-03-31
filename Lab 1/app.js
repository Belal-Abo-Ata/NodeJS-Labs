const http = require('http');
const fs = require('fs');

http
	.createServer((req, res) => {
		if (req.url === '/favicon.ico') {
			return;
		}
		const params = req.url.split('/');
		params.shift();
		const oper = params.shift();
		const result = cal(oper, params);

		const operMapping = {
			add: 'Addition',
			sub: 'Substration',
			mul: 'Multiplication',
			div: 'Division',
		};

		const responseString = `
      <h1>The Operatoin: ${operMapping[oper]}</h1>
      <h3>The Result: ${result}</h3>
    `;

		if (result) {
			fs.appendFile('data.txt', responseString, (err) => {
				err ? console.log('Error has Happen') : console.log(`the data has been written`);
			});
		}

		res.end(responseString);
	})
	.listen(7000);

function cal(oper, values) {
	const resutl = values.reduce((acc, curr) => {
		switch (oper) {
			case 'add': {
				return +acc + +curr;
			}
			case 'sub': {
				return +acc - +curr;
			}
			case 'mul': {
				return +acc * +curr;
			}
			case 'div': {
				return +acc / +curr;
			}
			default: {
				break;
			}
		}
	});
	return resutl;
}
