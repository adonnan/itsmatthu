angular.module('itsmatthu')
.controller('PostCtrl', [
  '$scope',
  '$stateParams',
  function($scope,$stateParams){
    $scope.id = $stateParams.id;
    $scope.title = "How to Integrate Angular with Rails 5";
    $scope.category = "Technic"
    $scope.time = "2016-07-20";
    $scope.tags = ['ruby', 'bb'];
    $scope.ref = "https://material.angularjs.org/latest/demo/panel";
    $scope.content = "#The arrangement\n described above works well for smaller \
    collections, but once your data set reaches a certain size, you may not want \
    to have to get the `entire collection from the server` just to view a few \
    pages. The solution to this is to paginate on the server-side, whereby the \
    server will only send one page of data at a time. In this case, the \
    directive would see the small (one page) data set and think that was all, \
    resulting in no pagination at all (assuming you set the itemsPerPage filter \
    to match the number of items returned per server-side page). After running \
    into this very scenario, I added the ability to accommodate server-side \
    paging with only a few additions to what is described above. There is a \
    full write-up and example of how this would work in the here in the \
    documentation on GitHub.";
    // $scope.md = "markdown";
  }
]);
