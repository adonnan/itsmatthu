angular.module('itsmatthu')
.controller('PostCtrl', [
  '$scope',
  '$stateParams',
  '$state',
  'post',
  '$mdDialog',
  'posts',
  'Auth',
  function($scope,$stateParams,$state, post, $mdDialog, posts, Auth){
    $scope.isLoggedin = Auth.isAuthenticated;
    $scope.id = $stateParams.id;
    $scope.title = post.title;
    $scope.category = post.category;
    $scope.time = post.created_at;
    $scope.tags = post.tags==null ? [] : post.tags.split(',');
    $scope.ref = post.link;
    $scope.content = post.content;
    $scope.editPost = function(){
      $state.go('edit_post', {'id': $scope.id});
    };
    $scope.backToList = function(){
      $state.go('blog');
    };
    $scope.confirmDelete = function(ev){
      var confirm = $mdDialog.confirm()
        .title('!Delete Post!')
        .textContent('This post will be deleted totally, please make sure you want to do this.')
        .ariaLabel('Lucky day')
        .targetEvent(ev)
        .ok('Delete')
        .cancel('Cancel');
      $mdDialog.show(confirm).then(function() {
        posts.delete($stateParams.id)
          .then(function(response){
            $state.go('blog');
          },function(error){
        });;
      }, function(){});
    };
  }
]);
