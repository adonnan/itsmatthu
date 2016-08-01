var app = angular.module('itsmatthu',['ui.router','templates','Devise','ngMaterial','ngSanitize','btford.markdown']);
app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'home/_home.html',
        controller: 'MainCtrl',
        resolve: {
          postPromise: ['posts', function(posts){
            return posts.getAll();
          }]
        }
      })
      .state('blog', {
        url: '/blog',
        templateUrl: 'posts/_posts.html',
        controller: 'PostsCtrl',
        resolve: {
          postPromise: ['posts', function(posts){
            return posts.getAll();
          }]
        }
      })
      .state('create_post', {
        url: '/post/create',
        templateUrl: 'posts/_createPost.html',
        controller: 'PostCreateCtrl'
      })
      .state('post', {
        url: '/posts/{id}',
        templateUrl: 'posts/_post.html',
        controller: 'PostCtrl',
        resolve: {
          post: ['$stateParams', 'posts', function($stateParams, posts) {
            return posts.get($stateParams.id);
          }]
        }
      })
      .state('edit_post',{
        url: '/post/{id}/edit',
        templateUrl: 'posts/_editPost.html',
        controller: 'PostEditCtrl',
        resolve: {
          post: ['$stateParams', 'posts', function($stateParams, posts) {
            return posts.get($stateParams.id);
          }]
        }
      })
      .state('photo', {
        url: '/photo',
        templateUrl: 'photo/_photo.html',
        controller: 'PhotoCtrl'
      })
      .state('lab', {
        url: '/lab',
        templateUrl: 'lab/_lab.html',
        controller: 'LabCtrl'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'knowledge/_knowledge.html',
        controller: 'KnowledgeCtrl'
      })
      .state('history', {
        url: '/history',
        templateUrl: 'history/_history.html',
        controller: 'HistoryCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'auth/_login.html',
        controller: 'AuthCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (){
            $state.go('home');
          })
        }]
      })
      .state('register', {
        url: '/register',
        templateUrl: 'auth/_register.html',
        controller: 'AuthCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (){
            $state.go('home');
          })
        }]
      });

    $urlRouterProvider.otherwise('home');
  }]
);
