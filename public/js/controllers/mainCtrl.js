app.controller('mainCtrl', function($scope) {

  $scope.images = [{
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
  }];

  $scope.musicGenerator = [];

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

  $scope.play = function() {
    console.log($scope.musicGenerator);
  }
})
