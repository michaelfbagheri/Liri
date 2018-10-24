var randomVariable = require("dotenv").config();
var request = require('request');
var moment = require('moment');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var fs = require('fs');



if (process.argv[2] === 'concert-this') {
  //Bands In Town
  request('https://rest.bandsintown.com/artists/' + process.argv[3] + '/events?app_id=codingbootcamp', function (error, response, body) {
    if (error) {
      console.log('error:', error);
    }
    let bandsInTownData = JSON.parse(body);
    var gigNum;
    var temp = '';
    for (var i in bandsInTownData) {
      gigNum = parseFloat(i) + 1
      console.log('Gig #' + gigNum)
      console.log('Vaneu Name: ' + bandsInTownData[i].venue.name);
      temp = bandsInTownData[i].datetime;
      console.log('date: ' + moment(temp).format('DD/MM/YYYY'));
      console.log('City/Country: ' + bandsInTownData[i].venue.city + ', ' + bandsInTownData[i].venue.country)
      console.log('Location : ' + bandsInTownData[i].venue.latitude + ', ' + bandsInTownData[i].venue.longitude);
    };
  });

} else if (process.argv[2] === 'movie-this') {
  //OMDB 
  var movieTitle = process.argv[3];

  if (movieTitle) {
    movieTitle = movieTitle.trim();
  } else {
    movieTitle = 'Mr.Nobody';
  };

  moveiTitle = movieTitle.replace(' ', '+');
  request('http://www.omdbapi.com/?t=' + movieTitle + '&apikey=38c78df7&', function (error, response, body) {
    if (error) {
      console.log('error:', error);
    }
    let omdbData = JSON.parse(body);
    console.log('Title: ' + omdbData.Title);
    console.log('Release Date: ' + omdbData.Released);
    console.log('imdb ratings are :' + omdbData.Ratings[0].Value)
    console.log('Rotten Tomato ratings are :' + omdbData.Ratings[1].Value)
    console.log('Country Produced: ' + omdbData.Country);
    console.log('Language: ' + omdbData.Language);
    console.log('Plot: ' + omdbData.Plot);
    console.log('Actors: ' + omdbData.Actors);
  });


} else if (process.argv[2] === 'spotify-this-song' || process.argv[2] === 'do-what-it-says') {
  //Spotify
  var spotify = new Spotify(keys.spotify);
  var song;
  if (process.argv[2] === 'spotify-this-song') {
    var song = process.argv.slice(3).join(' ');
    if (song) {
      song = song;
    } else {
      song = 'The Sign';
    };

    spotify.search({ type: 'track', query: song, limit: 20 }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

      var temp1 = data.tracks.items
      var lowerCaseSongTitleFromSpotify = '';
      for (var i in temp1) {
        lowerCaseSongTitleFromSpotify = temp1[i].name;
        if (lowerCaseSongTitleFromSpotify.toLowerCase() === song.toLowerCase()) {
          var num = i;
          break;
        }
      };

      console.log('Artist: ' + data.tracks.items[num].artists[0].name);
      console.log('Album: ' + data.tracks.items[num].album.name);
      console.log('Song: ' + data.tracks.items[num].name);
      var temp = data.tracks.items[num].preview_url
      if (temp) {
        console.log('Sample URL: ' + data.tracks.items[num].preview_url);
      } else {
        console.log('Sample URL not available on Spotify!');
      }
    });

  } else if (process.argv[2] === 'do-what-it-says') {
    var fileName = 'random.txt';
    fs.readFile(fileName, 'utf8', function (err, data) {
      if (err) {
        console.log(err);
      } else {
        var test = data.trim();
        var ourNewArray = test.split(',');
        song = ourNewArray[1];
        console.log('setting song variable from the ourNewArray[1]' + song)
        spotify.search({ type: 'track', query: song, limit: 20 }, function (err, data) {
          
          if (err) {
            return console.log('Error occurred: ' + err);
          }

          var temp1 = data.tracks.items
          var lowerCaseSongTitleFromSpotify = '';
          for (var i in temp1) {
            lowerCaseSongTitleFromSpotify = temp1[i].name;
            if (lowerCaseSongTitleFromSpotify.toLowerCase() === song.toLowerCase()) {
              var num = i;
              break;
            }
          };
          console.log('Artist: ' + data.tracks.items[num].artists[0].name);
          console.log('Album: ' + data.tracks.items[num].album.name);
          console.log('Song: ' + data.tracks.items[num].name);
          var temp = data.tracks.items[num].preview_url
          if (temp) {
            console.log('Sample URL: ' + data.tracks.items[num].preview_url);
          } else {
            console.log('Sample URL not available on Spotify!');
          }
        });
      };
    });
  }
};








