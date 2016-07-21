angular.module('itsmatthu')
.controller('PostsCtrl', [
  '$scope',
  '$state',
  'posts',
  function($scope, $state, posts){
    $scope.posts = posts.posts;
    $scope.enterPost = function(id){
      $state.go('post', {'id': id});
    };
    $scope.gotoPostCreate = function(){
      $state.go('create_post');
    };
  }]
);
