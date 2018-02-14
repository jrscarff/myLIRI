require("dotenv").config();

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var inquirer = require("inquirer");

function appStart() {
	inquirer
		.prompt([
			{
				type: "list",
				message: "What would you like to do?",
				choices: ["spotify-this-song", "see-tweets", "Movie-Search", "Do-what-it-says"],
				name: "application"
			}
			]).then(function(inquirerResponse) {
				if (inquirerResponse.application === "spotify-this-song") {
					spotify();
				};
				else if (inquirerResponse.application === "see-tweets") {
					spotify();
				};
				else if (inquirerResponse.application === "Movie-Search") {
					spotify();
				};
				else if (inquirerResponse.application === "Do-what-it-says") {
					spotify();
				};
			})
}

function spotify() {
	inquirer
		.prompt([
		{
			type: "input",
			message: "What song would you like information for?",
			name: "song"
		},
		{
			type: "confirm",
			message: "Are you sure?",
			name: "confirm",
			default: true
		}
		]).then(function(inquirerResponse) {
			if (inquirerResponse.confirm) {
				var song = inquirerResponse.song
				console.log(song);
			}
		})
}

appStart();