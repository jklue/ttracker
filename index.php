<!doctype html>
<html lang="en">
<head>
 	<meta charset="UTF-8">
 	<title>T-Tracker</title>
 	<meta name="description" content="Student Javascript project. Tracks Red, Orange, and Blue lines in the Boston subway system.">

	<!-- Pure CSS -->
	<link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.3.0/pure-min.css">

	<!-- Tipped tool tip library -->
 	<link rel="stylesheet" href="css/tipped/tipped.css">

	<!-- Custom css -->
	<link rel="stylesheet" href="css/style.css">

 </head>
 <body>

 	<div id="main-wrapper">
 		<header>
 			<h1>T-Tracker</h1>
 		</header>
		<div id="buttons">
			<button class="pure-button red">Red Line</button>
			<button class="pure-button orange">Orange Line</button>
			<button class="pure-button blue">Blue Line</button>
		</div>
 		<div id="hello">
 			<p>Click a button above to view real-time MBTA info. Hover an active train to see details. Data refreshes every 15 seconds. (Modern browsers only)</p>
 		</div>
 		<div id="credit">
 			<p><a href="http://lukehatfield.com" target="_blank">luke hatfield</a> &copy; 2013</p>
 		</div>
 		<div id="canvasContainer"></div>
 	</div>

 	<!-- jQuery and Raphael libraries -->
	<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script type="text/javascript" src="js/raphael-min.js"></script>

	<!-- Tipped tool tip library -->
 	<script type="text/javascript" src="js/tipped/tipped.js"></script>

 	<!-- Adobe Typekit -->
 	<script type="text/javascript" src="//use.typekit.net/bgb2txb.js"></script>
	<script type="text/javascript">try{Typekit.load();}catch(e){}</script>

	<!-- Custom js -->	
	<script type="text/javascript" src="js/site.js"></script>

	</body>
	</html>