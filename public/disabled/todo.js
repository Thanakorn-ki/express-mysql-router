angular.module('todoApp', [])
    .controller('TodoListController', function($http, $scope) {
      $scope.member = []
        $scope.add = function() {
            var data = {
                name: $scope.name,
                surname: $scope.surname,
                age: $scope.age
            }
            $http.post('http://192.168.2.130:10000/users', data).then(function(res) {
              console.log(res)
            });
        }
        show_user()
        function show_user() {
          $http.get('http://192.168.2.130:10000/users').then(function(res) {
            $scope.member = res.data
          });
        }

    });
