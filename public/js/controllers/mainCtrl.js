app.controller('mainCtrl', function($scope, $sce, emojiFactory, musicFactory) {

  $scope.showPlayer = false;
  var score = 0;


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

  //List of Spotify URIS
  $scope.music = musicFactory.songs;

  // Helper Function to pick the song
  function songUpdate() {
    console.log("$scope.music ", $scope.music);
    $scope.musicGenerator.forEach(function(data) {
      console.log("Data is ", data);
      score += (data.position[0] + data.position[1])
    })
    console.log("Score is ", score);
    // score = Math.ceil((Math.random() * 100) / 10) * 10;
    for (var i = 0; i < $scope.music.length; i++) {
      if (score === $scope.music[i].value) {
        $scope.musicUrl = $scope.music[i].url
      }
    }
  }

  $scope.generate = function() {
    songUpdate();
    $scope.musicUrl = $sce.trustAsResourceUrl($scope.musicUrl);
    $scope.showPlayer = true;
  }

  $scope.clear = function() {
    $scope.showPlayer = false;
  }

  //Track statistics of where things are dropped
  $scope.musicGenerator = [];

  // Updating
  $scope.update = function(e) {
    var found = $scope.musicGenerator.some(function(el) {
      return el.name === e.target.id;
    });
    if (!found) {
      $scope.musicGenerator.push({
        name: e.target.id,
        position: [e.screenX, e.screenY]
      });
    }
    for (var i = 0; i < $scope.musicGenerator.length; i++) {
      if ($scope.musicGenerator[i].name === e.target.id) {
        $scope.musicGenerator[i].position = [e.screenX, e.screenY];
      }
    }
  }
})
