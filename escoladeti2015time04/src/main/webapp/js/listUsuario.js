AppModule.controller("UsuarioList",["$scope","$routeParams", function ($scope, $routeParams){
         
            $scope.username = {};
            $scope.name = {};
            $scope.email = {};
            
            $scope.user = [
                { username : "Joao123", nome : "Joao da Silva", email : "joao@hotmail.com" },
                { username : "hhhh", nome : "Hhhh da hhh", email : "hhhh@hhh.com" },
                { username : "Maria12", nome : "Maria da Silva", email : "mariazinha@uol.com" }
            ];
            
            $scope.init = function(){
                $scope.limpar();
            };
            
            $scope.limpar = function(){
                $scope.nome = [];
            };
            
            $scope.remove = function(id) {
            alert("Remover o Id:" + id);
            
            };
           
        scope.edit = function(id){
            $location.path("/PerfilAcesso/edit/" + id);
        };
}]);