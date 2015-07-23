AppModule.controller("controllerIndex", controllerIndex);

function controllerIndex($scope, $http, growl) {
    $scope.initSistema = function () {
        //inicializa a porra toda!
        $scope.estaLogado = true;
    };

    $scope.estaLogado = false;
    
    function onError(data) {
        errorPadrao(data, growl);
    }

}