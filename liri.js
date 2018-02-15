require("dotenv").config();

var keys = require("./keys.js");

var inquirer = require("inquirer");
var request = require("request");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

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
					spotifySong();
				};
				if (inquirerResponse.application === "see-tweets") {
					tweets();
				};
				if (inquirerResponse.application === "Movie-Search") {
					movieSearch();
				};
				if (inquirerResponse.application === "Do-what-it-says") {
					doIt();
				};
			})
}

function spotifySong() {
	inquirer
		.prompt([
		{
			type: "input",
			message: "What song would you like information for?",
			name: "song",
			default: "Hey Ya"
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
				spotify.search({ type: 'track', query: song }, function(err, data) {
  					if (err) {
    					return console.log('Error occurred: ' + err);
  					}
  					for (var i = 0; i < data.tracks.items.length; i++) {
  						console.log("Song Name: " + data.tracks.items[i].name);
	  					console.log("Album: " + data.tracks.items[i].album.name);
	  					console.log("Artist: " + data.tracks.items[i].artists[0].name); 
	  					console.log("Preview URL: " + data.tracks.items[i].preview_url);
	  					console.log("------------\n");
  				}
				});
			}
			else {
				appStart();
			}
		})
}

function tweets() {
	inquirer.prompt([
	{
			type: "confirm",
			message: "Are you sure?",
			name: "confirm",
			default: true
	}
	]).then(function(response) {
		if (response.confirm) {
			var params = {
				sreen_name: response.handle
			}
			client.get("favorites/list", params, function(err, tweets, response) {
				if (!err) {
					for (var i = 0; i < tweets.length; i++) {
						console.log(tweets[i].text);
						console.log(tweets[i].created_at);
						console.log("------------\n");
					}
				}
			})
		}
		else {
			appStart();
		}
	})

}

function movieSearch() {
	inquirer.prompt([
	{
		type: "input",
		message: "What movie would you like information for?",
		name: "title",
		default: "Inception"
	},
	{
		type: "confirm",
		message: "Are you sure?",
		name: "confirm",
		default: true
	}
	]).then(function(response) {
		if (response.confirm) {
			var queryUrl = "http://www.omdbapi.com/?t=" + response.title + "&y=&plot=short&apikey=trilogy";
			request(queryUrl, function(err, response, body) {
				if (!err && response.statusCode === 200) {
					console.log("\nTitle: " + JSON.parse(body).Title);
					console.log("Release Year: " + JSON.parse(body).Year);
					console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
					for (var i = 0; i < JSON.parse(body).Ratings.length; i++) {
						if (JSON.parse(body).Ratings[i].Source === 'Rotten Tomatoes') {
							console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[i].Value)
						}
					}
					console.log("Countries produced in: " + JSON.parse(body).Country);
					console.log("Languages Available: " + JSON.parse(body).Language);
					console.log("Plot: " + JSON.parse(body).Plot);
					console.log("Actors: " + JSON.parse(body).Actors + "\n");
				}
			})
		}
		else {
			appStart();
		} 
	})
}

function doIt() {
	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
			return console.log(error)
		}
		var array = data.split(",");
		if (array[0] === "spotify-this-song") {
			var song = array[1];
				spotify.search({ type: 'track', query: song }, function(err, data) {
  					if (err) {
    					return console.log('Error occurred: ' + err);
  					}
  					for (var i = 0; i < data.tracks.items.length; i++) {
  						console.log("Song Name: " + data.tracks.items[i].name);
	  					console.log("Album: " + data.tracks.items[i].album.name);
	  					console.log("Artist: " + data.tracks.items[i].artists[0].name); 
	  					console.log("Preview URL: " + data.tracks.items[i].preview_url);
	  					console.log("------------\n");
  					}
				});
		};
		if (array[0] === "see-tweets") {
			tweets();
		};
		if (array[0] === "Movie-Search") {		
			var queryUrl = "http://www.omdbapi.com/?t=" + array[1] + "&y=&plot=short&apikey=trilogy";
			request(queryUrl, function(err, response, body) {
				if (!err && response.statusCode === 200) {
					console.log("\nTitle: " + JSON.parse(body).Title);
					console.log("Release Year: " + JSON.parse(body).Year);
					console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
					for (var i = 0; i < JSON.parse(body).Ratings.length; i++) {
						if (JSON.parse(body).Ratings[i].Source === 'Rotten Tomatoes') {
							console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[i].Value)
						}
					}
					console.log("Countries produced in: " + JSON.parse(body).Country);
					console.log("Languages Available: " + JSON.parse(body).Language);
					console.log("Plot: " + JSON.parse(body).Plot);
					console.log("Actors: " + JSON.parse(body).Actors + "\n");
				}
			})
		};
		
	})
}

appStart();