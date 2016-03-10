app.controller('mainCtrl', function($scope) {
  $scope.list1 = "content";
  $scope.list2 = "";
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

  $scope.play = function() {
    console.log("$scope.list1 ", $scope.list1);
    console.log("$scope.list2 ", $scope.list2);
  }
})
