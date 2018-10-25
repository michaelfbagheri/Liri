# Liri

Liri is an app designed to provide you entertainemetn related facts in the categories of Movies, Songs, and up coming concert listings.

Users can retrieve data from one of 3 databases, OMDB for movies, Spotify for song related info, and Bands In Town for upcoming concert listings. 

How to:
1.upon downloading the package from GitHub simply run "node init" on your main folder in order to download and install the necessary dependencies/packages.
2.apply for a Spotify ID/API-key by visiting *https://developer.spotify.com/dashboard/*

Upon obtaining your ID/Key simply paste the info into a txt file, placed into your main folder using blow format:

# Spotify API keys
SPOTIFY_ID= <ID>
SPOTIFY_SECRET=<Secret Key>

and the txt file as ".env".

the app will use this file in order to retrieve the necessary credentials.

3. launch gitbash, navigate to your directory and type one of 3 below commands:
3-A: node movie-this <name of movie> (please note that if name of movie is left blank info regarding a default/pre-determined film will be provided)
3-A-1: sample video can be found at *https://github.com/michaelfbagheri/Liri-node-app/blob/master/videoCapture/movie-this.mp4*.
  
3-B: node spotify-this-song <song name> (please note that if song name is left blank info regarding a default/pre-determined song will be provided, NOTE: if you don't want to see info regarding some terrible 90's music song's PLEASE fill in your favorit song, DON'T RISK IT!)
3-B-1: sample video can be found at *https://github.com/michaelfbagheri/Liri-node-app/blob/master/videoCapture/spotify-this-song.mp4*
  
3-C: node concert-this <artist name> (assuming the provided artist is going on tour and they have that infomration in the Bands In Town database, you'll get all concert listings along with date/town/venue-name/Long/Lat)
3-C-1: sample video can be found at *"https://github.com/michaelfbagheri/Liri-node-app/blob/master/videoCapture/concert-this.mp4"*

Enjoy! 
