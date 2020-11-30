module.exports = {
  getSpotifyAccessToken: (spotifyApi) => {
    try {
      spotifyApi.clientCredentialsGrant().then(
        (data) => {
          console.log(
            "Spotify access token expires in " + data.body["expires_in"]
          );
          spotifyApi.setAccessToken(data.body["access_token"]);
          setTimeout(
            () => this.getSpotifyAccessToken(spotifyApi),
            (data.body["expires_in"] - 20) * 1000
          );
        },
        (err) => {
          console.log(
            "Something went wrong when retrieving an access token",
            err
          );
          this.process.exit(1);
        }
      );
    } catch (err) {
      console.log(err);
    }
  },
};
