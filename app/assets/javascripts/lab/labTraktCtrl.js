angular.module('itsmatthu')
.controller('LabTraktCtrl',
['$scope','trakt','$http', '$mdDialog',
function($scope, trakt, $http, $mdDialog){
  $scope.spinner = true;
  $http.get('/trakt/shows').then(function(data){
    $scope.myshows = data;
    $scope.spinner = false;
    setImage();
  });

  var setImage = function() {
    // debugger;
    // var a = $('#img_game-of-thrones');
    // if(a){
    //   console.log(a);
    //   $('#img_game-of-thrones')[0].setAttribute('src', 'http://s.cn.bing.net/az/hprichbg/rb/PhnomKulenNP_ZH-CN10975081651_1920x1080.jpg');
    // }
  }

  // angular.forEach($scope.myshows, function(show){
  //   $http.get('/trakt/show/game-of-thrones?extented=images').then(function(data){
  //     angular.element('img_game-of-thrones')
  //   });
  // })

  $scope.showDetail = function(ev, id){
    $mdDialog.show({
      controller: 'traktShowDetailCtrl',
      templateUrl: 'lab/_show.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
      resolve: {
        showinfo: ['trakt', function(trakt){
          return trakt.getShow(id, 'full');
        }],
        showimage: ['trakt', function(trakt){
          return trakt.getShow(id, 'images')
        }]
      }
    });
    console.log(id);
  };
}]);
