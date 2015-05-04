AppModule.controller("controllerFormUsuario", controllerFormularioFilho);

AppModule.controller("controllerListUsuario", controllerListagemFilho);

function controllerFormularioFilho($scope, $http, $routeParams) {
    $scope.init = function () {
        limparTela();

        idUsuarioEditado = $routeParams.id;
        if (idUsuarioEditado) {
            $scope.editando = true;
            $scope.editar(idUsuarioEditado);
        }
    };

    $scope.salvar = function () {
        $http.post("/usuario", $scope.usuario).success(onSuccess).error(onError);

        function onSuccess() {
            limparTela();
            alert("Usuario salvo com sucesso");
        }
    };

    $scope.editar = function (id) {
        $http.get("/usuario/" + id).success(onSuccess).error(onError);

        function onSuccess(data) {
            $scope.usuario = data;
        }
    };

    function limparTela() {
        $scope.usuario = {};
        $scope.editando = false;
    }

    function onError(data) {
        alert(JSON.stringify(data));
    }
}

function controllerListagemFilho($scope, $http) {

    $scope.init = function () {
        $scope.listar();
    };

    $scope.alterarStatus = function (usuario) {
        status = usuario.status === 'ATIVO' ? 'INATIVO' : 'ATIVO';
        $http.put("/usuario/" + usuario.id + "/" + status).success(onSuccess).error(onError);

        function onSuccess() {
            usuario.status = status;
        }
    };

    $scope.listar = function () {
        if ($scope.pesquisa) {
            rotaBack = "/usuario/numeroItens/" + 10 + "/paginaAtual/" + 1 + "/filtro/" + "nome" + "/valor/" + $scope.pesquisa;
        } else {
            rotaBack = "/usuario/";
        }
        
        $http.get(rotaBack).success(onSuccess).error(onError);
        function onSuccess(data) {
            $scope.usuarios = data;
        }
    };

    function onError(data) {
        alert(JSON.stringify(data));
    }
}

