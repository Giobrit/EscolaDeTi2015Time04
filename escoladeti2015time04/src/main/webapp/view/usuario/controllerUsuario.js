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
            $location.path("#/Usuario/list");
            //limparTela();
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
        $location.path("#");
        alert(JSON.stringify(data));
    }
}

function controllerListagemFilho($scope, $http) {
    paginaAtual = 1;

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
        rotaBack = "/usuario/numeroItens/" + 5 + "/paginaAtual/" + paginaAtual;

        if ($scope.pesquisa) {
            rotaBack += "/filtro/" + "nome" + "/valor/" + $scope.pesquisa;
        }

        $http.get(rotaBack).success(onSuccess).error(onError);
        function onSuccess(data) {
            data.numeroPaginas = 10;

            //paginar(data);
            $scope.usuarios = data;
        }
    };

    $scope.alterarPagina = function (pagina) {
        paginaAtual = pagina;
        alert(pagina);
        $scope.listar();
    };

    function paginar(data) {
        anterior = "<li><a href='#' aria-label='Previous'><span aria-hidden='true'>&laquo;</span></a></li>";
        proximo = "<li><a href='' aria-label='Next'><span aria-hidden='true'>&raquo;</span></a></li>";
        botoes = "";

        for (i = 1; i <= data.numeroPaginas; i++) {
            botoes += "<li><a>" + i + "</a></li>";
        }

        barraDePaginacao = document.getElementById("paginacao");

        barraDePaginacao.innerHTML = anterior + botoes + proximo;
    }

    $scope.pageChangeHandler = function (num) {
        console.log('meals page changed to ' + num);
    };

    function onError(data) {
        alert(JSON.stringify(data));
    }

}

