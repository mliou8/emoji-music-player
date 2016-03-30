app.controller('mainCtrl', function($scope, $sce, emojiFactory, musicFactory) {

  $scope.showPlayer = false;
  //temp storage for valid songs
  var valid_songs = [];
  //final song URL
  $scope.musicUrl = "";
  //List of Spotify URIS
  $scope.music = musicFactory.songs;
  //Track statistics of where things are dropped
  var boardEmojis = [];

  //Sort NG-repeat into columns
  function chunk(arr, size) {
    var newArr = [];
    for (var i = 0; i < arr.length; i += size) {
      newArr.push(arr.slice(i, i + size));
    }
    return newArr;
  }
  var images = emojiFactory.images;
  $scope.images = chunk(images, 4);

  // Updating the generator object
  $scope.updateGen = function(e) {
    //returns true or false
    var found = boardEmojis.some(function(el) {
      return el.name === e.target.id;
    });
    if (!found) {
      var temp = {
        name: e.target.id,
        position: [e.screenX, e.screenY]
      }
      for (var i = 0; i < images.length; i++) {
        if (temp.name === images[i].id) {
          for (var key in images[i]) {
            if (!temp.key)
              temp[key] = images[i][key]
          }
        }
      }
      boardEmojis.push(temp);
    }
    //If it already exists update the position
    for (var i = 0; i < boardEmojis.length; i++) {
      if (boardEmojis[i].name === e.target.id) {
        boardEmojis[i].position = [e.screenX, e.screenY];
      }
    }
  }

  // Helper Function to pick the song
  function pickSong() {
    $scope.music.forEach(function(song) {
        for (var i = 0; i < boardEmojis.length; i++) {
          for (var j = 0; j < song.emoji_keys.length; j++) {
            if (boardEmojis[i].name.indexOf(song.emoji_keys[j]) !== -
              1) {
              //Match found
              valid_songs.push(song.url);
            }
          }
        }
      })
      //Finished populating valid_songs, return a valid song_url
    var randIndex = Math.floor((Math.random() * valid_songs.length + 1));
    $scope.musicUrl = valid_songs[randIndex];
  }


  //Generate instance of spotify player
  $scope.generate = function() {
    pickSong();
    $scope.musicUrl = $sce.trustAsResourceUrl($scope.musicUrl);
    $scope.showPlayer = true;
  }
  $scope.clear = function() {
    $scope.showPlayer = false;
  }
})
