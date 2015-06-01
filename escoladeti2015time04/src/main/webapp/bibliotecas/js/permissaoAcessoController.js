AppModule.controller("PerfilAcessoFormController",["$scope","$routeParams", function ($scope, $routeParams){
        
            
            $scope.nome = {};
            $scope.codigo = 3;
            
            $scope.nomes = [
                { codigo : 1, nome : "Administrador" },
                { codigo : 2, nome : "Estagiário" }
            ];
            
            $scope.init = function(){
                $scope.limpar();
            };
            
            $scope.limpar = function(){
                $scope.nome = [];
            };
            
            $scope.salvar = function(){
                if (!$scope.nome.codigo) {
                $scope.nome.codigo = $scope.codigo;
                var nome = angular.copy($scope.nome);
                $scope.nomes.push(nome);                              
                $scope.codigo++;
                
                
            }

                $scope.limpar();
            };
            
             $scope.remove = function(id) {
            alert("Remover o Id:" + id);
        };
        
        $scope.edit = function(id){
            $location.path("/PerfilAcesso/edit/" + id);
        };
        
        $scope.permissoes = 
            [{ modulo : "Cliente",
              permissao : [
                  {nome:"Inserir", checked:true},
                  {nome:"Editar", checked:false},
                  {nome:"Excluir", checked:false},
                  {nome:"Listar", checked:false}
              ]
            },
            { modulo : "Produto",
              permissao : [
                  {nome:"Inserir", checked:false},
                  {nome:"Editar", checked:false},
                  {nome:"Excluir", checked:false},
                  {nome:"Listar", checked:false}
              ]
            },
            { modulo : "Financeiro",
              permissao : [
                  {nome:"Inserir", checked:false},
                  {nome:"Editar", checked:false},
                  {nome:"Excluir", checked:false},
                  {nome:"Listar", checked:false}
              ]
            }];
       
}]);


