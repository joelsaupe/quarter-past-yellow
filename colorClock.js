/**
*	QUARTER PAST YELLOW: The Color Clock
*
*	A simple web app that converts the current time to a hexadecimal representation. 
*
*	Project by Joel Saupe
*
*/

initialize();

/**
*	Initializes the color clock app.
*/
function initialize() {
	// Get the current date.
	var midnight = new Date();
	var current = new Date();
	// Rollback midnight to the start of the day.
	midnight.setHours(0);
	midnight.setMinutes(0);
	midnight.setSeconds(0);

	// Calculate the time variable.
	var secondsSoFarToday = (current - midnight) / 1000;
	var possibleNumberOfColors = 16777216;
	var secondsInADay = 60 * 60 * 24;
	var incrementRate = Math.floor(possibleNumberOfColors / secondsInADay)
	var colorAsInt = secondsSoFarToday * incrementRate;
	// Start updating the view.
	updateView(colorAsInt, incrementRate, 0);
	
}

/**
*	Recursive function that will continually update the view to reflect what the
*	current time-color conversion is. About every second the label will be updated
*	but every 1000/rate ms the background color will be updated. This is to create 
*	a smoother transition between colors.
*/
function updateView(colorAsInt, rate, iteration) {
	// Get the current color as a hex and update the view.
	var color = intToHexString(colorAsInt);
	document.body.style.background = color;
	// If we've reached a second then update the label
	if (iteration % rate == 0) {
		document.getElementById('color_clock').innerHTML = color;
	}
	// Increment the color
	setTimeout(function(){
		updateView(colorAsInt+1, rate, iteration+1);
	}, 1000/rate);
}


/**
*	Takes in an integer and converts it to a string of hex.
*	@example
*		intToHex(0) = '#000000';
*
*/
function intToHexString(number) {
	var hexString = "";
	// Perform decimal to hex conversion and append each new value to our output.
	while (number > 0) {
		var remainder = number % 16;
		if (remainder < 10) {
			hexString = remainder + hexString;
		} else {
			hexString = String.fromCharCode(55+remainder) + hexString;
		}
		number = Math.floor(number / 16);
	}
	// Pad the hexstring with 0s if needed.
	while (hexString.length < 6) {
		hexString = 0 + hexString;
	}
	return "#" + hexString;
}
