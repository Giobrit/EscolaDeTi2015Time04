AppModule.controller("controllerFormMotivoAtendimentoDeixarOCurso", controllerFormMotivoAtendimentoDeixarOCurso);

AppModule.controller("controllerListMotivoAtendimentoDeixarOCurso", controllerListMotivoAtendimentoDeixarOCurso);

function controllerFormMotivoAtendimentoDeixarOCurso($scope, $http, $routeParams, $location) {

    $scope.init = function () {
        limparTela();

        var idMotivoEditado = $routeParams.id;
        if (idMotivoEditado) {
            $scope.editando = true;
            $scope.editar(idMotivoEditado);
        }
    };


    $scope.salvar = function () {
        if ($scope.editando) {
            $http.put("/atendimento/deixarOCurso/motivo", $scope.motivo).success(onSuccess).error(onError);
        } else {
            $http.post("/atendimento/deixarOCurso/motivo", $scope.motivo).success(onSuccess).error(onError);
        }

        function onSuccess() {
            $location.path("/AtendimentoDeixarOCurso/Motivo/list");
            alert("Motivo cadastrado com sucesso!");
        }
    };

    $scope.editar = function (id) {
        $http.get("/atendimento/deixarOCurso/motivo/" + id).success(onSuccess).error(onError);

        function onSuccess(data) {
            $scope.motivo = data;
        }
    };

    function limparTela() {
        $scope.motivo = {};
        $scope.editando = false;
    }

    function onError(data) {
        alert(JSON.stringify(data));
    }

}

function controllerListMotivoAtendimentoDeixarOCurso($scope, $http) {

    $scope.paginaAtual = 1;
    $scope.numeroItensPorPagina = 5;
    $scope.colunaOrdenacao = "descricao";
    $scope.ordenacaoCrescente = true;

    $scope.init = function () {
        $scope.listar();
    };

    $scope.alterarStatus = function (motivo) {
        var status = motivo.status === 'ATIVO' ? 'INATIVO' : 'ATIVO';
        $http.put("/atendimento/deixarOCurso/motivo/" + motivo.id + "/" + status).success(onSuccess).error(onError);

        function onSuccess() {
            motivo.status = status;
        }
    };

    $scope.listar = function () {
        var requisicaoListagem = new RequisicaoListagem();
        requisicaoListagem.numeroItens = $scope.numeroItensPorPagina;
        requisicaoListagem.paginaAtual = $scope.paginaAtual;
        requisicaoListagem.colunaOrdenacao = $scope.colunaOrdenacao;
        requisicaoListagem.ordenacaoCrescente = $scope.ordenacaoCrescente;
        requisicaoListagem.valorFiltragem = $scope.pesquisa;


        $http.post("/atendimento/deixarOCurso/motivo/listar", requisicaoListagem).success(onSuccess).error(onError);
        function onSuccess(data) {
            $scope.motivos = data.itens;
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