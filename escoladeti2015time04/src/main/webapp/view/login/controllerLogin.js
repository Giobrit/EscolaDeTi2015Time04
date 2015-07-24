AppModule.controller("controllerTelaLogin", controllerDoLogin);

function controllerDoLogin($scope, $http, $location, growl) {

    $scope.init = function () {
        limparTela();
    };

    $scope.logar = function () {
        $http.post("/usuario/logar", $scope.login).success(onSuccess).error($scope.onError);

        function onSuccess(data) {
            if (data) {
                alert("você logou");
                var now = new Date();
                $scope.usuarioLogado;
                $cookies.put('login', 'o cabra tah logado', {
                    expires: new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 1)
                });
//                window.location($location.host() + ":" + $location.port() + "/#/");
                $location.path("/");
            } else {
                growl.error("Login ou seha incorretos!");
            }
        }
    };

    function limparTela() {
        $scope.login = {};
    }
}
