angular.module('itsmatthu')
.controller('LabTraktCtrl',
['$scope','trakt','$http', '$mdDialog',
function($scope, trakt, $http, $mdDialog){
  $scope.spinner = true;
  $scope.images = {}
  $scope.infos = {}
  $http.get('/trakt/shows').then(function(data){
    $scope.myshows = data;
    $scope.spinner = false;
    setImage();
  });

  var setImage = function() {
    angular.forEach($scope.myshows.data,function(show){
      $http.get('/trakt/show/'+show.show.ids.trakt+'?extended=images').then(function(resp){
        $scope.images[show.show.ids.trakt] = resp.data.images.fanart.full;
      });
      $http.get('/trakt/show/'+show.show.ids.trakt+'?extended=full').then(function(resp){
        $scope.infos[show.show.ids.trakt] = resp.data
      });
    });
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
