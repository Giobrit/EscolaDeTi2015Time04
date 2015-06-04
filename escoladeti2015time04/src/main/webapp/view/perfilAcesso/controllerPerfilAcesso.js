AppModule.controller("controllerFormPerfilAcesso", controllerFormPerfilAcesso);

AppModule.controller("controllerListPerfilAcesso", controllerListPerfilAcesso);

AppModule.controller("controllerFormPerfilUsuario", controllerFormPerfilUsuario);

function controllerFormPerfilAcesso($scope, $http, $routeParams, $location) {
    

}


function controllerListPerfilAcesso($scope, $http, $routeParams, $location) {

}


function controllerFormPerfilUsuario($scope, $http, $routeParams, $location) {
    
    $scope.perfis = [
        {nomePerfil: 'Perfil de Acesso 1', id:1},  
        {nomePerfil: 'Perfil de Acesso 2', id:2},
        {nomePerfil: 'Perfil de Acesso 3', id:3},
        {nomePerfil: 'Perfil de Acesso 4', id:4}
    ];
    $scope.meuPerfil = $scope.perfis[0]; 
    
    $scope.adicionarPerfil = function(){
        $http.post("/perfilUsuario", $scope.perfilUsuario);
           
    };
    
 
//    $scope.nomePerfis = [
//       
//    ];
    
    $scope.itens =[
        {nomeItem: 'Item Avulso 1'},
        {nomeItem: 'Item Avulso 2'}
    ];
    $scope.meuItem = $scope.itens[0];
    $scope.nomeItens = [
        {nome: 'Item Avulso 3'},  
        {nome: 'Item Avulso 4'}  
    ];
    
}
