AppModule.controller("controllerIndex", controllerIndex);
var teste;
function controllerIndex($scope, $http, $cookies, growl) {
    $scope.usuarioLogado;

    $scope.initSistema = function () {
        //inicializa a porra toda!

//        var now = new Date();
//        $cookies.put('login', 'o cabra tah logado', {
//            expires: new Date(now.getFullYear()+11, now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 1)
//        });

        var cookie = $cookies.get('login');

        function onSucesso(usuario) {
            console.log(teste);
            $scope.usuarioLogado = "usuario";
            teste = usuario;
        }

        function erroAutenticacao(oi) {
            $scope.usuarioLogado = "usuario";
            console.log(oi);
            $cookies.remove('login');
        }

        if (cookie) {
            $http.get("usuario/" + '1').success(onSucesso).error(erroAutenticacao);

        }
    };


    $scope.onError = function (data) {
        errorPadrao(data, growl);
    };

}