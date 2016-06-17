angular.module('todoApp', [])
    .controller('TodoListController', function($http, $scope) {
        $scope.add = function() {
            var data = {
                name: $scope.name
            }
            $http.post('http://192.168.2.130:10000/users', data).then(function(res) {
                console.log(res)
            });
        }
    });
