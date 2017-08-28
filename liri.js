//importing keys from keys.js
var keys = require("./keys.js");

//requiring the npm's need Twitter, Spotify, fs, request
var Twitter = require("twitter");

var request = require("request");
// spotify keys and auth
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotifyKeys);

var fs = require("fs");
//writing the random.txt file with the action to be done
fs.writeFile("random.txt", "spotify-this-song,'I Want it That Way'", function(err){
	if (err){
		return console.log(err);
	}
});
//getting keys from keys js

// console.log(keys.twitterKeys);
var client = new Twitter(keys.twiwtterKeys);

// var params = {screen_name: "Paul"};

// client.get("statuses/user_timeline",params, function(error, tweets, response) {
// 		if (error){
// 			console.log(error);
// 		}
// 		if (!error) {
// 			console.log(tweets);
// 		}
// 	});

//variable to make borders
function separator(){console.log("--------------------------------------------------------")};
//grabing the command line arguments
var action = process.argv[2];
//console.log(action);

//building the search request()
var nodeArg = process.argv;
var searchRequest = "";
for (var i =3; i < nodeArg.length; i++) {
	searchRequest = searchRequest + " " + nodeArg[i];
}
//logging search request
//console.log("You are searching: " +searchRequest);

//logic for command line searches
//twitter lookup
if (action === "my-tweets"){
	client.get("statuses/user_timeline",params, function(error, tweets, response) {
		if (error){
			console.log(error);
		}
		if (!error) {
			console.log(tweets);
		}
	});
} 
//spotify search
else if (action === "spotify-this-song"){
	if (searchRequest===""){
		searchRequest = "the sign";
		spotify.search({ type: 'track', query: "'"+searchRequest+"'", limit: 20}, function(err, data) {
			  if (err) {
			    return console.log('Error occurred: ' + err);
			  }

			//console.log(data.tracks.items[0]);
			separator();
			console.log("Artist(s): " +data.tracks.items[5].album["artists"][0]["name"]);
			console.log("Song Title: " +data.tracks.items[5]["name"]);
			console.log("Preview URL: " +data.tracks.items[5]["preview_url"]);
			console.log("Album Name: " +data.tracks.items[5].album.name); 
			separator();

			});
	}else{
	spotify.search({ type: 'track', query: "'"+searchRequest+"'", limit: 5}, function(err, data) {
			  if (err) {
			    return console.log('Error occurred: ' + err);
			  }
			function printSong(){
			separator();
			console.log("Artist(s): " +data.tracks.items[i].album["artists"][0]["name"]);
			console.log("Song Title: " +data.tracks.items[i]["name"]);
			console.log("Preview URL: " +data.tracks.items[i]["preview_url"]);
			console.log("Album Name: " +data.tracks.items[i].album.name); 
			separator();
			};
			for (var i=0;i<5;i++){
				printSong();
			};

			});
		};
}
// OMDB look up
 else if (action === "movie-this"){
	if (searchRequest == ""){
		searchRequest = "Mr. Nobody";
		
		var queryUrl = "http://www.omdbapi.com/?t=" + searchRequest + "&y=&plot=short&apikey=40e9cece";

		//console.log(queryUrl);

		request(queryUrl, function(error, response, body){
			if(!error && response.statusCode ===200){
				separator();
				console.log("Title: " + JSON.parse(body).Title);
				console.log("Year: " + JSON.parse(body).Year);
				console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
				console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[2]["Value"]);
				console.log("Country Produced: " + JSON.parse(body).Country);
				console.log("Language: " + JSON.parse(body).Language);
				console.log("Plot: " + JSON.parse(body).Plot);
				console.log("Actors: " + JSON.parse(body).Actors);
				separator();		
			}
		});
	}else{
		var queryUrl = "http://www.omdbapi.com/?t=" + searchRequest + "&y=&plot=short&apikey=40e9cece";
		console.log(queryUrl);
		request(queryUrl, function(error, response, body){
			if(!error && response.statusCode ===200){
				separator();
				console.log("Title: " + JSON.parse(body).Title);
				console.log("Year: " + JSON.parse(body).Year);
				console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
				if(body.Ratings[1] === "undefined"){
					console.log("Rotten Tomatoes Rating does not exist")
				}else{
				console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1]["Value"]);
				}
				console.log("Country Produced: " + JSON.parse(body).Country);
				console.log("Language: " + JSON.parse(body).Language);
				console.log("Plot: " + JSON.parse(body).Plot);
				console.log("Actors: " + JSON.parse(body).Actors);
				separator();		
			}
		});
	};
}
//Random
 else if (action === "do-what-it-says") {
 	fs.readFile("random.txt","utf8",function(error, data){
 		if(error){
 			return console.log(error);
 		}
 		var randomEntry= data.split(",");
 		action = randomEntry[0];
 		searchRequest= randomEntry[1];

 		spotify.search({ type: 'track', query: "'"+searchRequest+"'", limit: 5}, function(err, data) {
			  if (err) {
			    return console.log('Error occurred: ' + err);
			  }
			function printSong(){
			separator();
			console.log("Artist(s): " +data.tracks.items[i].album["artists"][0]["name"]);
			console.log("Song Title: " +data.tracks.items[i]["name"]);
			console.log("Preview URL: " +data.tracks.items[i]["preview_url"]);
			console.log("Album Name: " +data.tracks.items[i].album.name); 
			separator();
			};
			for (var i=0;i<5;i++){
				printSong();
			};

			});
 	});
}
