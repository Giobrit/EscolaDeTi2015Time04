AppModule.controller("controllerListObjetivoDeixarOCurso", controllerListAtendimentoDeixarOCurso);

function controllerListAtendimentoDeixarOCurso($scope, $http) {
    
    $scope.paginaAtual = 1;
    $scope.numeroItensPorPagina = 8;
    $scope.colunaOrdenacao = "nomeAluno";
    var ordenacaoCrescente = true;

    $scope.init = function () {
        $scope.listar();
    };

    
    $scope.listar = function () {
        var requisicaoListagem = new RequisicaoListagem();
        requisicaoListagem.numeroItens = $scope.numeroItensPorPagina;
        requisicaoListagem.paginaAtual = $scope.paginaAtual;
        requisicaoListagem.colunaOrdenacao = $scope.colunaOrdenacao;
        requisicaoListagem.ordenacaoCrescente = $scope.ordenacaoCrescente;
        requisicaoListagem.valorFiltragem = $scope.pesquisa;

        $http.post("atendimento/deixarOCurso/listar", requisicaoListagem).success(onSuccess).error(onError);
        function onSuccess(data) {
            $scope.atendimentos = data.itens;
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



