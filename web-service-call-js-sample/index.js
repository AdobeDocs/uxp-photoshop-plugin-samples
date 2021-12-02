// RESTful API example.
// This example gets a weather forecast from weather.gov and places it on a text layer in the current document.
// 
console.log("Plugin starting");

// TODO: add a spinner, since the network requests take a while

document.getElementById("getForecastBtn").addEventListener("click", showForecastInTextLayer);

async function showForecastInTextLayer() {
	let latitude = document.getElementById("latitudeFld").value;
	let longitude = document.getElementById("longitudeFld").value;
	if (latitude === "" || longitude === "") {
		showAlert("Error\n\nYou must enter a latitude and longitude.");
		return;
	}

	console.log(`Getting forecast for ${latitude}, ${longitude}`);

	// first, make a new Photoshop document:
	const app = require('photoshop').app;
	let newDoc = app.createDocument({ width: 800, height: 600, resolution: 72, mode: "RGBColorMode", fill: "white" });

	let forecastText = "NO WEATHER STATION INFO AVAILABLE";
	let forecastUrl = null;
	let city = "Unknown";
	let state = "Unknown";
	
	try {
		forecastInfo = await getWeatherStation(latitude, longitude); // returns URL, city, state
		forecastUrl = forecastInfo[0];
		city = forecastInfo[1];
		state = forecastInfo[2];
	}
	catch (err) {
		console.error("getWeatherStation error: " + err.message);
	}

	let forecast = "NO FORECAST AVAILABLE";
	if (forecastUrl) {
		try {
			forecast = await getForecastForStation(forecastInfo[0]);
		}
		catch (err) {
			console.error("getForecastForStation error: " + err.message);
		}
	}

	try {
		await makeTextLayer(`Weather forecast for ${city}, ${state}:\r\r${forecast}`);
	}
	catch (err) {
		console.error("makeTextLayer error: " + err.message);
	}
}

// the weather.gov site needs a "station" and grid coordinates.
// This call gets the appropriate forecast URL based on latitude and longitude
async function getWeatherStation(latitude, longitude) {
	let response = await fetch('https://api.weather.gov/points/' + latitude + ',' + longitude);
	if (!response.ok) {
		throw new Error(`HTTP error fetching weather station; status: ${response.status}`);
	}
	let stationJson = await response.json();
	let forecastURL = stationJson.properties.forecast;
	let city = stationJson.properties.relativeLocation.properties.city;
	let state = stationJson.properties.relativeLocation.properties.state;
	return [forecastURL, city, state];
}

async function getForecastForStation(forecastURL) {
	// console.log(`getForecastForStation: URL is ${forecastURL}`);
	let response = await fetch(forecastURL);
	if (!response.ok) {
		throw new Error(`HTTP error fetching forecast; status: ${response.status}`);
	}
	// console.log('.. got response  ' + response);
	let weatherJson = await response.json();
	// console.log('.. got weatherJson ' + weatherJson);
	let forecast = weatherJson.properties.periods[0].detailedForecast;
	return forecast;
}

// show a simple alert:
function showAlert(message) {
	const core = require('photoshop').app;
	core.showAlert({message: message});
}

// make a text layer in the active document
// Since there's no built-in API to make a text layer (yet),
// We do it with a batchPlay call.
async function makeTextLayer(theText) {
	const batchCommands = {
		"_obj": "make",
		"_target": [
			{
				"_ref": "textLayer"
			}
		],
		"using": {
			"_obj": "textLayer",
			"textKey": theText,
			"textShape": [
				{
					"_obj": "textShape",
					"char": {
						"_enum": "char",
						"_value": "box"
					},
					"bounds": {
						"_obj": "rectangle",
						"top": 100,
						"left": 100,
						"bottom": 400,
						"right": 500
					}
				}
			],
			"textStyleRange": [
				{
					"_obj": "textStyleRange",
					"from": 0,
					"to": theText.length,
					"textStyle": {
						"_obj": "textStyle",
						"fontName": "Myriad Pro",
						"fontStyleName": "Bold",
						"size": {
							"_unit": "pointsUnit",
							"_value": 36
						},
						"color": {
							"_obj": "RGBColor",
							"red": 100,
							"green": 0,
							"blue": 240
						},
					}
				}
			]
		}
	};

	return await require("photoshop").core.executeAsModal(async () => {
		await require('photoshop').action.batchPlay([batchCommands], {});
	}, { commandName: "Make New Text Layer" });
}
