angular.module('todoApp', [])
    .controller('TodoListController', function($http, $scope) {
      $scope.member = []
            $http.get('localhost:10000/members/').then(function(res) {
              console.log(res)
            });

        show_user()
        function show_user() {
          $http.get('http://localhost:10000/members').then(function(res) {
            $scope.member = res.data
            console.log(res);
          });
        }

    });
