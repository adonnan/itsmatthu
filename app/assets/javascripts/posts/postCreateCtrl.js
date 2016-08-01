angular.module('itsmatthu')
.controller('PostCreateCtrl',[
  '$scope',
  '$state',
  'posts',
  function($scope, $state, posts){
  $scope.tags = ['A','B','C'];
  $scope.cancelCreate = function(){
    $state.go('blog');
  };
  $scope.postCreate = function(){
    $scope.p = {}
    posts.create({
      title: $scope.title,
      category: $scope.category,
      privacy: $scope.privacy,
      tags: $scope.tags.join()
    }).then(function(response){
      $state.go('post', {id: response.data.id})
    },function(error){
      $scope.p = error;
    });
  };
}])
