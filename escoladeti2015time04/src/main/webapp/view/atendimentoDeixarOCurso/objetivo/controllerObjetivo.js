AppModule.controller("controllerFormObjetivoDeixarOCurso", controllerFormObjetivoDeixarOCurso);

AppModule.controller("controllerListObjetivoDeixarOCurso", controllerListObjetivoDeixarOCurso);

function controllerFormObjetivoDeixarOCurso($scope, $http, $routeParams, $location) {

    $scope.init = function () {
        limparTela();

        idObjetivoEditado = $routeParams.id;
        if (idObjetivoEditado) {
            $scope.editando = true;
            $scope.editar(idObjetivoEditado);
        }
    };

    $scope.salvar = function () {
        if ($scope.editando) {
            $http.put("atendimento/deixarOCurso/objetivo", $scope.objetivo).success(onSuccess).error(onError);
        } else {
            $http.post("atendimento/deixarOCurso/objetivo", $scope.objetivo).success(onSuccess).error(onError);
        }

        function onSuccess() {
            $location.path("AtendimentoDeixarOCurso/Objetivo/list");
            alert("Objetivo salvo com sucesso");
        }
    };

    $scope.editar = function (id) {
        $http.get("atendimento/deixarOCurso/objetivo/" + id).success(onSuccess).error(onError);

        function onSuccess(data) {
            $scope.objetivo = data;
        }
    };

    function limparTela() {
        $scope.objetivo = {};
    }

    function onError(data) {
        alert(JSON.stringify(data));
    }
}

function controllerListObjetivoDeixarOCurso($scope, $http) {

    $scope.paginaAtual = 1;
    $scope.numeroItensPorPagina = 5;
    $scope.colunaOrdenacao = "descricao";
    $scope.ordenacaoCrescente = true;

    $scope.init = function () {
        $scope.listar();
    };

    $scope.alterarStatus = function (objetivo) {
        var status = objetivo.status === 'ATIVO' ? 'INATIVO' : 'ATIVO';
        $http.put("atendimento/deixarOCurso/objetivo/" + objetivo.id + "/" + status).success(onSuccess).error(onError);

        function onSuccess() {
            objetivo.status = status;
        }
    };

    $scope.listar = function () {
        var requisicaoListagem = new RequisicaoListagem();
        requisicaoListagem.numeroItens = $scope.numeroItensPorPagina;
        requisicaoListagem.paginaAtual = $scope.paginaAtual;
        requisicaoListagem.colunaOrdenacao = $scope.colunaOrdenacao;
        requisicaoListagem.ordenacaoCrescente = $scope.ordenacaoCrescente;
        requisicaoListagem.valorFiltragem = $scope.pesquisa;

        $http.post("atendimento/deixarOCurso/objetivo/listar", requisicaoListagem).success(onSuccess).error(onError);
        function onSuccess(data) {
            $scope.objetivos = data.itens;
            $scope.totalRegistros = data.numeroTotalRegistros;
        }
    };

    $scope.alterarOrdenacao = function (coluna) {
        if ($scope.colunaOrdenacao === coluna) {
            $scope.ordenacaoCrescente = !$scope.ordenacaoCrescente;
        } else {
            $scope.ordenacaoCrescente = true;
        }

        $scope.colunaOrdenacao = coluna;
        $scope.listar();
    };

    $scope.alterarPagina = function () {
        $scope.listar();
    };

    function onError(data) {
        alert(JSON.stringify(data));
    }

}

