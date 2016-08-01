angular.module('itsmatthu')
.controller('NavCtrl',[
  '$scope',
  'Auth',
  function($scope, Auth){
    $scope.signedIn = Auth.isAuthenticated;
    $scope.logout = Auth.logout;
    $scope.currentNavItem = 'page1';

    Auth.currentUser().then(function (user){
      $scope.user = user;
    });

    $scope.$on('devise:new-registration', function (e, user){
      $scope.user = user;
    });

    $scope.$on('devise:login', function (e, user){
      $scope.user = user;
    });

    $scope.$on('devise:logout', function (e, user){
      $scope.user = {};
    });
  }]
);
