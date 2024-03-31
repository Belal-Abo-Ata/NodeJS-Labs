export { tickets };

class tickets {
	userID;
	seatNum;
	flightNum;
	departureAirport;
	arrivalAirport;
	travelDate;
	passengerName;

	constructor(userID, seatNum, flightNum, departureAirport, arrivalAirport, travelDate) {
		this.userID = userID;
		this.seatNum = seatNum;
		this.flightNum = flightNum;
		this.departureAirport = departureAirport;
		this.arrivalAirport = arrivalAirport;
		this.travelDate = travelDate;
	}

	displayData() {
		return `<div class="card" style="width: 18rem;">
			<ul class="list-group list-group-flush">
				<li class="list-group-item">User ID: ${this.userID}</li>
				<li class="list-group-item">Seat Number: ${this.seatNum}</li>
				<li class="list-group-item">Flight Num: ${this.flightNum}</li>
				<li class="list-group-item">Departure Ariport: ${this.departureAirport}</li>
				<li class="list-group-item">Arrival Ariport: ${this.arrivalAirport}</li>
				<li class="list-group-item">Travel Date: ${this.travelDate}</li>
			</ul>
		</div>;`;
	}

	getData() {
		return {
			userID: this.userID,
			seatNum: this.seatNum,
			flightNum: this.flightNum,
			departureAirport: this.departureAirport,
			arrivalAirport: this.arrivalAirport,
			travelDate: this.travelDate,
		};
	}

	updateData(
		userID = this.userID,
		seatNum = this.seatNum,
		flightNum = this.flightNum,
		departureAirport = this.departureAirport,
		arrivalAirport = this.arrivalAirport,
		travelDate = this.travelDate,
	) {
		this.userID = userID;
		this.seatNum = seatNum;
		this.flightNum = flightNum;
		this.departureAirport = departureAirport;
		this.arrivalAirport = arrivalAirport;
		this.travelDate = travelDate;
	}
}
