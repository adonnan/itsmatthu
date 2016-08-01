angular.module('itsmatthu')
.factory('posts', ['$http',function($http){
  var o = {
    posts: [
      {
        title: 'How to Get Away with Murder',
        category: 'technology',
        content: 'try me',
        tags: ['tag','ruby','shows'],
        ref: '',
        time: '2016-07-09',
        upvotes: 5
      },
      {
        title: 'Gotham',
        category: 'technology',
        content: 'try me',
        tags: ['tag','ruby'],
        ref: '',
        time: '2016-07-09',
        upvotes: 5
      },
      {
        title: 'How I Met Your Mother',
        category: 'technology',
        content: 'try me',
        tags: ['tag','ruby'],
        ref: '',
        time: '2016-07-09',
        upvotes: 5
      },
      {
        title: 'Integrate Angular with Rails 5',
        category: 'technology',
        content: 'try me',
        tags: ['tag','ruby'],
        ref: '',
        time: '2016-07-09',
        upvotes: 5
      },
      {
        title: 'Game of Thrones',
        category: 'technology',
        content: 'try me',
        tags: ['tag','ruby'],
        ref: '',
        time: '2016-07-09',
        upvotes: 5
      },
      {
        title: 'Arrow',
        category: 'technology',
        content: 'try me',
        tags: ['tag','ruby'],
        ref: '',
        time: '2016-07-09',
        upvotes: 5
      },
      {
        title: 'Flash',
        category: 'technology',
        content: 'try me',
        tags: ['tag','ruby'],
        ref: '',
        time: '2016-07-09',
        upvotes: 5
      },
      {
        title: 'post 8',
        category: 'technology',
        content: 'try me',
        tags: ['tag','ruby'],
        ref: '',
        time: '2016-07-09',
        upvotes: 5
      },
      {
        title: 'post 9',
        category: 'technology',
        content: 'try me',
        tags: ['tag','ruby'],
        ref: '',
        time: '2016-07-09',
        upvotes: 5
      },
      {
        title: 'post 10',
        category: 'technology',
        content: 'try me',
        tags: ['tag','ruby'],
        ref: '',
        time: '2016-07-09',
        upvotes: 5
      },
      {
        title: 'post 11',
        category: 'technology',
        content: 'try me',
        tags: ['tag','ruby'],
        ref: '',
        time: '2016-07-09',
        upvotes: 5
      }
    ]
  };
  o.getAll = function() {
    return $http.get('/posts.json').success(function(data){
      angular.copy(data, o.posts);
    });
  };
  o.get = function(id) {
    return $http.get('/posts/' + id + '.json').then(function(res){
      return res.data;
    });
  };
  o.create = function(post) {
    return $http.post('/posts.json', post);
  };
  o.update = function(post) {
    var post_id = post.id;
    delete post['id'];
    return $http.put('/posts/'+post_id +'.json', post);
  };
  o.delete = function(id) {
    return $http.delete('/posts/'+id+'.json');
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
