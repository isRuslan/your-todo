'use strict';

var todoApp = angular.module('todoApp', []);
todoApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
    	.when('/todo', {templateUrl: 'partials/todos.html', controller: 'TodoCtrl'})
	    .when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtrl'})
	    .when('/register', {templateUrl: 'partials/register.html', controller: 'RegisterCtrl'})
	    .when('/welcome', {templateUrl: 'partials/welcome.html', controller: 'WelcomeCtrl'})
	    .otherwise({redirectTo: '/login'});
    $locationProvider
	  .html5Mode(false);
	  // .hashPrefix('!');
  }]);