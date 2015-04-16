//module = angular.module("app", []);
AppModule.controller("cadastroUsuarioController", ["$scope", "$http", "$routeParams", function ($scope, $http, $routeParams) {

        //$scope.isNovo = true;
        
         $scope.submitForm = function () {

                // verifica se o formulÃ¡rio Ã© vÃ¡lido
                if ($scope.userForm.$valid) {
                    $scope.salvar = function salvar() {
                        $http.post("/usuario", $scope.login)
                            .success(function () {
                                alert("Sucesso!");
                              $scope.atualizar();
                                novo();
                            }).error(deuErro);

                            }
                        }
                    };

        $scope.salvar = function salvar() {
            $http.post("/usuario", $scope.username)
                   .success(function () {
                       alert("Sucesso!");
                     $scope.atualizar();
                       novo();
                   }).error(deuErro);

          

       }

       function deuErro() {
           alert("Lerigo!!!");
      };
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




    }]);






