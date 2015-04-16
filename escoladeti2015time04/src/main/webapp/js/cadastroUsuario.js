//module = angular.module("app", []);
AppModule.controller("cadastroUsuarioController", ["$scope", "$http", "$routeParams", "$log", function ($scope, $http, $routeParams, $log) {

        //$scope.isNovo = true;
        $scope.usuario = {};
        $scope.submitForm = function () {

            // verifica se o formulÃ¡rio Ã© vÃ¡lido
            if ($scope.userForm.$valid) {
                $scope.salvar();
            }
        };

        $scope.salvar = function () {
            $scope.usuario = {
                "login": $scope.user.username,
                "senha": $scope.user.password,
                "email": $scope.user.email,
                "status": "ATIVO",
                "nome": $scope.user.name
            };

            $log.log(JSON.stringify($scope.usuario));
            $http.post("/usuario", $scope.usuario)
                    .success(function () {
                        alert("Sucesso!");
//                        $scope.atualizar();
                        $scope.novo();
                    }).error(deuErro);

        }

        function deuErro(data) {
            alert(JSON.stringify(data) + "Lerigo!!!");
        }
        ;
//      function  OnFocusOutForm(event){
//	senha = document.cadastroUsuario.senha.value;
//	confirmarSenha = document.cadastroUsuario.confirmarSenha.value;
//
//	if (senha.length < 6){
//		alert("Senha muito curta")		
//	}else if (senha != confirmarSenha) {
//		alert("Senhas diferentes");
//	}
//};

           $scope.novo = function() {
               $scope.user = {};
           };


    }]);






