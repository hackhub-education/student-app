/**
 * Created by yanhong on 2016-10-09.
 */
var myapp = angular.module('student', []);

myapp.controller('studentController', function($http, $scope) {
    $scope.students = [];
    $http.get('http://localhost:3000/api/students').success(function(response) {
        $scope.students = response;
    })
});