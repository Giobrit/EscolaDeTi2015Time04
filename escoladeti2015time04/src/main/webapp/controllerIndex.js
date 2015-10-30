AppModule.controller("controllerIndex", controllerIndex);
//var teste;
function controllerIndex($scope, $http, $cookies, $location, growl) {
    $scope.exibeMenu = false;
    $scope.usuarioLogado = {};

    $scope.permissoesUsuarioLogado = [];
    $scope.permissoesAvulsasUsuarioLogado = [];

    $scope.icones = [];

    $scope.pilhaTelas;

    $scope.useOldPath = false;
    $scope.newPath = "/Login";
    $scope.oldPath = "/Login";

    $scope.initSistema = function () {
        //inicializa a porra toda!
        $scope.icones["Usuário"] = "fa-user";
        $scope.icones["Perfil de Acesso"] = "fa-pencil-square-o";
        $scope.icones["Atendimento"] = "fa-comment-o";
        $scope.icones["Atendimento Preventivo"] = "fa-comment-o";
        $scope.icones["Atendimento Especial"] = "fa-comment-o";
        $scope.icones["Relatórios"] = "fa-pencil-square-o";
        $scope.icones["Matéria Ensino Médio"] = "fa fa-history";
        $scope.icones["Sistema"] = "fa-cogs";

        var idUsuario = $cookies.get('login');

        if (idUsuario) {
            $scope.exibeMenu = true;
            localizarUsuarioLogado(idUsuario);
        } else {
            $location.path("/Login")
            $scope.usuarioLogado = undefined;
        }

    };

    function localizarUsuarioLogado(idUsuario) {
        $http.get("usuario/" + idUsuario).success(onSuccess).error(onErrorAutenticacao);

        function onSuccess(usuario) {
            $scope.usuarioLogado = usuario;
            var now = new Date();
            $cookies.put('login', usuario.id, {
                expires: new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 30)
            });
//            teste = usuario;
            recuperarRotasPermissoesUsuarioLogado(usuario);
            recuperarPermissoesAvulsas(usuario);

        }

    }

    function recuperarPermissoesAvulsas(usuario) {
        $http.get("usuario/permissoes/avulsas/" + usuario.id).success(onSuccess).error(onErrorAutenticacao);

        function onSuccess(permissoes) {
            $scope.permissoesAvulsasUsuarioLogado = permissoes;
        }
    }

    function recuperarRotasPermissoesUsuarioLogado(usuario) {
        $http.get("usuario/permissoes/arvore/" + usuario.id).success(onSuccess).error(onErrorAutenticacao);

        function onSuccess(permissoes) {
            $scope.permissoesUsuarioLogado = permissoes;
        }
    }

    function onErrorAutenticacao(data) {
        $scope.usuarioLogado = undefined;
        $scope.permissoesUsuarioLogado = undefined;
        $cookies.remove('login');
        location.reload();
    }

    $scope.$on('$locationChangeSuccess', function () {
        $scope.oldPath = $scope.newPath;
        $scope.newPath = $location.path();
        if($scope.pilhaTelas && $scope.pilhaTelas.path !== $scope.newPath && $scope.pilhaTelas.path !== $scope.oldPath){
            $scope.pilhaTelas = undefined;
        }        
    });

    $scope.onError = function (data) {
        if (!data) {
            data = "Ocorreu um problema!";
        }
        errorPadrao(data, growl);
    };

    $scope.setUseOldPath = function (value) {
        $scope.useOldPath = value;
    }
    
    $scope.setPilhaTelas = function (value) {
        $scope.pilhaTelas = value;
    }
    


    //Permissoes Avulsas
    $scope.exibirDescricaoPrivada = function () {
        var posicao = buscarEmArray($scope.permissoesAvulsasUsuarioLogado, "Aceso às Descrições Privadas dos Atendimentos", "descricao");

        return posicao === -1 ? false : true;
    };
    
}