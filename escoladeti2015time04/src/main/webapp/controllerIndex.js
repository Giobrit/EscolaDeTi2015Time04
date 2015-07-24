AppModule.controller("controllerIndex", controllerIndex);
var teste;
function controllerIndex($scope, $http, $cookies, $location, growl) {
    $scope.usuarioLogado = {};
    $scope.usuarioLogado;
    
    $scope.icones = {
        
    };

    $scope.initSistema = function () {
        //inicializa a porra toda!
//
//        var now = new Date();
//        $cookies.put('login', 1, {
//            expires: new Date(now.getFullYear() + 11, now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 1)
//        });
//        
        var cookie = $cookies.get('login');

        if (cookie) {
            $http.get("usuario/" + cookie).success(onSuccess).error(onError);
        } else {
            $location.path("/Login")
            $scope.usuarioLogado = undefined;
        }

        function onSuccess(usuario) {
            $scope.usuarioLogado = usuario;
            var now = new Date();
            $cookies.put('login', usuario.id, {
                expires: new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 30)
            });
            teste = usuario;
        }

        function onError(oi) {
            $scope.usuarioLogado = undefined;
            console.log(oi);
            $cookies.remove('login');
        }
    };


    $scope.onError = function (data) {
        errorPadrao(data, growl);
    };

}