AppModule.controller("UsuarioList",["$scope","$routeParams", function ($scope, $routeParams){
         
            $scope.login = {};
            $scope.name = {};
            $scope.email = {};
            
            $scope.user = [
                { login : "Joao123", name : "Joao da Silva", email : "joao@hotmail.com" },
                { login : "hhhh", name : "Hhhh da hhh", email : "hhhh@hhh.com" },
                { login : "Maria12", name : "Maria da Silva", email : "mariazinha@uol.com" }
            ];
            
           $scope.init = function(){
               $scope.limpar();
            };
//            

//            
           $scope.remove = function(id) {
            alert("Remover o Id:" + id);           
            };

}]);