AppModule.controller("UsuarioListController", ["$scope", function($scope) {

        $scope.remove = function(id) {
            alert("Remover o Id:" + id);
        };

    }]);


AppModule.controller("UsuarioFormController", ["$scope", "$routeParams", function($scope, $routeParams) {

        $scope.init = function() {
            //alert("Executou Init");
            alert("Parametro Id:" + $routeParams.id);
        };

    }]);