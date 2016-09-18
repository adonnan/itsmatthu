angular.module('itsmatthu')
.controller('LabCtrl',['$scope','$state',function($scope, $state){
  $scope.goToTrakt = function(){
    $state.go('lab_trakt');
  };
}]);
