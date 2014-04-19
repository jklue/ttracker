$(document).ready(function(){

	// declare id that handles recursive drawTrain calling
	var intervalID;

	// Define 'zoom' amount for latitude and longitude
	var ZOOM = 4000;

	// Create text array for multiple instances of train title
	var train = [];

	// Create arrow for multiple instances of train over time
	var arrow;

	// Creates canvas 320 × 200 at 10, 50
	var paper = Raphael(document.getElementById('canvasContainer'), 740, 1000);

	// Zoom in on canvas.
	paper.setViewBox(1400, 2200, 740, 1050, true);

	// Define trainID label offset to place exactly over icon
	var trainIDOffset = 30;

	// Declare timer for repeat queries to MBTA
	var updateTimer;

	// Declare timer that limits sessions to 5 min.
	var overloadTimer;

	/***** User select train line *****/
	// Click any button element
	$('button').click(function() {
		
		// Clear overloadTimer, effectively restarting the 5 min. limit
		clearTimeout(overloadTimer);

		// Set timer to prevent excessive usage of MBTA bandwidth
		overloadTimer = setTimeout(function() {
			clearTimeout(updateTimer);
			alert('We hope you are enjoying this visualization. The connection has\npaused after 5 minutes in consideration of the MBTA\'s bandwidth.\nTo continue watching, please choose a subway line by selecting\na button at the top. Thank you.');
		},300000); // 5 minutes

		// Grab color from button clicked
		var color = $(this).html();
		color = color.substring(0, color.length - 5); // Remove the characters ' line' from end of button html

		// Clear old updateTimer
		clearTimeout(updateTimer);

		// Clear old canvas
		$('path').fadeTo( "slow", 0.2 );
		
		// Draw the train by calling function
		drawTrain(color);
	});

	/***** Canvas *****/
	drawTrain = function(lineColor) {

		// Declare change indicator to see if data feed is not refreshing
		var changed = false;

		// Set YQL query for MBTA
		var subwayLineData = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%20%3D%20%22http%3A%2F%2Fdeveloper.mbta.com%2Flib%2Frthr%2F"+lineColor+".json%22%20&format=json";

		// Get MBTA red line data every so often
		$.getJSON( subwayLineData, function( data ) {
			
			console.log(data);

			if (data.query.results == null) {
			 	alert("No info for this line at this time. Please wait or select a different line.");
			};			

			// Remove old trainID labels
			$('text').remove();

			// Remove old tooltip
			Tipped.remove($('path'));

			// Find first reported train and grab ID (number on lead car). Set this as train being tracked.
			$.each(data.query.results.TripList.Trips, function() {
				if(this.Position)  {

					var trainID = this.Position.Train;

					// get latitude and longitude from trainID
					var latitude = this.Position.Lat;
					var longitude = this.Position.Long;

					// remove first two numbers from longitude and first 3 (includes -) from latitude
					latitude = latitude.substring(2);
					longitude = longitude.substring(3);

					// invert latitude because an SVG canvas goes down with an increase in the value of Y
					latitude = 1 - latitude;

					// invert longitude because it was previously a negative number
					longitude = 1 - longitude - .5;

					// multiply longitude and latitude to 'zoom' in on Boston area
					latitude = latitude * ZOOM;
					longitude = longitude * ZOOM;

					// Train Arrow
						// Set previous train to gray
						$('path.' + trainID).fadeTo( "slow", 0.1 );

						// Check if new train data is different from old train data
						if ((latitude != oldLatitude) || (longitude != oldLongitude)) {
							changed = true;
						}
						// Set old train data to new train data for next iteration
						var oldLatitude = latitude;
						var oldLongitude = longitude;

						// Create train arrow. Icon from rafael.js icon set. Thank you Dmitry Baranovskiy.
						arrow = paper.path('M15.834,29.084 15.834,16.166 2.917,16.166 29.083,2.917z').attr({fill: lineColor, stroke: "none"});

						// Get train heading minus 45 degrees because icon is already rotated +45 degrees
						var heading = this.Position.Heading - 45;

						// Rotate arrow to face heading
						arrow.transform('t'+longitude+','+latitude+'r'+heading);

					// Add tooltip with info about train's destination, etc. using Tipped library
						
						// Get latest train icon
						var liveTrain = $('path').last();

						// Assign class with trainID to newest icon 
						liveTrain.attr('class', trainID);

						// Assign message for tooltip						
						if(this.Predictions[0])  {
							var nextStop = 'Train #: ' + trainID + '<br>Next Stop: ' + this.Predictions[0].Stop + '</br>ETA: ' + this.Predictions[0].Seconds + ' seconds <br>Destination: ' + this.Destination;	
						} else  {
							var nextStop = 'Unavailable';
						}

						// Create tooltip
						Tipped.create(liveTrain, nextStop,  {
							target: 'mouse',
							hook: {
								target: 'topmiddle',
								tooltip: 'bottommiddle'
							}
						});
				} // endif
			});

			// If no new position data, let user know
			if (changed == false) {
				alert('The data isn\'t updating. Please try a different subway line.');
			}

		});
		// Recursively call drawTrain function
		updateTimer = setTimeout(function() {
			drawTrain(lineColor);
		},15000);
	};

});