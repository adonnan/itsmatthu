angular.module('itsmatthu')
.factory('trakt',['$http', function($http){
  var o = {
    shows: []
  };
  o.getMyShows = function(){
    return $http.get('/trakt/get_token').success(function(resp){
      angular.copy(resp.data, o.shows);
    });
  };
  o.getShow = function(id, extended){
    return $http.get('/trakt/show/' + id + '?extended=' + extended).success(function(resp){
      return resp.data;
    });
  };

  return o;
}]);
