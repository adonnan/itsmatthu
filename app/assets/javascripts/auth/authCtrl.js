angular.module('itsmatthu')
.controller('AuthCtrl',[
  '$scope',
  '$state',
  'Auth',
  '$rootScope',
  function($scope, $state, Auth, $rootScope){
    $scope.login = function() {
      Auth.login($scope.user).then(function(){
        $rootScope.$emit('login',{name: 'admin'});
        $state.go('home');
      });
    };

    $scope.register = function() {
      Auth.register($scope.user).then(function(){
        $state.go('home');
      });
    };
  }
]);
