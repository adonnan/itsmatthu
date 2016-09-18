angular.module('itsmatthu')
.controller('traktShowDetailCtrl', function($scope, $mdDialog, showinfo, showimage){
  $scope.show = showinfo.data;
  $scope.showimage = showimage.data;
  $scope.close = function(){
    $mdDialog.hide();
  }
});
