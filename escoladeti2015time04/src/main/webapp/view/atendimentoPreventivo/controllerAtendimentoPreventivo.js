AppModule.controller("controllerFormAtendimentoPreventivo", controllerFormAtendimentoPreventivo);

function controllerFormAtendimentoPreventivo($scope, $http, $routeParams, $location, growl, $timeout) {

    $scope.init = function () {
        preencherListDeMotivo();
        $scope.limparTela();

        idEditando = $routeParams.id;

        if (idEditando) {
            $scope.editando = true;
            $scope.editar(idEditando);
        }
    };

    $scope.limparTela = function () {
        $scope.atendimentoPreventivo = {};
        $scope.editando = false;
    };

    $scope.salvar = function () {
        montarCampoData();
        if ($scope.editando) {
            $http.put("/atendimento/preventivo", $scope.atendimentoPreventivo).success(onSuccess).error(onError);
        } else {
            $http.post("/atendimento/preventivo", $scope.atendimentoPreventivo).success(onSuccess).error(onError);
        }

        function onSuccess() {
            $timeout(success, 100);
            $location.path("/AtendimentoPreventivo/list");
        }
    };

    function success() {
        growl.success("<b>Atendimento Preventivo " + ($scope.editando === true ? "editado" : "salvo") + " com sucesso</b>");
    }
    ;

    $scope.editar = function (id) {
        $http.get("/atendimento/preventivo/" + id).success(onSuccess).error(onError);

        function onSuccess(data) {

            $scope.atendimentoPreventivo.id = data.id;
            $scope.atendimentoPreventivo.ra = data.ra;
            $scope.atendimentoPreventivo.nomeAluno = data.nomealuno;
            $scope.atendimentoPreventivo.curso = data.curso;
            $scope.atendimentoPreventivo.centro = data.centro;
            $scope.atendimentoPreventivo.serieSemestre = data.seriesemestre;
            $scope.atendimentoPreventivo.turno = data.turno;
            $scope.atendimentoPreventivo.bolsaFinanciamento = data.bolsafinanciamento;
            $scope.atendimentoPreventivo.numeroReprovacoes = data.numeroreprovacoes;
            $scope.atendimentoPreventivo.descricaoPrivada = data.descricaoprivada;
            $scope.atendimentoPreventivo.descricaoPublica = data.descricaopublica;
            $scope.atendimentoPreventivo.meioContato = data.meiocontato;
            $scope.atendimentoPreventivo.encaminhamento = data.encaminhamento;
            $scope.dataPreventivo = timestampParaData(data.data);
            $scope.horaPreventivo = new Date(data.data);
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

    function preencherListDeMotivo() {
        $http.post("/atendimento/preventivo/motivo/listar", {}).success(onSuccess).error(onError);

        function onSuccess(data) {
            $scope.motivos = data.itens;
        }
    }

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
        $scope.atendimentoPreventivo.idMotivo = data.id;
    };

    $scope.setMatriculado = function (data) {
        $scope.atendimentoPreventivo.matriculado = data === "Sim" ? true : false;
    };

    function setAtributosAluno(aluno) {
        $scope.atendimentoPreventivo.nomeAluno = aluno.nome;
        $scope.atendimentoPreventivo.curso = aluno.curso;
        $scope.atendimentoPreventivo.centro = aluno.centro;
        $scope.atendimentoPreventivo.serieSemestre = aluno.serieSemestre;
        $scope.atendimentoPreventivo.turno = aluno.turno;
        $scope.atendimentoPreventivo.bolsaFinanciamento = aluno.bolsa;
        $scope.atendimentoPreventivo.numeroReprovacoes = aluno.reprovacao;
        $scope.matriculadoSelecionado = aluno.matriculado;
        $scope.setMatriculado(aluno.matriculado);
    }

    $scope.setData = function () {
        return formatarData(new Date($scope.dataPreventivo));
    };

    function formatarData(dataParaFormatacao) {
        return dataParaFormatacao.getFullYear() + "-" +
                ((dataParaFormatacao.getDate() < 10) ? "0" : "") + dataParaFormatacao.getDate() + "-" +
                (((dataParaFormatacao.getMonth() + 1) < 10) ? "0" : "") + (dataParaFormatacao.getMonth() + 1);
    }

    $scope.setHora = function () {
        return formatarHora(new Date($scope.horaPreventivo));
    };

    function formatarHora(horaParaFormatacao) {
        return ((horaParaFormatacao.getHours() < 10) ? "0" : "") + horaParaFormatacao.getHours() + ":" +
                ((horaParaFormatacao.getMinutes() < 10) ? "0" : "") + horaParaFormatacao.getMinutes() + ":00";
    }

    function montarCampoData() {
        if ($scope.horaPreventivo && $scope.dataPreventivo) {
            $scope.atendimentoPreventivo.data = $scope.setData() + "T" + $scope.setHora() + "-03";
        }
    }

    $scope.setData();


    function onError(data) {
        console.log(JSON.stringify(data));
        growl.error(JSON.stringify(data));
    }
}

AppModule.controller("controllerListAtendimentoPreventivo", controllerListAtendimentoPreventivo);

function controllerListAtendimentoPreventivo($scope, $http, growl) {

    $scope.paginaAtual = 1;
    $scope.numeroItensPorPagina = 8;
    var colunaOrdenacao = "data";
    $scope.labelOrdenacao = "Data";
    var ordenacaoCrescente = true;

    $scope.colunas =
            [
                {label: "Data", colunaOrdenacao: "data", propriedadeItem: "data", checked: true},
                {label: "Hora", colunaOrdenacao: "data", propriedadeItem: "hora", checked: true},
                {label: "RA", colunaOrdenacao: "ra", propriedadeItem: "ra", checked: false},
                {label: "Nome Aluno", colunaOrdenacao: "nomeAluno", propriedadeItem: "nomeAluno", checked: true},
                {label: "Curso", colunaOrdenacao: "curso", propriedadeItem: "curso", checked: false},
                {label: "Centro", colunaOrdenacao: "centro", propriedadeItem: "centro", checked: false},
                {label: "Série", colunaOrdenacao: "serieSemestre", propriedadeItem: "serieSemestre", checked: false},
                {label: "Turno", colunaOrdenacao: "turno", propriedadeItem: "turno", checked: false},
                {label: "Bolsa", colunaOrdenacao: "bolsaFinanciamento", propriedadeItem: "bolsaFinanciamento", checked: false},
                {label: "Reprovações", colunaOrdenacao: "numeroReprovacoes", propriedadeItem: "numeroReprovacoes", checked: false},
                {label: "Matriculado", colunaOrdenacao: "matriculado", propriedadeItem: "matriculado", checked: true},
                {label: "Encaminhamento", colunaOrdenacao: "encaminhamento", propriedadeItem: "encaminhamento", checked: true},
                {label: "Meio de contato", colunaOrdenacao: "meioContato", propriedadeItem: "meioContato", checked: false},
                {label: "Motivo", colunaOrdenacao: "motivo", propriedadeItem: "motivo", checked: true},
                {label: "Descrição", colunaOrdenacao: "descricaoPublica", propriedadeItem: "descricaoPublica", checked: true}
            ]

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
        $http.post("atendimento/preventivo/listar", requisicaoListagem).success(onSuccess).error(onError);
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
    
    function onError(data) {
        console.log(JSON.stringify(data));
        growl.error(JSON.stringify(data));
    }
}
