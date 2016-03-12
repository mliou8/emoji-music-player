app.controller('mainCtrl', function($scope, $sce) {

  $scope.showPlayer = false;
  var score = 0;

  var images = [{
    id: "bearDiv",
    src: "/images/bear.png"
  }, {
    id: "santaDiv",
    src: "/images/santa_claus.png"
  }, {
    id: "turtleDiv",
    src: "/images/turtle.png"
  }, {
    id: "volcanoDiv",
    src: "/images/volcano.png"
  }, {
    id: "devilDiv",
    src: "/images/devil.png"
  }, {
    id: "injuredDiv",
    src: "/images/injured.png"
  }, {
    id: "chineseDiv",
    src: "/images/chinese.png"
  }, {
    id: "yinyangDiv",
    src: "/images/yinyang.png"
  }, {
    id: "fireDiv",
    src: "/images/firetruck.png"
  }, {
    id: "angryDiv",
    src: "/images/angry.png"
  }, {
    id: "toiletDiv",
    src: "/images/toilet.png"
  }];

  //Sort NG-repeat into columns
  function chunk(arr, size) {
    var newArr = [];
    for (var i = 0; i < arr.length; i += size) {
      newArr.push(arr.slice(i, i + size));
    }
    return newArr;
  }

  $scope.images = chunk(images, 4);
  console.log("$scope.images ", $scope.images)

  //List of Spotify URIS
  $scope.music = [{
    url: "https://embed.spotify.com/?uri=spotify:track:3VRXedC3QOvXZATRGlAyDR", //Nicki Minaj Song
    value: 10
  }, {
    url: "https://embed.spotify.com/?uri=spotify:track:0rkajHs0Kcw73nFDlKmuBk", //Classical Beethoven
    value: 20
  }, {
    url: "https://embed.spotify.com/?uri=spotify:track:13uW9hmN28qYQqoPykMB5d", // Summer Time
    value: 30
  }, {
    url: "https://embed.spotify.com/?uri=spotify:track:2qdP4opHhLkDUGxzirBy8M", // Skinny Love
    value: 40
  }, {
    url: "https://embed.spotify.com/?uri=spotify:track:7HzCxalzzYQOFb9a7Xs3j6", //Ibiza
    value: 50
  }, {
    url: "https://embed.spotify.com/?uri=spotify:track:0IKK48xF4eEdfofyaeKWWO", //Pillowtalk
    value: 60
  }]

  function songUpdate() {
    $scope.musicGenerator.forEach(function(data) {
      score += (data.position[0] + data.position[1])
    })
    score = Math.ceil((Math.random() * 100) / 10) * 10;
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
