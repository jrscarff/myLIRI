# myLIRI

myLIRI is a terminal application that will allow you to search for songs via spotify using song name, pull in recent tweets from Twitter giving a twitter handle, pull in movie information from OMDB from a given titl, and do whatever the random.txt file states of those three options.

## Getting Started

Makes sure to get your Twitter and Spotify API keys and add them to a .env file. Also make sure to npm install twitter, inquirer, spotify, request, dotenv and fs.

### Prerequisites

You will need to navigate to the file in your terminal and as long as your package.json file is in the folder with the required dependencies. If the dependencies are there use,

```
npm install
```

from the folder in terminal. If the dependencies are not there, you will have to npm install all of the dependecies individually (npm install twitter fs request dotenv node-spotify-api inquirer)

### Installing

If the dependencies are there use,

```
npm install
```

from the folder in terminal. If the dependencies are not there, you will have to npm install all of the dependecies individually. 

```
npm install twitter fs request dotenv node-spotify-api inquirer
```

## Deployment

Just once again make sure you have a .env file with 

```
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

# Twitter API keys

TWITTER_CONSUMER_KEY=your-twitter-consumer-key
TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret
```

Also, check the file named keys.js and make sure this is in it.

```
exports.twitter = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
```



## Built With

* [OMDB](http://www.omdbapi.com/) - Used in conjunction with request to query for movie data
* [Twitter](https://www.npmjs.com/package/twitter) - Used to pull in tweets froma given handle
* [Spotify](https://www.npmjs.com/package/node-spotify-api) - Used to query by song namefor song information
* [Request](https://www.npmjs.com/package/request) - Used to request movie information
* [Dotenv](https://www.npmjs.com/package/dotenv) - Setting environmental with the dotenv package

## Versioning

Check the package.json file for the required dependencies for the application to work.

## Authors

* **Ryan Scarff** - *Initial work* - [PurpleBooth](https://github.com/jrscarff/myLIRI)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Node Modules request fs and dotenv, thank you for your availability.