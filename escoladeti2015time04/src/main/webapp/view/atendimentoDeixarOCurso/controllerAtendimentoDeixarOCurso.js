AppModule.controller("controllerListAtendimentoDeixarOCurso", controllerListAtendimentoDeixarOCurso);
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
        requisicaoListagem.colunasVisiveis = colunasVisiveis();
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

    $scope.colunaEVisivel = function (nome) {
        var EstacolunaEVisivel = false;

        $scope.colunas.forEach(paraCadaElemento);

        function paraCadaElemento(coluna) {
            if (coluna.nome === nome) {
                EstacolunaEVisivel = coluna.checked;
            }
        }

        return EstacolunaEVisivel;
    };

    $scope.colunas =
            [
                {nome: "protocolo", checked: true},
                {nome: "data", checked: true},
                {nome: "hora", checked: true},
                {nome: "aluno", checked: true},
                {nome: "curso", checked: true},
                {nome: "serie", checked: true},
                {nome: "turno", checked: true},
                {nome: "bolsa", checked: true},
                {nome: "reprovacoes", checked: false},
                {nome: "matriculado", checked: false},
                {nome: "instituicao", checked: false},
                {nome: "transferencia", checked: false},
                {nome: "coordenador", checked: true},
                {nome: "Objetivo", checked: true},
                {nome: "Motivo", checked: true},
                {nome: "descricaoprivada", checked: true},
                {nome: "descricaopublica", checked: true}
            ];

    $scope.alterarCheckbox = function (coluna) {
        coluna['checked'] = !coluna['checked'];
        $scope.listar();
    };

    function colunasVisiveis() {
        var colunasVisiveis = [];

        $scope.colunas.forEach(paraCadaElemento);

        function paraCadaElemento(coluna) {
            if (coluna.checked) {
                colunasVisiveis.push(coluna.nome);
            }
        }
        return colunasVisiveis;
    }
}
;