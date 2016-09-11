angular.module('itsmatthu')
.factory('categoryFactory',function(){
  var o = {
    categories: [
      {k: 0, v: 'learning & practice'},
      {k: 1, v: 'essay'},
      {k: 2, v: 'reference & translation'}
    ]
  };
  o.get = function(key){
    category = o.categories.find(function(cat){
      cat.k === key;
    });
    return category;
  };
  return o;
});
