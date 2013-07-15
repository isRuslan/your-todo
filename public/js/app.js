'use strict';

var todoApp = angular.module('todoApp', []);
todoApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/todo', {templateUrl: 'partials/todos.html', controller: 'TodoCtrl'});
    $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtrl'});
    $routeProvider.when('/register', {templateUrl: 'partials/register.html', controller: 'RegisterCtrl'});
    $routeProvider.when('/welcome', {templateUrl: 'partials/welcome.html', controller: 'WelcomeCtrl'});
    $routeProvider.otherwise({redirectTo: '/login'});
  }]);