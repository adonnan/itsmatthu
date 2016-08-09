angular.module('itsmatthu')
.controller('PostsCtrl', [
  '$scope',
  '$state',
  'posts',
  'Auth',
  function($scope, $state, posts, Auth){
    $scope.posts = posts.posts;
    $scope.enterPost = function(id){
      $state.go('post', {'id': id});
    };
    $scope.gotoPostCreate = function(){
      $state.go('create_post');
    };
    $scope.isLogined = Auth.isAuthenticated();
  }]
);
