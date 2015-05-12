AppModule.controller("controllerFormUsuario", controllerFormularioFilho);

AppModule.controller("controllerListUsuario", controllerListagemFilho);

function controllerFormularioFilho($scope, $http, $routeParams, $location) {

    $scope.init = function () {
        limparTela();

        idUsuarioEditado = $routeParams.id;
        if (idUsuarioEditado) {
            $scope.editando = true;
            $scope.editar(idUsuarioEditado);
        }
    };

    $scope.salvar = function () {
        if ($scope.editando) {
            $http.put("/usuario", $scope.usuario).success(onSuccess).error(onError);
        } else {
            $http.post("/usuario", $scope.usuario).success(onSuccess).error(onError);
        }

        function onSuccess() {
            $location.path("/Usuario/list");
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
    $scope.paginaAtual = 1;

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
        rotaBack = "/usuario/numeroItens/" + 5 + "/paginaAtual/" + $scope.paginaAtual;

        if ($scope.pesquisa) {
            rotaBack += "/valorFiltro/" + $scope.pesquisa;
        }

        $http.get(rotaBack).success(onSuccess).error(onError);
        function onSuccess(data) {
            $scope.usuarios = data;
        }
    };

    $scope.alterarPagina = function (pagina) {
        if (pagina < 1) {
            return;
        }

        $scope.paginaAtual = pagina;
        $scope.listar();
    };

    $scope.pageChangeHandler = function (num) {
        console.log('meals page changed to ' + num);
    };

    function onError(data) {
        alert(JSON.stringify(data));
    }

}

