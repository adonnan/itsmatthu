angular.module('itsmatthu')
.controller('MainCtrl',[
  '$scope',
  'posts',
  '$mdToast',
  function($scope, posts, $mdToast){
  $scope.name = 'Itsmatthu';
  $scope.posts = posts.posts;
  $scope.posts.push({
    title: $scope.title,
    link: $scope.link,
    upvotes: 0,
    comments: [
      {author: 'Joe', body: 'Cool post!', upvotes: 0},
      {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
    ]
  });
  $scope.showSimpleToast = function(){
    $mdToast.show(
      $mdToast.simple()
      .textContent('Toast Message')
      .position('bottom right')
      .hideDelay(3000)
      .parent(angular.element('.main-content'))
    );
  };
  $scope.addPost = function(){
    if(!$scope.title || $scope.title === '') { return; }
    posts.create({
      title: $scope.title,
      link: $scope.link,
    });
    $scope.title = '';
    $scope.link = '';
  };
  // $scope.incrementUpvotes = function(post) {
  //   post.upvotes += 1;
  // };
  $scope.incrementUpvotes = function(post) {
    posts.upvote(post);
  };
  $scope.addComment = function(){
    if($scope.body === '') { return; }
    posts.addComment(post.id, {
      body: $scope.body,
      author: 'user',
    }).success(function(comment) {
      $scope.post.comments.push(comment);
    });
    $scope.body = '';
  };
}]);
