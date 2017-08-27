//requiring the npm's need Twitter, Spotify, fs, request
var Twitter = require("twitter");

var request = require("request");

var Spotity = require("node-spotify-api");

var fs = require("fs");

var keys = require("./keys.js");

//grabing the command line arguments
var action = process.argv[2];
console.log(action);

//building the search request
var nodeArg = process.argv;
var searchRequest = "";
for (var i =3; i < nodeArg.length; i++) {
	searchRequest = searchRequest + " " + nodeArg[i];
}
//logging search request
console.log("You are searching: " +searchRequest);