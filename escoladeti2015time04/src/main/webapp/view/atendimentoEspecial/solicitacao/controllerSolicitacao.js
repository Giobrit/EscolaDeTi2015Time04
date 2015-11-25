AppModule.controller("controllerFormSolicitacaoEspecial", controllerFormSolicitacaoEspecial);

AppModule.controller("controllerListSolicitacaoEspecial", controllerListSolicitacaoEspecial);

function controllerFormSolicitacaoEspecial($scope, $http, $routeParams, $location, growl, $timeout) {

    $scope.nextPath = $scope.useOldPath ? $scope.oldPath : "/AtendimentoEspecial/Solicitacao/list";
    $scope.setUseOldPath(false);

    $scope.init = function () {
        limparTela();

        idSolicitacaoEditado = $routeParams.id;
        if (idSolicitacaoEditado) {
            $scope.editando = true;
            $scope.editar(idSolicitacaoEditado);
        }
    };

    $scope.salvar = function () {
        if ($scope.editando) {
            $http.put("atendimento/especial/solicitacao", $scope.solicitacao).success(onSuccess).error($scope.onError);
        } else {
            $http.post("atendimento/especial/solicitacao", $scope.solicitacao).success(onSuccess).error($scope.onError);
        }

        function onSuccess() {
            $timeout(success, 100);
            $location.path($scope.nextPath);
        }
        function success() {
            growl.success("Solicitação salva com sucesso");
        }
    };

    $scope.editar = function (id) {
        $http.get("atendimento/especial/solicitacao/" + id).success(onSuccess).error($scope.onError);

        function onSuccess(data) {
            $scope.solicitacao = data;
        }
    };

    function limparTela() {
        $scope.solicitacao = {};
    }

}

function controllerListSolicitacaoEspecial($scope, $http, growl) {

    $scope.paginaAtual = 1;
    $scope.numeroItensPorPagina = 5;
    $scope.colunaOrdenacao = "descricao";
    $scope.ordenacaoCrescente = true;

    $scope.init = function () {
        $scope.listar();
    };

    $scope.alterarStatus = function (solicitacao) {
        var status = solicitacao.status === 'ATIVO' ? 'INATIVO' : 'ATIVO';
        $http.put("atendimento/especial/solicitacao/" + solicitacao.id + "/" + status).success(onSuccess).error($scope.onError);

        function onSuccess() {
            solicitacao.status = status;
        }
    };

    $scope.listar = function () {
        var requisicaoListagem = new RequisicaoListagem();
        requisicaoListagem.numeroItens = $scope.numeroItensPorPagina;
        requisicaoListagem.paginaAtual = $scope.paginaAtual;
        requisicaoListagem.colunaOrdenacao = $scope.colunaOrdenacao;
        requisicaoListagem.ordenacaoCrescente = $scope.ordenacaoCrescente;
        requisicaoListagem.valorFiltragem = $scope.pesquisa;

        $http.post("atendimento/especial/solicitacao/listar", requisicaoListagem).success(onSuccess).error($scope.onError);
        function onSuccess(data) {
            $scope.solicitacoes = data.itens;
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

}

