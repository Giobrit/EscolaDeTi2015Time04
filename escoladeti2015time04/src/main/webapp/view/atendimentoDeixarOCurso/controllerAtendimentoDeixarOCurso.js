AppModule.controller("controllerFormAtendimentoDeixarOCurso", controllerFormAtendimentoDeixarOCurso);

function controllerFormAtendimentoDeixarOCurso($scope, $http, $routeParams, $location, growl, $timeout) {

    $scope.init = function () {
        $scope.preencherListDeObjetivo();
        $scope.preencherListDeMotivo();
        $scope.limparTela();

        idEditando = $routeParams.id;

        if (idEditando) {
            $scope.editando = true;
            $scope.editar(idEditando);
        }
    };

    $scope.limparTela = function () {
        $scope.atendimentoDeixarOCurso = {};
        $scope.editando = false;
    };

    $scope.salvar = function () {
        montarCampoData();
        if ($scope.editando) {
            $http.put("/atendimento/deixarOCurso", $scope.atendimentoDeixarOCurso).success(onSuccess).error(onError);
        } else {
            $http.post("/atendimento/deixarOCurso", $scope.atendimentoDeixarOCurso).success(onSuccess).error(onError);
        }

        function onSuccess() {
            $timeout(success, 100);
            $location.path("/AtendimentoDeixarOCurso/list");
        }
    };

    function success() {
        growl.success("<b>Atendimento " + ($scope.editando === true ? "editado" : "salvo") + " com sucesso</b>");
    }

    $scope.editar = function (id) {
        $http.get("/atendimento/deixarOCurso/" + id).success(onSuccess).error(onError);

        function onSuccess(data) {

            $scope.atendimentoDeixarOCurso.id = data.id;
            $scope.atendimentoDeixarOCurso.protocolo = data.protocolo;
            $scope.atendimentoDeixarOCurso.ra = data.ra;
            $scope.atendimentoDeixarOCurso.nomeAluno = data.nomealuno;
            $scope.atendimentoDeixarOCurso.curso = data.curso;
            $scope.atendimentoDeixarOCurso.centro = data.centro;
            $scope.atendimentoDeixarOCurso.serieSemestre = data.seriesemestre;
            $scope.atendimentoDeixarOCurso.turno = data.turno;
            $scope.atendimentoDeixarOCurso.bolsaFinanciamento = data.bolsafinanciamento;
            $scope.atendimentoDeixarOCurso.numeroReprovacoes = data.numeroreprovacoes;
            $scope.atendimentoDeixarOCurso.descricaoPrivada = data.descricaoprivada;
            $scope.atendimentoDeixarOCurso.descricaoPublica = data.descricaopublica;
            $scope.atendimentoDeixarOCurso.transferencia = data.transferencia;
            $scope.atendimentoDeixarOCurso.coordenadorDiretor = data.coordenadordiretor;
            $scope.dataDeixarOCurso = timestampParaData(data.data);
            $scope.horaDeixarOCurso = new Date(data.data);
            $scope.matriculadoSelecionado = data.matriculado;
            $scope.setMatriculado(data.matriculado);

            selecionaObjetivoNaTela(data.objetivo);
            selecionaMotivoNaTela(data.motivo);
            $scope.setObjetivo($scope.objetivoSelecionado);
            $scope.setMotivo($scope.motivoSelecionado);
        }
    };

    function selecionaObjetivoNaTela(descricao) {
        $scope.objetivos.forEach(paraCada);
        function paraCada(objetivo) {
            if (objetivo.descricao === descricao) {
                $scope.objetivoSelecionado = objetivo;
            }
        }
    }

    function selecionaMotivoNaTela(descricao) {
        $scope.motivos.forEach(paraCada);
        function paraCada(motivo) {
            if (motivo.descricao === descricao) {
                $scope.motivoSelecionado = motivo;
            }
        }
    }

    $scope.preencherListDeObjetivo = function () {
        $http.get("/atendimento/deixarOCurso/objetivo/listarAtivos").success(onSuccess).error(onError);

        function onSuccess(data) {
            $scope.objetivos = data.itens;
        }
    };

    $scope.preencherListDeMotivo = function () {
        $http.get("/atendimento/deixarOCurso/motivo/listarAtivos").success(onSuccess).error(onError);

        function onSuccess(data) {
            $scope.motivos = data.itens;
        }
    };

    $scope.recuperarListaCoordenadores = function () {
        $http.get("/atendimento/deixarOCurso/coordenadoresCadastrados").success(onSuccess).error(onError);

        function onSuccess(data) {
            $scope.recuperarCoordenadores = data.itens;
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

    $scope.setObjetivo = function (data) {
        $scope.atendimentoDeixarOCurso.idObjetivo = data.id;
    };

    $scope.setMotivo = function (data) {
        $scope.atendimentoDeixarOCurso.idMotivo = data.id;
    };

    $scope.setMatriculado = function (data) {
        $scope.atendimentoDeixarOCurso.matriculado = data === "Sim" ? true : false;
    };

    function setAtributosAluno(aluno) {
        $scope.atendimentoDeixarOCurso.nomeAluno = aluno.nome;
        $scope.atendimentoDeixarOCurso.curso = aluno.curso;
        $scope.atendimentoDeixarOCurso.centro = aluno.centro;
        $scope.atendimentoDeixarOCurso.serieSemestre = aluno.serie;
        $scope.atendimentoDeixarOCurso.turno = aluno.turno;
        $scope.atendimentoDeixarOCurso.bolsaFinanciamento = aluno.bolsa;
        $scope.atendimentoDeixarOCurso.numeroReprovacoes = aluno.reprovacao;
        $scope.matriculadoSelecionado = aluno.matriculado;
        $scope.setMatriculado(aluno.matriculado);
    }

    $scope.setData = function () {
        return formatarData(new Date($scope.dataDeixarOCurso));
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
            $scope.atendimentoDeixarOCurso.data = $scope.setData() + "T" + $scope.setHora() + "-03";
        }
    }
    $scope.setData();
    function onError(data) {
        growl.error(JSON.stringify(data));
    }

}

AppModule.controller("controllerListAtendimentoDeixarOCurso", controllerListAtendimentoDeixarOCurso);
function controllerListAtendimentoDeixarOCurso($scope, $http, growl) {

    $scope.paginaAtual = 1;
    $scope.numeroItensPorPagina = 8;
    var colunaOrdenacao = "protocolo";
    $scope.labelOrdenacao = "Protocolo";
    var ordenacaoCrescente = true;

    $scope.colunas =
            [
                {label: "Protocolo", colunaOrdenacao: "protocolo", propriedadeItem: "protocolo", checked: false},
                {label: "Data", colunaOrdenacao: "data", propriedadeItem: "data", checked: true},
                {label: "Hora", colunaOrdenacao: "data", propriedadeItem: "hora", checked: true},
                {label: "RA", colunaOrdenacao: "ra", propriedadeItem: "ra", checked: false},
                {label: "Nome Aluno", colunaOrdenacao: "nomeAluno", propriedadeItem: "nomeAluno", checked: false},
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
