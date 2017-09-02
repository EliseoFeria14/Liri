//importing keys from keys.js
var keys = require("./keys.js");

//twitter npm and auth
var Twitter = require("twitter");
//console.log(keys.twitterKeys);
var client = new Twitter({
	consumer_key: keys.twitterKeys.consumer_key,
	consumer_secret: keys.twitterKeys.consumer_secret,
	access_token_key: keys.twitterKeys.access_token_key,
	access_token_secret: keys.twitterKeys.access_token_secret
});
//console.log(client);
var params = {screen_name: "pabluea"};

//request npm
var request = require("request");

// spotify keys and auth
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotifyKeys);

//song print out

// function printSong(){
// 	separator();
// 	console.log("Artist(s): " +data.tracks.items[i].album["artists"][0]["name"]);
// 	console.log("Song Title: " +data.tracks.items[i]["name"]);
// 	if(data.tracks.items[i]["preview_url"] == null){
// 		console.log("External URL: "+ data.tracks.items[i]["external_urls"].spotify);
// 	}else{
// 		console.log("Preview URL: " +data.tracks.items[i]["preview_url"]);

// 	console.log("Album Name: " +data.tracks.items[i].album.name); 
// 	separator();
// 	};
// };

// fs npm
var fs = require("fs");

//writing the random.txt file with the action to be done
fs.writeFile("random.txt", "spotify-this-song,'I Want it That Way'", function(err){
	if (err){
		return console.log(err);
	}
});

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
				//console.log(tweets)
				for(var i =0; i<tweets.length; i++){
				separator();
				console.log("Tweet: " +tweets[i].text+ "\nCreated: " + tweets[i]["created_at"]);
				separator();
				};
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
			if(data.tracks.items[5]["preview_url"] == null){
				console.log("External URL: "+ data.tracks.items[5]["external_urls"].spotify);
			}else{
				console.log("Preview URL: " +data.tracks.items[5]["preview_url"]);
			};
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
					if(data.tracks.items[i]["preview_url"] == null){
						console.log("External URL: "+ data.tracks.items[i]["external_urls"].spotify);
					}else{
						console.log("Preview URL: " +data.tracks.items[i]["preview_url"]);

					console.log("Album Name: " +data.tracks.items[i].album.name); 
					separator();
					};
				};

			  	//console.log(data);
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
				var body = JSON.parse(body);
				separator();
				console.log("Title: " + body.Title);
				console.log("Year: " + body.Year);
				console.log("IMDB Rating: " + body.imdbRating);
				if(!body.Ratings || !body.Ratings[1]){
					console.log("there is no Rotten Tomatoes Rating.");
				}else{
				console.log("Rotten Tomatoes Rating: " + body.Ratings[2]["Value"]);
				};
				console.log("Country Produced: " + body.Country);
				console.log("Language: " + body.Language);
				console.log("Plot: " + body.Plot);
				console.log("Actors: " + body.Actors);
				separator();		
			}
		});
	}else{
		var queryUrl = "http://www.omdbapi.com/?t=" + searchRequest + "&y=&plot=short&apikey=40e9cece";
		console.log(queryUrl);
		request(queryUrl, function(error, response, body){
			if(!error && response.statusCode ===200){
				var body = JSON.parse(body);
				separator();
				console.log("Title: " + body.Title);
				console.log("Year: " + body.Year);
				console.log("IMDB Rating: " + body.imdbRating);
				if(!body.Ratings || !body.Ratings[1]){
					console.log("There is no Rotten Tomatoes Rating.");
				}else{
				console.log("Rotten Tomatoes Rating: " + body.Ratings[2]["Value"]);
				};
				console.log("Country Produced: " + body.Country);
				console.log("Language: " + body.Language);
				console.log("Plot: " + body.Plot);
				console.log("Actors: " + body.Actors);
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
			// function printSong(){
			// separator();
			// console.log("Artist(s): " +data.tracks.items[i].album["artists"][0]["name"]);
			// console.log("Song Title: " +data.tracks.items[i]["name"]);
			// console.log("Preview URL: " +data.tracks.items[i]["preview_url"]);
			// console.log("Album Name: " +data.tracks.items[i].album.name); 
			// separator();
			// };
			for (var i=0;i<5;i++){
				printSong();
			};

			});
 	});
}
