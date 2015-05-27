AppModule.controller("controllerFormObjetivoDeixarOCurso", controllerFormMotivoPreventivo);

AppModule.controller("controllerListObjetivoDeixarOCurso", controllerListMotivoPreventivo);

function controllerFormMotivoPreventivo($scope, $http, $routeParams, $location) {

    $scope.init = function () {
        limparTela();
        
        idMotivoPreventivo = $routeParams.id;
        if (idMotivoPreventivo) {
            $scope.editando = true;
            $scope.editar(idMotivoPreventivo);
        }
    };

    $scope.salvar = function () {        
        if ($scope.editando) {
            $http.put("atendimento/Preventivo", $scope.atendimentoPreventivo).success(onSuccess).error(onError);
        } else {
            $http.post("atendimento/Preventivo", $scope.atendimentoPreventivo).success(onSuccess).error(onError);
        }
        
        function onSuccess() {
            $location.path("AtendimentoPreventivo/list");
            alert("Salvo com sucesso");
        }
    };

    $scope.editar = function (id) {
        $http.get("atendimento/Preventivo/" + id).success(onSuccess).error(onError);

        function onSuccess(data) {
            $scope.atendimentoPreventivo = data;
        }
    };

    function limparTela() {
        $scope.atendimentoPreventivo = {};
    }

    function onError(data) {
        alert(JSON.stringify(data));
    }
}

function controllerListMotivoPreventivo($scope, $http) {

    $scope.paginaAtual = 1;
    $scope.totalPaginas = 1;
    $scope.colunaOrdenacao = "descricao";
    var ordenacaoCrescente = true;

    $scope.init = function () {        
        $scope.listar();
    };

    $scope.alterarStatus = function (objetivo) {
        var status = objetivo.status === 'ATIVO' ? 'INATIVO' : 'ATIVO';
        $http.put("atendimento/Preventivo/" + preventivo.id + "/" + status).success(onSuccess).error(onError);

        function onSuccess() {
            objetivo.status = status;
        }
    };

    $scope.listar = function () {
        var requisicaoListagem = new RequisicaoListagem();
        requisicaoListagem.numeroItens = 8;
        requisicaoListagem.paginaAtual = $scope.paginaAtual;
        requisicaoListagem.colunaOrdenacao = $scope.colunaOrdenacao;
        requisicaoListagem.ordenacaoCrescente = ordenacaoCrescente;
        requisicaoListagem.valorFiltragem = $scope.pesquisa;               
//        alert(JSON.stringify(requisicaoListagem));
        $http.post("atendimento/Preventivo/listar", requisicaoListagem).success(onSuccess).error(onError);
        function onSuccess(data) {
            $scope.objetivos = data.itens;
            $scope.totalPaginas = data.numeroTotalPaginas;
        }
    };

    $scope.alterarOrdenacao = function (coluna) {
        if ($scope.colunaOrdenacao === coluna) {
            ordenacaoCrescente = !ordenacaoCrescente;
        }
        
        $scope.colunaOrdenacao = coluna;
        $scope.listar();
    };
    
    $scope.alterarPagina = function (pagina) {
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

