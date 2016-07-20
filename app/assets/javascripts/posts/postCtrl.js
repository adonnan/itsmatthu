angular.module('itsmatthu')
.controller('PostCtrl', [
  '$scope',
  '$stateParams',
  function($scope,$stateParams){
    $scope.content = $stateParams.id;
    $scope.md = "#markdown"
  }
]);
