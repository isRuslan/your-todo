todoApp.controller('TodoCtrl', function($scope, $http, $location) {
    /**
    * variables
    */
    $scope.todos = [];
    $scope.userName = null;
    $scope.userId = null;
    /**
    * functions
    */
    $scope.getUser = getUser;
    $scope.getTodos = getTodos;
    $scope.addTodo = addTodo;
    $scope.changeCompleted = changeCompleted;
    $scope.removeCompletedItems = removeCompletedItems;
    $scope.logout = logout;

    getUser();

    function getUser() {
        $http.get('/users/me').success(function(user) {
            $scope.userName = user.username;
            $scope.userId = user.id;
            getTodos(user.id);
        }).error(function(err){
           $location.path("/");
        });
    }

    function getTodos(userId) {
        $http.get('/todos', {
            params: {
                ownerId: userId
            }
        }).success(function(todos) {
            $scope.loaded = true;
            $scope.todos = todos;
        }).error(function(err) {
            alert(err);
        });
    }

    function addTodo(title, userId) {
        $http.post('/todos', {
            title: title,
            ownerId: userId
        }).success(function(todo) {
            $scope.newTodoTitle = '';
            $scope.todos.push(todo);
        }).error(function(err) {
            return alert(err.message || "an error occurred");
        });
    };

    function changeCompleted(todo) {
        $http.put('/todos/' + todo.id, {
            completed: todo.completed
        }).error(function(err) {
            return alert(err.message || (err.errors && err.errors.completed) || "an error occurred");
        });
    };

    function removeCompletedItems() {
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

    function logout() { 
        $http.post('/users/logout').success(function(res) {
            $location.path("/");
        });
    }
});

todoApp.controller('LoginCtrl', function($scope, $http, $location) {
    /**
    * functions
    */
    $scope.login = login;

    function login(username, password) {
        $http.post('/users/login', {
            username: username, password: password
        }).success(function(user) {
            $location.path("/todo");
        }).error(function(err){
           alert(err.message);
        });
    }

});

todoApp.controller('RegisterCtrl', function($scope, $http, $location) {
    /**
    * functions
    */
    $scope.singUp = singUp;

    function singUp(username, password) {
        $http.post('/users', {
            username: username, 
            password: password
        }).success(function(user) {
            $http.post('/users/login', {
                username: username,
                password: password
            }).success(function(user) {
                $location.path("/todo");
            }).error(function(err){
               alert(err.message);
            });
        }).error(function(err){
           alert(JSON.stringify(err));
        });
      
    }

});

todoApp.controller('WelcomeCtrl', function($scope, $http, $location) {
    /**
    * variables
    */
    $scope.userName = '';
    /**
    * functions
    */
    $scope.logout = logout;

    function logout() { 
        $http.post('/users/logout').success(function(res) {
            $location.path("/");
        });
    }

    $http.get('/users/me').success(function(user) {
        $scope.userName = user.username;
    }).error(function(err){
       $location.path("/");
    });
});

