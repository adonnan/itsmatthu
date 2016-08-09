angular.module('itsmatthu')
.controller('NavCtrl',[
  '$scope',
  'Auth',
  '$mdDialog',
  '$state',
  function($scope, Auth, $mdDialog, $state){
    $scope.signedIn = Auth.isAuthenticated;
    $scope.logout = Auth.logout;
    $scope.currentNavItem = 'page1';
    $scope.like = function(){
      alert('like');
    };

    Auth.currentUser().then(function (user){
      $scope.user = user;
    });

    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    $scope.login = function(){
      $state.go('login');
    };

    $scope.logout = function(){
      Auth.logout();
    };

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
