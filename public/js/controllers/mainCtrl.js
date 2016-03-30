app.controller('mainCtrl', function($scope, $sce, emojiFactory, musicFactory) {

  $scope.showPlayer = false;
  var score = {
    sad_score: 0,
    fire_score: 0,
    angry_score: 0,
    top10_score: 0,
    chill_score: 0
  };


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

  $scope.musicUrl = "";

  // Helper Function to pick the song
  function pickSong() {
    $scope.musicGenerator.forEach(function(emoji) {
      for (var key in score) {
        if (emoji[key]) {
          //apply the modifier to the score
          score[key] = score[key] + (emoji.position[0] + emoji.position[
            1]) * emoji[key]
        }
      }
    })
    console.log("score ", score);
    for (var i = 0; i < $scope.music.length; i++) {
      if (score === $scope.music[i].value) {
        $scope.musicUrl = $scope.music[i].url
      }
    }
  }

  //Generate instance of spotify player
  $scope.generate = function() {
    pickSong();
    console.log("$scope.musicGenerator ", $scope.musicGenerator);
    $scope.musicUrl = $sce.trustAsResourceUrl($scope.musicUrl);
    $scope.showPlayer = true;
  }

  $scope.clear = function() {
    $scope.showPlayer = false;
  }

  //List of Spotify URIS
  $scope.music = musicFactory.songs;

  //Track statistics of where things are dropped
  $scope.musicGenerator = [];

  // Updating the generator object
  $scope.updateGen = function(e) {
    //returns true or false
    var found = $scope.musicGenerator.some(function(el) {
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
      $scope.musicGenerator.push(temp);
    }
    //If it already exists update the position
    for (var i = 0; i < $scope.musicGenerator.length; i++) {
      if ($scope.musicGenerator[i].name === e.target.id) {
        $scope.musicGenerator[i].position = [e.screenX, e.screenY];
      }
    }
  }
})
