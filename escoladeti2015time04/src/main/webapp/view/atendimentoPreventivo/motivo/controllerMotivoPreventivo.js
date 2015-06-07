AppModule.controller("controllerFormMotivoAtendimentoPreventivo", controllerFormMotivoAtendimentoPreventivo);

AppModule.controller("controllerListMotivoAtendimentoPreventivo", controllerListMotivoAtendimentoPreventivo);

function controllerFormMotivoAtendimentoPreventivo($scope, $http, $routeParams, $location, $timeout, growl) {

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
            $http.put("/atendimento/preventivo/motivo", $scope.motivo).success(onSuccess).error(onError);
        } else {
            $http.post("/atendimento/preventivo/motivo", $scope.motivo).success(onSuccess).error(onError);
        }

        function onSuccess() {
            $timeout(success, 100);
            $location.path("/AtendimentoPreventivo/Motivo/list");
        }
        function success() {
            growl.success("<b>Motivo cadastrado com sucesso!</b>");
        }
    };

    $scope.editar = function (id) {
        $http.get("atendimento/preventivo/motivo/" + id).success(onSuccess).error(onError);

        function onSuccess(data) {
            $scope.motivo = data;
        }
    };

    function limparTela() {
        $scope.motivo = {};
        $scope.editando = false;
    }

    function onError(data) {
        growl.error(JSON.stringify(data));
    }

}

function controllerListMotivoAtendimentoPreventivo($scope, $http, growl) {

    $scope.paginaAtual = 1;
    $scope.numeroItensPorPagina = 5;
    $scope.colunaOrdenacao = "descricao";
    $scope.ordenacaoCrescente = true;

    $scope.init = function () {
        $scope.listar();
    };

    $scope.alterarStatus = function (motivo) {
        var status = motivo.status === 'ATIVO' ? 'INATIVO' : 'ATIVO';
        $http.put("/atendimento/preventivo/motivo/" + motivo.id + "/" + status).success(onSuccess).error(onError);

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


        $http.post("atendimento/preventivo/motivo/listar", requisicaoListagem).success(onSuccess).error(onError);
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
        growl.error(JSON.stringify(data));
    }
}