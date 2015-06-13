AppModule.controller("controllerListAtendimentoDeixarOCurso", controllerListAtendimentoDeixarOCurso);
function controllerListAtendimentoDeixarOCurso($scope, $http, growl) {

    $scope.paginaAtual = 1;
    $scope.numeroItensPorPagina = 8;
    colunaOrdenacao = "protocolo";
    $scope.labelOrdenacao = "Protocolo";
    var ordenacaoCrescente = true;

    $scope.colunas =
            [
                {label: "Protocolo", colunaOrdenacao: "protocolo", propriedadeItem: "protocolo", checked: false},
                {label: "Data", colunaOrdenacao: "data", propriedadeItem: "data", checked: true},
                {label: "Hora", colunaOrdenacao: "data", propriedadeItem: "hora", checked: true},
                {label: "RA", colunaOrdenacao: "ra", propriedadeItem: "ra", checked: false},
                {label: "Nome Aluno", colunaOrdenacao: "colunaOrdenacaoAluno", propriedadeItem: "colunaOrdenacaoAluno", checked: false},
                {label: "Curso", colunaOrdenacao: "curso", propriedadeItem: "curso", checked: false},
                {label: "Série", colunaOrdenacao: "serieSemestre", propriedadeItem: "serieSemestre", checked: false},
                {label: "Turno", colunaOrdenacao: "turno", propriedadeItem: "turno", checked: false},
                {label: "Bolsa", colunaOrdenacao: "bolsaFinanciamento", propriedadeItem: "bolsaFinanciamento", checked: false},
                {label: "Reprovações", colunaOrdenacao: "numeroReprovacoes", propriedadeItem: "numeroReprovacoes", checked: false},
                {label: "Matriculado", colunaOrdenacao: "matriculado", propriedadeItem: "matriculado", checked: true},
                {label: "Transferência", colunaOrdenacao: "transferencia", propriedadeItem: "transferencia", checked: true},
                {label: "Coordenador", colunaOrdenacao: "coordenadorDiretor", propriedadeItem: "coordenadorDiretor", checked: true},
                {label: "Objetivo", colunaOrdenacao: "objetivo", propriedadeItem: "objetivo", checked: true},
                {label: "Motivo", colunaOrdenacao: "motivo", propriedadeItem: "motivo", checked: true},
                {label: "Descrição", colunaOrdenacao: "descricaoPublica", propriedadeItem: "descricaoPublica", checked: true}
            ];

    $scope.init = function () {
        $scope.listar();
    };

    $scope.listar = function () {
        var requisicaoListagem = new RequisicaoListagem();
        requisicaoListagem.numeroItens = $scope.numeroItensPorPagina;
        requisicaoListagem.paginaAtual = $scope.paginaAtual;
        requisicaoListagem.colunaOrdenacao = colunaOrdenacao;
        requisicaoListagem.ordenacaoCrescente = $scope.ordenacaoCrescente;
        requisicaoListagem.valorFiltragem = $scope.pesquisa;
        requisicaoListagem.colunasVisiveis = colunasVisiveis();
        $http.post("atendimento/deixarOCurso/listar", requisicaoListagem).success(onSuccess).error(onError);
        function onSuccess(data) {
            setDataHora(data.itens);
            $scope.atendimentos = data.itens;
            $scope.totalRegistros = data.numeroTotalRegistros;
        }

        function setDataHora(itens) {
            itens.forEach(paraCada);

            function paraCada(item) {
                item.hora = timestampParaHora(item.data);

                item.data = timestampParaData(item.data);
            }
        }
    };
    $scope.alterarOrdenacao = function (coluna) {
        if (colunaOrdenacao === coluna.colunaOrdenacao) {
            $scope.ordenacaoCrescente = !$scope.ordenacaoCrescente;
        } else {
            $scope.ordenacaoCrescente = true;
        }

        colunaOrdenacao = coluna.colunaOrdenacao;
        $scope.labelOrdenacao = coluna.label;
        $scope.listar();
    };
    $scope.alterarPagina = function () {
        $scope.listar();
    };
    function onError(data) {
        growl.error(JSON.stringify(data));
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
                colunasVisiveis.push(coluna.propriedadeItem);
            }
        }

        return colunasVisiveis;
    }
}
