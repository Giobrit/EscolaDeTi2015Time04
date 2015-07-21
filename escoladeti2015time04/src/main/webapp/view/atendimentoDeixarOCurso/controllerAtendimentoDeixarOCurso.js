AppModule.controller("controllerFormAtendimentoDeixarOCurso", controllerFormAtendimentoDeixarOCurso);

function controllerFormAtendimentoDeixarOCurso($scope, $http, $routeParams, $location, growl, $timeout) {

    $scope.init = function () {
        $scope.preencherListDeObjetivo();

        $scope.limparTela();

        idEditando = $routeParams.id;

    };

    $scope.limparTela = function () {
        $scope.atendimentoDeixarOCurso = {};
        $scope.editando = false;
    };

    $scope.salvar = function () {
        $scope.atendimentoDeixarOCurso.data = prepararDataParaSalvar($scope.dataDeixarOCurso, $scope.horaDeixarOCurso);
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
            $scope.atendimentoDeixarOCurso.matriculado = data.matriculado;
            $scope.dataDeixarOCurso = timestampParaData(data.data);
            $scope.horaDeixarOCurso = new Date(data.data);
            $scope.matriculadoSelecionado = booleanToString(data.matriculado);
//            $scope.setMatriculado(data.matriculado);

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
            $scope.preencherListDeMotivo();
        }

    };

    $scope.preencherListDeMotivo = function () {
        $http.get("/atendimento/motivo/listarAtivos/ATENDIMENTODEIXAROCURSO").success(onSuccess).error(onError);

        function onSuccess(data) {
            $scope.motivos = data.itens;
            if (idEditando) {
                $scope.editando = true;
                $scope.editar(idEditando);
            }
        }
    };

    $scope.getRecuperarCoordenadores = function () {
        return $http.get("/atendimento/deixarOCurso/coordenadoresCadastrados").then(onSuccess);

        function onSuccess(result) {
            console.log(JSON.stringify(result.data));
            return result.data;
        }
        ;
    };

    $scope.getRecuperarTransferencias = function () {
        return $http.get("/atendimento/deixarOCurso/transferenciasCadastradas").then(onSuccess);

        function onSuccess(result) {
            return result.data;
        }
        ;
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
        $scope.atendimentoDeixarOCurso.matriculado = stringToBoolean(data);
    };

    function setAtributosAluno(aluno) {
        $scope.atendimentoDeixarOCurso.nomeAluno = aluno.nome;
        $scope.atendimentoDeixarOCurso.curso = aluno.curso;
        $scope.atendimentoDeixarOCurso.centro = aluno.centro;
        $scope.atendimentoDeixarOCurso.serieSemestre = aluno.serie;
        $scope.atendimentoDeixarOCurso.turno = aluno.turno;
        $scope.atendimentoDeixarOCurso.bolsaFinanciamento = aluno.bolsa;
        $scope.atendimentoDeixarOCurso.numeroReprovacoes = aluno.reprovacao;
        $scope.atendimentoDeixarOCurso.matriculado = stringToBoolean(aluno.matriculado);
        $scope.matriculadoSelecionado = aluno.matriculado;
    }

    function onError(data) {
        growl.error(JSON.stringify(data));
    }

}

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
        console.log(JSON.stringify(data));
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
