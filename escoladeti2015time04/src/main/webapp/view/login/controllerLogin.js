AppModule.controller("controllerTelaLogin", controllerDoLogin);

function controllerDoLogin($scope, $http, $location, $cookies, growl) {

    $scope.init = function () {
        limparTela();
    };

    $scope.logar = function () {
        $http.post("/usuario/logar", $scope.login).success(onSuccess).error($scope.onError);

        function onSuccess(usuario) {
            if (usuario) {
                $scope.usuarioLogado = usuario;
                var now = new Date();
                $cookies.put('login', usuario.id, {
                    expires: new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 30)
                });
//                window.location($location.host() + ":" + $location.port() + "/#/");
                location.reload();
            }
        }
    };

    function limparTela() {
        $scope.login = {};
    }
}
