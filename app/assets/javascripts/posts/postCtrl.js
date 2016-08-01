angular.module('itsmatthu')
.controller('PostCtrl', [
  '$scope',
  '$stateParams',
  '$state',
  'post',
  '$mdDialog',
  'posts',
  function($scope,$stateParams,$state, post, $mdDialog, posts){
    $scope.id = $stateParams.id;
    // $scope.title = "How to Integrate Angular with Rails 5";
    $scope.title = post.title;
    $scope.category = post.category;
    $scope.time = post.created_at;
    $scope.tags = post.tags==null ? [] : post.tags.split(',');
    $scope.ref = post.link;
    // $scope.content = "described above works well for smaller \
    // collections, but once your data set reaches a certain size, you may not want \
    // to have to get the `entire collection from the server` just to view a few \
    // pages. The solution to this is to paginate on the server-side, whereby the \
    // server will only send one page of data at a time. In this case, the \
    // directive would see the small (one page) data set and think that was all, \
    // resulting in no pagination at all (assuming you set the itemsPerPage filter \
    // to match the number of items returned per server-side page). After running \
    // into this very scenario, I added the ability to accommodate server-side \
    // paging with only a few additions to what is described above. There is a \
    // full write-up and example of how this would work in the here in the \
    // documentation on GitHub.\n ####The arrangement\n described above works well for smaller \
    // collections, but once your data set reaches a certain size, you may not want \
    // to have to get the `entire collection from the server` just to view a few \
    // pages. The solution to this is to paginate on the server-side, whereby the \
    // server will only send one page of data at a time. In this case, the \
    // directive would see the small (one page) data set and think that was all, \
    // resulting in no pagination at all (assuming you set the itemsPerPage filter \
    // to match the number of items returned per server-side page). After running \
    // into this very scenario, I added the ability to accommodate server-side \
    // paging with only a few additions to what is described above. There is a \
    // full write-up and example of how this would work in the here in the \
    // documentation on GitHub.";
    $scope.content = post.content;
    $scope.editPost = function(){
      $state.go('edit_post', {'id': $scope.id});
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
    // $scope.md = "markdown";
  }
]);
