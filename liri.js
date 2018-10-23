var request = require('request');
var moment = require('moment');
var Spotify = require('node-spotify-api');


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
      temp = bandsInTownData[i].venue.datetime
      console.log('Date: ' + moment(temp).format('DD/MM/YYYY'));
      console.log('City/Country: ' + bandsInTownData[i].venue.city + ', ' + bandsInTownData[i].venue.country)
      console.log('Location : ' + bandsInTownData[i].venue.latitude + ', ' + bandsInTownData[i].venue.longitude);
    };
  });

} else if (process.argv[2] === 'movie-this') {
  //OMDB 
  var movieTitle = process.argv[3].trim();
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


} else if (process.argv[2] === 'spotify-this-song') {
  //Spotify
  var spotify = new Spotify({
    id: '78ad70a9c26e4dc788787f51173945ad',
    secret: 'd712dc33c72c4f428d84c06ba0dd5185'
  });
  var song = process.argv.slice(3).join(' ');

  spotify.search({ type: 'track', query: song, limit: 1 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log('Artist: ' + data.tracks.items[0].artists[0].name);
    console.log('Album: ' + data.tracks.items[0].album.name);
    console.log('Song: ' + data.tracks.items[0].name);
    var temp = data.tracks.items[0].preview_url
    if (temp) {
      console.log('Sample URL: ' + data.tracks.items[0].preview_url);
    } else {
      console.log('Sample URL not available on Spotify!');
    }

  });
};


