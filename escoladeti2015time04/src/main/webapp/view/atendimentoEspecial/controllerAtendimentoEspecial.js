AppModule.controller("controllerFormAtendimentoEspecial", controllerFormAtendimentoEspecial);

function controllerFormAtendimentoEspecial($scope, $http, $routeParams, $location, growl, $timeout) {

    $scope.init = function () {
        $scope.limparTela();

        idEditando = $routeParams.id;

        if (idEditando) {
            $scope.editando = true;
            $scope.editar(idEditando);
        }
    };

    $scope.limparTela = function () {
        $scope.atendimentoEspecial = {};
        $scope.editando = false;
    };

    $scope.salvar = function () {
        montarCampoData();
        if ($scope.editando) {
            $http.put("/atendimento/especial", $scope.atendimentoEspecial).success(onSuccess).error(onError);
        } else {
            $http.post("/atendimento/especial", $scope.atendimentoEspecial).success(onSuccess).error(onError);
        }

        function onSuccess() {
            $timeout(success, 100);
            $location.path("/AtendimentoEspecial/list");
        }
    };

    function success() {
        growl.success("<b>Atendimento " + ($scope.editando === true ? "editado" : "salvo") + " com sucesso</b>");
    }
    ;

    $scope.editar = function (id) {
        $http.get("/atendimento/especial/" + id).success(onSuccess).error(onError);

        function onSuccess(data) {

            $scope.atendimentoEspecial.id = data.id;
            $scope.atendimentoEspecial.protocolo = data.protocolo;
            $scope.atendimentoEspecial.ra = data.ra;
            $scope.atendimentoEspecial.nomeAluno = data.nomealuno;
            $scope.atendimentoEspecial.curso = data.curso;
            $scope.atendimentoEspecial.centro = data.centro;
            $scope.atendimentoEspecial.serieSemestre = data.seriesemestre;
            $scope.atendimentoEspecial.turno = data.turno;
            $scope.atendimentoEspecial.bolsaFinanciamento = data.bolsafinanciamento;
            $scope.atendimentoEspecial.laudoMedico = data.laudomedico;
            $scope.atendimentoEspecial.encaminhadoPara = data.encaminhadopara;
            $scope.atendimentoEspecial.descricaoResumida = data.descricaoresumida;
            $scope.atendimentoEspecial.descricaoDetalhada= data.descricaodetalhada;
            $scope.dataDeixarOCurso = timestampParaData(data.data);
            $scope.horaDeixarOCurso = new Date(data.data);
            $scope.matriculadoSelecionado = data.matriculado;
            $scope.setMatriculado(data.matriculado);

            selecionaMotivoNaTela(data.motivo);
            $scope.setMotivo($scope.motivoSelecionado);
        }
    };

    function selecionaMotivoNaTela(descricao) {
        $scope.motivos.forEach(paraCada);
        function paraCada(motivo) {
            if (motivo.descricao === descricao) {
                $scope.motivoSelecionado = motivo;
            }
        }
    }

    $scope.preencherListDeMotivo = function () {
        $http.get("/atendimento/especial/motivo/listarAtivos").success(onSuccess).error(onError);

        function onSuccess(data) {
            $scope.motivos = data.itens;
        }
    };

    $scope.carregarAluno = function (ra) {
        if (ra.length !== 8) {
            setAtributosAluno({});
            return;
        }

        $http.get("/lyceumClient/aluno/" + ra).success(onSuccess).error();

        function onSuccess(data) {
            setAtributosAluno(data);
        }
    };


    $scope.setMotivo = function (data) {
        $scope.atendimentoEspecial.idMotivo = data.id;
    };

    $scope.setMatriculado = function (data) {
        $scope.atendimentoEspecial.matriculado = data === "Sim" ? true : false;
    };

    function setAtributosAluno(aluno) {
        $scope.atendimentoEspecial.nomeAluno = aluno.nome;
        $scope.atendimentoEspecial.curso = aluno.curso;
        $scope.atendimentoEspecial.centro = aluno.centro;
        $scope.atendimentoEspecial.serieSemestre = aluno.serie;
        $scope.atendimentoEspecial.turno = aluno.turno;
        $scope.atendimentoEspecial.bolsaFinanciamento = aluno.bolsa;
        $scope.matriculadoSelecionado = aluno.matriculado;
        $scope.setMatriculado(aluno.matriculado);
    }

    $scope.setData = function () {
        return formatarData(new Date($scope.dataDeixarOCurso));
        ;
    };

    function formatarData(dataParaFormatacao) {
        return dataParaFormatacao.getFullYear() + "-" +
                ((dataParaFormatacao.getDate() < 10) ? "0" : "") + dataParaFormatacao.getDate() + "-" +
                (((dataParaFormatacao.getMonth() + 1) < 10) ? "0" : "") + (dataParaFormatacao.getMonth() + 1);
    }

    $scope.setHora = function () {
        return formatarHora(new Date($scope.horaDeixarOCurso));
    };

    function formatarHora(horaParaFormatacao) {
        return ((horaParaFormatacao.getHours() < 10) ? "0" : "") + horaParaFormatacao.getHours() + ":" +
                ((horaParaFormatacao.getMinutes() < 10) ? "0" : "") + horaParaFormatacao.getMinutes() + ":00";
    }

    function montarCampoData() {
        if ($scope.horaDeixarOCurso && $scope.dataDeixarOCurso) {
            $scope.atendimentoEspecial.data = $scope.setData() + "T" + $scope.setHora() + "-03";
        }
    }
    $scope.setData();
    function onError(data) {
        growl.error(JSON.stringify(data));
    }

}

AppModule.controller("controllerListAtendimentoEspecial", controllerListAtendimentoEspecial);
function controllerListAtendimentoEspecial($scope, $http, growl) {

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
                {label: "Matriculado", colunaOrdenacao: "matriculado", propriedadeItem: "matriculado", checked: true},
                {label: "Laudo Médico", colunaOrdenacao: "laudoMedico", propriedadeItem: "laudoMedico", checked: true},
                {label: "Solicitação", colunaOrdenacao: "solicitacao", propriedadeItem: "solicitacao", checked: true},
                {label: "Encaminhado Para", colunaOrdenacao: "encaminhadoPara", propriedadeItem: "encaminhadoPara", checked: true},
                {label: "Motivo", colunaOrdenacao: "motivo", propriedadeItem: "motivo", checked: true},
                {label: "Descrição Resumida", colunaOrdenacao: "descricaoResumida", propriedadeItem: "descricaoResumida", checked: true},
                {label: "Descrição Detalhada", colunaOrdenacao: "descricaoDetalhada", propriedadeItem: "descricaoDetalhada", checked: true}
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
        $http.post("atendimento/especial/listar", requisicaoListagem).success(onSuccess).error(onError);
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
