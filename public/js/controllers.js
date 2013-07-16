todoApp.controller('TodoCtrl', function($scope, $http) {

    $scope.todos = [];

    // Get all todos
    $http.get('/todos')
        .success(function(todos) {
            $scope.loaded = true;
            $scope.todos = todos;
        }).error(function(err) {
            alert(err);
        });

    $scope.addTodo = function(title) {
        $http.post('/todos', {
            title: title
        }).success(function(todo) {
            $scope.newTodoTitle = '';
            $scope.todos.push(todo);
        }).error(function(err) {
            // Alert if there's an error
            return alert(err.message || "an error occurred");
        });
    };

    $scope.changeCompleted = function(todo) {
        // Update the todo
        $http.put('/todos/' + todo.id, {
            completed: todo.completed
        }).error(function(err) {
            return alert(err.message || (err.errors && err.errors.completed) || "an error occurred");
        });
    };

    $scope.removeCompletedItems = function() {
        $http.get('/todos', {
            params: {
                completed: true
            }
        }).success(function(todos) {
            todos.forEach(function(t) { deleteTodo(t); });
        });
    };

    function deleteTodo(todo) {
        $http.delete('/todos/' + todo.id, {
            params: {
                completed: true
            }
        }).success(function() {
            // Find the index of an object with a matching id
            var index = $scope.todos.indexOf(
                $scope.todos.filter(function(t) {
                    return t.id === todo.id;
                })[0]);

            if (index !== -1) {
                $scope.todos.splice(index, 1);
            }
        }).error(function(err) {
            alert(err.message || "an error occurred");
        });
    }

});

todoApp.controller('LoginCtrl', function($scope, $http, $location) {
    $scope.login = login;

    function login() {
        var username = $('#username').val();
        var password = $('#password').val();

        $http.post('/users/login', {username: username, password: password})
            .success(function(user) {
                $location.path("/welcome");
            }).error(function(err){
               alert(err.message);
            });
        return false;
    }

});

todoApp.controller('RegisterCtrl', function($scope, $http, $location) {
    $scope.singUp = singUp;

    function singUp() {
        var username = $('#username').val();
        var password = $('#password').val();
        var confirmPassword = $('#confirm-password').val();

        if (!username) {
            alert("Username is required");
        } else if (!password) {
            alert("Password is required");
        } else if (password !== confirmPassword) {
            alert("Passwords do not match");
        } else {
            $http.post('/users', {username: username, password: password})
                .success(function(user) {
                    $http.post('/users/login', {username: username, password: password})
                        .success(function(user) {
                            $location.path("/welcome");
                        }).error(function(err){
                           alert(err.message);
                        });
                }).error(function(err){
                   alert(JSON.stringify(err));
                });
        }
        return false;        
    }

});

todoApp.controller('WelcomeCtrl', function($scope, $http, $location) {
    $scope.userName = '';
    $scope.logout = logout;

    function logout() { 
        $http.post('/users/logout')
            .success(function(res) {
                $location.path("/");
            });
    }

    $http.get('/users/me')
        .success(function(user) {
            $scope.userName = user.username;
        }).error(function(err){
           $location.path("/");
        });
});

