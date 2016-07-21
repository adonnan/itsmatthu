angular.module('itsmatthu')
.factory('posts', ['$http',function($http){
  var o = {
    posts: [
      {
        title: 'post 1',
        category: 'technology',
        content: 'try me',
        tags: ['tag','ruby'],
        ref: '',
        time: '2016-07-09',
        upvotes: 5
      },
      {
        title: 'post 2',
        category: 'technology',
        content: 'try me',
        tags: ['tag','ruby'],
        ref: '',
        upvotes: 5
      },
      {
        title: 'post 3',
        category: 'technology',
        content: 'try me',
        tags: ['tag','ruby'],
        ref: '',
        upvotes: 5
      },
      {
        title: 'post 4',
        category: 'technology',
        content: 'try me',
        tags: ['tag','ruby'],
        ref: '',
        upvotes: 5
      },
      {
        title: 'post 5',
        category: 'technology',
        content: 'try me',
        tags: ['tag','ruby'],
        ref: '',
        upvotes: 5
      },
      {
        title: 'post 6',
        category: 'technology',
        content: 'try me',
        tags: ['tag','ruby'],
        ref: '',
        upvotes: 5
      },
      {
        title: 'post 7',
        category: 'technology',
        content: 'try me',
        tags: ['tag','ruby'],
        ref: '',
        upvotes: 5
      },
      {
        title: 'post 8',
        category: 'technology',
        content: 'try me',
        tags: ['tag','ruby'],
        ref: '',
        upvotes: 5
      },
      {
        title: 'post 9',
        category: 'technology',
        content: 'try me',
        tags: ['tag','ruby'],
        ref: '',
        upvotes: 5
      },
      {
        title: 'post 10',
        category: 'technology',
        content: 'try me',
        tags: ['tag','ruby'],
        ref: '',
        upvotes: 5
      },
      {
        title: 'post 11',
        category: 'technology',
        content: 'try me',
        tags: ['tag','ruby'],
        ref: '',
        upvotes: 5
      }
    ]
  };
  o.getAll = function() {
    // return $http.get('/posts.json').success(function(data){
    //   angular.copy(data, o.posts);
    // });
    return o.posts;
  };
  o.get = function(id) {
    return $http.get('/posts/' + id + '.json').then(function(res){
      return res.data;
    });
  };
  o.create = function(post) {
    return $http.post('/posts.json', post).success(function(data){
      o.posts.push(data);
    });
  };
  o.upvote = function(post) {
    return $http.put('/posts/' + post.id + '/upvote.json')
      .success(function(data){
        post.upvotes += 1;
      });
  };
  o.addComment = function(id, comment) {
    return $http.post('/posts/' + id + '/comments.json', comment);
  };
  o.upvoteComment = function(post, comment) {
    return $http.put('/posts/' + post.id + '/comments/'+ comment.id + '/upvote.json')
      .success(function(data){
        comment.upvotes += 1;
      });
  };
  return o;
}]);
