AppModule.controller("controllerListAtendimentoDeixarOCurso", controllerListAtendimentoDeixarOCurso);
function controllerListAtendimentoDeixarOCurso($scope, $http) {

    $scope.paginaAtual = 1;
    $scope.numeroItensPorPagina = 8;
    $scope.colunaOrdenacao = "nomeAluno";
    var ordenacaoCrescente = true;

    $scope.colunas =
            [
                {label: "Protocolo", nome: "protocolo", checked: false},
                {label: "Data", nome: "data", checked: false},
                {label: "Hora", nome: "hora", checked: false},
                {label: "RA", nome: "ra", checked: false},
                {label: "Nome Aluno", nome: "nomeAluno", checked: false},
                {label: "Curso", nome: "curso", checked: false},
                {label: "Série", nome: "serieSemestre", checked: false},
                {label: "Turno", nome: "turno", checked: false},
                {label: "Bolsa", nome: "bolsaFinanciamento", checked: false},
                {label: "Reprovações", nome: "numeroReprovacoes", checked: false},
                {label: "Matriculado", nome: "matriculado", checked: true},
                {label: "Transferência", nome: "transferencia", checked: true},
                {label: "Coordenador", nome: "coordenadorDiretor", checked: true},
                {label: "Objetivo", nome: "objetivo", checked: true},
                {label: "Motivo", nome: "motivo", checked: true},
                {label: "Descrição", nome: "descricaoPublica", checked: true}
            ];

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

    $scope.alterarCheckbox = function (coluna) {
        coluna.checked = !coluna.checked;
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
