angular.module('itsmatthu')
.controller('PostEditCtrl',[
  '$scope',
  '$stateParams',
  '$state',
  'posts',
  'post',
  function($scope, $stateParams, $state, posts, post){
    $scope.tags = post.tags.toString().split(',');
    $scope.title = post.title;
    $scope.category = post.category;
    $scope.time = post.created_at;
    $scope.ref = post.link;
    $scope.content = post.content;
    $scope.cancelEdit = function(){
      $state.go('post',{id: $stateParams.id});
    };
    $scope.savePost = function(){
      posts.update({
        id: post.id,
        title: $scope.title,
        tags: $scope.tags,
        link: $scope.ref,
        content: $scope.content
      }).then(function(response){
        $state.go('post', {id: post.id});
      },function(error){});
    };
}]);
