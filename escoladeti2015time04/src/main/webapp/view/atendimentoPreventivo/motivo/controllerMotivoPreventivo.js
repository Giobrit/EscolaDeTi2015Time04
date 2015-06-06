AppModule.controller("controllerFormMotivoAtendimentoPreventivo", controllerFormMotivoAtendimentoPreventivo);

AppModule.controller("controllerListMotivoAtendimentoPreventivo", controllerListMotivoAtendimentoPreventivo);

function controllerFormMotivoAtendimentoPreventivo($scope, $http, $routeParams, $location) {

    $scope.init = function() {
        limparTela();

//        var idMotivoEditado = $routeParams.id;
//        if (idMotivoEditado) {
//            $scope.editando = true;
//            $scope.editar(idMotivoEditado);
//        }
    };


    $scope.salvar = function() {
        if ($scope.editando) {
            $http.put("/atendimento/preventivo/motivo", $scope.motivo).success(onSuccess).error(onError);
        } else {
            $http.post("/atendimento/preventivo/motivo", $scope.motivo).success(onSuccess).error(onError);
        }

        function onSuccess() {
            $location.path("/AtendimentoPreventivo/Motivo/list");
            alert("Motivo cadastrado com sucesso!");
        }
    };

    $scope.editar = function(id) {
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
        alert(JSON.stringify(data));
    }

}

function controllerListMotivoAtendimentoPreventivo($scope, $http) {

    $scope.paginaAtual = 1;
    $scope.totalPaginas = 1;
    $scope.colunaOrdenacao = "descricao";
    var ordenacaoCrescente = true;

    $scope.init = function() {
        $scope.listar();
    };

    $scope.alterarStatus = function(motivo) {
        var status = motivo.status === 'ATIVO' ? 'INATIVO' : 'ATIVO';
        $http.put("/atendimento/preventivo/motivo/" + motivo.id + "/" + status).success(onSuccess).error(onError);

        function onSuccess() {
            motivo.status = status;
        }
    };

    $scope.listar = function() {
        var requisicaoListagem = new RequisicaoListagem();
        requisicaoListagem.numeroItens = 8;
        requisicaoListagem.paginaAtual = $scope.paginaAtual;
        requisicaoListagem.colunaOrdenacao = $scope.colunaOrdenacao;
        requisicaoListagem.ordenacaoCrescente = ordenacaoCrescente;
        requisicaoListagem.valorFiltragem = $scope.pesquisa;


            $http.post("atendimento/preventivo/motivo/listar", requisicaoListagem).success(onSuccess).error(onError);
        function onSuccess(data) {
            $scope.motivos = data.itens;
            $scope.totalPaginas = data.numeroTotalPaginas;
        }
    };

    $scope.alterarOrdenacao = function(coluna) {
        if ($scope.colunaOrdenacao === coluna) {
            ordenacaoCrescente = !ordenacaoCrescente;
        }

        $scope.colunaOrdenacao = coluna;
        $scope.listar();
    };

    $scope.alterarPagina = function(pagina) {
        if (pagina < 1) {
            return;
        }

        if (pagina > $scope.totalPaginas) {
            return;
        }

        $scope.paginaAtual = pagina;
        $scope.listar();
    };

    function onError(data) {
        alert(JSON.stringify(data));
    }
}