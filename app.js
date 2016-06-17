  angular.module('todoApp', [])
    .controller('TodoListController', function($scope,$http) {
      $http.get('/test').then(function (res){
        console.log('index');
      })
      $scope.name = 'aum'
      console.log($scope.name);
    }
