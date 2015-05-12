AppModule.controller("controllerLogin", controllerLogin);
aaa = 1;
function controllerLogin($scope, $http, $location) {

    $scope.init = function () {
        limparTela();
    };

    $scope.logar = function () {
        $http.post("/usuario/logar", $scope.login).success(onSuccess).error(onError);
        
        function onSuccess(data) {
            if (data) {
                alert("você logou");
                window.location($location.host() + ":" + $location.port() + "/#/");
                //$location.absUrl($location.host() + ":" + $location.port() + "/#/");
            } else {
                alert("Login ou sneha incorretos!");                
            }
        }
    }

    function limparTela() {
        $scope.login = {};
    }

    function onError(data) {
        alert(JSON.stringify(data));
    }
}
