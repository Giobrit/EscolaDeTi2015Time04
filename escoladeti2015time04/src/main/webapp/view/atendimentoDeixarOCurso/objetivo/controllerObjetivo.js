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
    $scope.totalPaginas = 1;
    $scope.colunaOrdenacao = "descricao";
    var ordenacaoCrescente = true;

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
        requisicaoListagem.numeroItens = 8;
        requisicaoListagem.paginaAtual = $scope.paginaAtual;
        requisicaoListagem.colunaOrdenacao = $scope.colunaOrdenacao;
        requisicaoListagem.ordenacaoCrescente = ordenacaoCrescente;
        requisicaoListagem.valorFiltragem = $scope.pesquisa;               
//        alert(JSON.stringify(requisicaoListagem));
        $http.post("atendimento/deixarOCurso/objetivo/listar", requisicaoListagem).success(onSuccess).error(onError);
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

