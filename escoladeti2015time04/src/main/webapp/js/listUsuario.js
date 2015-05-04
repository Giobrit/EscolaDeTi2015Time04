AppModule.controller("UsuarioList", ["$scope", "$routeParams", function ($scope, $routeParams) {

        $scope.login = {};
        $scope.name = {};
        $scope.email = {};

        $scope.usuarios = [
            {login: "Joao123", nome: "Joao da Silva", email: "joao@hotmail.com", ativo: true},
            {login: "hhhh", nome: "Hhhh da hhh", email: "hhhh@hhh.com", ativo: false},
            {login: "Maria12", nome: "Maria da Silva", email: "mariazinha@uol.com", ativo: true}
        ];

        $scope.alterarStatus = function (usuario) {
            usuario.ativo = !usuario.ativo;
        };

        $scope.init = function () {
            $scope.limpar();
        };
//            

//            
        $scope.remove = function (id) {
            alert("Remover o Id:" + id);
        };

    }]);