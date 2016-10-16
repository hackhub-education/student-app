/**
 * Created by yanhong on 2016-10-09.
 */
var myapp = angular.module('student', []);
var host = 'http://localhost:3000/api/';

myapp.controller('studentController', function($http, $scope) {
    $scope.students = [];

    $http.get(host + 'students').success(function(response) {
        $scope.students = response;
    });

    $scope.getStudentDetail = function(sid) {
        $http.get(host + 'student/' + sid).success(function(response){
           $scope.clickedStudent = response;
        });
    };

    $scope.createNewStudent = function() {
        $http.post(host + 'student/new', $scope.newStudent).success(function(response) {
            var isNew = true;
            for (var i = 0; i < $scope.students.length; i++) {
                if ($scope.students[i]._id === response._id) {
                    $scope.students[i] = response;
                    isNew = false;
                }
            }
            if (isNew) {
                $scope.students.push(response);

            } else {
                $scope.clickedStudent = response;
            }
            $scope.newStudent = undefined;
        });
    };

    $scope.clearClickedStudent = function() {
        $scope.clickedStudent = undefined;
    };

    $scope.deleteStudent = function(sid) {
        $http.delete(host + 'student/' + sid).success(function(response) {
            for (var i = 0; i < $scope.students.length; i++) {
                if ($scope.students[i]._id === response._id) {
                    $scope.students.splice(i, 1);
                    $scope.clickedStudent = undefined;
                }
            }

        })
    };

    $scope.showEditForm = function() {
        $scope.newStudent = $scope.clickedStudent;
        $scope.clickedStudent = undefined;
    };
});