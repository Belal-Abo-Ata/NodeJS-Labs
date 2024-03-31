import http from 'node:http';
import { tickets } from './flights.mjs';

const user1 = new tickets(1, '17D', 'XYZ901', 'EWR', 'MIA', '2024-04-10');
const user2 = new tickets(2, '22C', 'TUV345', 'LAX', 'SIN', '2024-04-15');

http
	.createServer((req, res) => {
		console.log(user1.getData());
		res.write(displayUsers(user2.displayData()));
		user2.updateData(1, '17D', 'XYZ901', 'EWR', 'MIA', '2024-04-10');
		res.write(displayUsers(user2.displayData()));
		res.end();
	})
	.listen(7000, () => {
		console.log('listen at: http://localhost:7000');
	});

function displayUsers(content) {
	return `<!doctype html>
<html lang="en">
	<head>
		<title></title>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link href="css/style.css" rel="stylesheet" />
		<link
			rel="stylesheet"
			href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css"
			integrity="sha512-jnSuA4Ss2PkkikSOLtYs8BlYIeeIK1h99ty4YfvRPAlzr377vr3CXDb7sb7eEEBYjDtcYj+AjBH3FLv5uSJuXg=="
			crossorigin="anonymous"
			referrerpolicy="no-referrer"
		/>
	</head>
	<body>
    ${content}
		<script
			src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/js/bootstrap.min.js"
			integrity="sha512-ykZ1QQr0Jy/4ZkvKuqWn4iF3lqPZyij9iRv6sGqLRdTPkY69YX6+7wvVGmsdBbiIfN/8OdsI7HABjvEok6ZopQ=="
			crossorigin="anonymous"
			referrerpolicy="no-referrer"
		></script>
	</body>
</html>`;
}
