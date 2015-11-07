AppModule.controller("controllerFormAtendimentoEspecial", controllerFormAtendimentoEspecial);

function controllerFormAtendimentoEspecial($scope, $http, $routeParams, $location, growl, $timeout) {
    $scope.atendimentoEspecial = {
        ra: ""
    };
    $scope.example13model = [];

    $scope.init = function () {

        $scope.limparTela();

        idEditando = $routeParams.id;
        $scope.preencherListDeMotivo();

    };

    $scope.limparTela = function () {
        $scope.atendimentoEspecial = {};
        $scope.editando = false;
    };

    $scope.salvar = function () {
        $scope.atendimentoEspecial.usuario = $scope.usuarioLogado.id;
        $scope.atendimentoEspecial.data = prepararDataParaSalvar($scope.dataEspecial, $scope.horaEspecial);

        if ($scope.editando) {
            $http.put("/atendimento/especial", $scope.atendimentoEspecial).success(onSuccess).error($scope.onError);
        } else {
            $http.post("/atendimento/especial", $scope.atendimentoEspecial).success(onSuccess).error($scope.onError);
        }

        function onSuccess() {
            $timeout(success, 100);
            $location.path("/AtendimentoEspecial/list");
        }
    };

    function success() {
        growl.success("<b>Atendimento " + ($scope.editando === true ? "editado" : "salvo") + " com sucesso</b>");
    }


    $scope.editar = function (id) {
        $http.get("/atendimento/especial/" + id).success(onSuccess).error($scope.onError);

        function onSuccess(data) {

            $scope.atendimentoEspecial.id = data.id;
            $scope.atendimentoEspecial.protocolo = data.protocolo;
            $scope.atendimentoEspecial.ra = data.ra;
            $scope.atendimentoEspecial.nomeAluno = data.nomealuno;
            $scope.atendimentoEspecial.curso = data.curso;
            $scope.atendimentoEspecial.centro = data.centro;
            $scope.atendimentoEspecial.serieSemestre = "" + data.seriesemestre;
            
            $scope.atendimentoEspecial.turno = data.turno;
            $scope.atendimentoEspecial.bolsaFinanciamento = data.bolsafinanciamento;
            $scope.atendimentoEspecial.laudoMedico = data.laudomedico;
            $scope.atendimentoEspecial.encaminhadoPara = data.encaminhadopara;
            $scope.atendimentoEspecial.descricaoPublica = data.descricaopublica;
            $scope.atendimentoEspecial.descricaoPrivada = data.descricaoprivada;
            $scope.atendimentoEspecial.solicitacao = data.solicitacao;
            $scope.dataEspecial = timestampParaData(data.data);
            $scope.horaEspecial = new Date(data.data);
            $scope.atendimentoEspecial.matriculado = data.matriculado;
            $scope.matriculadoSelecionado = booleanToString(data.matriculado);
            $scope.laudoMedicoSelecionado = booleanToString(data.laudomedico);
            //  $scope.setMatriculado(data.matriculado);

            selecionaMotivoNaTela(data.motivo);
            $scope.setMotivo($scope.motivoSelecionado);

            restaurarTela();
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
        $http.get("atendimento/motivo/listarAtivos/ATENDIMENTOESPECIAL").success(onSuccess).error($scope.onError);

        function onSuccess(data) {
            $scope.motivos = data.itens;
            if (idEditando) {
                $scope.editando = true;
                $scope.editar(idEditando);
            } else {
                restaurarTela();
            }
        }
    };

    $scope.getCamposInseridos = function (campo, valor) {
        if (valor.length < 3) {
            return;
        }

        return $http.get("/atendimento/especial/typeAHead/" + campo + "/" + valor).then(onSuccess);

        function onSuccess(result) {
            return result.data;
        }
    };

    $scope.carregarAluno = function (ra) {
        if (ra.length !== 8) {
            setAtributosAluno({});
            return;
        }

        $http.get("/lyceumClient/aluno/" + ra).success(onSuccess).error($scope.onError);

        function onSuccess(data) {
            setAtributosAluno(data);
        }
    };


    $scope.setMotivo = function (data) {
        $scope.atendimentoEspecial.idMotivo = data.id;
    };

    $scope.setMatriculado = function (data) {
        $scope.atendimentoEspecial.matriculado = stringToBoolean(data);
    };

    $scope.setLaudoMedico = function (data) {
        $scope.atendimentoEspecial.laudoMedico = stringToBoolean(data);
    }

    function setAtributosAluno(aluno) {
        $scope.atendimentoEspecial.nomeAluno = aluno.nome;
        $scope.atendimentoEspecial.curso = aluno.curso;
        $scope.atendimentoEspecial.centro = aluno.centro;
        $scope.atendimentoEspecial.serieSemestre = aluno.serie;
//        console.log($scope.atendimentoEspecial.serieSemestre);
        $scope.atendimentoEspecial.turno = aluno.turno;
        $scope.atendimentoEspecial.bolsaFinanciamento = aluno.bolsa;
        $scope.atendimentoEspecial.matriculado = stringToBoolean(aluno.matriculado);
        $scope.matriculadoSelecionado = aluno.matriculado;
    }

    $scope.example13data = [
        {id: 1, label: "Ledor"},
        {id: 2, label: "Escriba"},
        {id: 3, label: "Ampliação dos textos entregues (e da avaliação)"},
        {id: 4, label: "Intérprete de Libras"},
        {id: 5, label: "Sintetizador de voz"},
        {id: 6, label: "Reglete"},
        {id: 7, label: "Sorobã"},
        {id: 8, label: "Livro didático adaptado"},
        {id: 9, label: "Livro falado"},
        {id: 10, label: "Tecnologias Assistivas"},
        {id: 11, label: "Prazo estendido para elaboração de prova"},
        {id: 12, label: "Outro(s)"},
    ];

    $scope.example13settings = {
        smartButtonMaxItems: 5,
        smartButtonTextConverter: function (itemText, originalItem) {
            if (itemText.length >= 10) {
                return itemText.substring(0,8) + "...";
            }

            return itemText;
        }

    };

    function restaurarTela() {
        if (!$scope.pilhaTelas) {
            return;
        }

        $scope.atendimentoEspecial = $scope.pilhaTelas.atendimentoEspecial;
        $scope.dataEspecial = $scope.pilhaTelas.dataEspecial;
        $scope.horaEspecial = $scope.pilhaTelas.horaEspecial;
        if ($scope.pilhaTelas.motivoSelecionado) {
            selecionaMotivoNaTela($scope.pilhaTelas.motivoSelecionado.descricao);
        }
        if (typeof $scope.pilhaTelas.atendimentoEspecial.matriculado !== "undefined") {
            $scope.matriculadoSelecionado = booleanToString($scope.pilhaTelas.atendimentoEspecial.matriculado);
        }
        if (typeof $scope.pilhaTelas.atendimentoEspecial.laudoMedico !== "undefined") {
            $scope.laudoMedicoSelecionado = booleanToString($scope.pilhaTelas.atendimentoEspecial.laudoMedico);
        }


        $scope.pilhaTelas = undefined;
    }

    $scope.cadastrarOutraTela = function (path) {
        salvarTelaParaSerRefataurada();
        $location.path(path);
        $scope.setUseOldPath(true);
    };

    function salvarTelaParaSerRefataurada() {
        var objeto = {};
        objeto.atendimentoEspecial = $scope.atendimentoEspecial;
        objeto.motivoSelecionado = $scope.motivoSelecionado;
        objeto.dataEspecial = $scope.dataEspecial;
        objeto.horaEspecial = $scope.horaEspecial;
        objeto.path = $location.path();
        $scope.setPilhaTelas(objeto);
    }

}

AppModule.controller("controllerListAtendimentoEspecial", controllerListAtendimentoEspecial);
function controllerListAtendimentoEspecial($scope, $http, growl) {

    $scope.paginaAtual = 1;
    $scope.numeroItensPorPagina = 5;
    var colunaOrdenacao = "protocolo";
    $scope.labelOrdenacao = "Protocolo";
    var ordenacaoCrescente = true;

    $scope.colunas =
            [
                {label: "Protocolo", colunaOrdenacao: "protocolo", propriedadeItem: "protocolo", checked: true},
                {label: "Data", colunaOrdenacao: "data", propriedadeItem: "data", checked: true},
                {label: "Hora", colunaOrdenacao: "data", propriedadeItem: "hora", checked: true},
                {label: "RA", colunaOrdenacao: "ra", propriedadeItem: "ra", checked: false},
                {label: "Nome Aluno", colunaOrdenacao: "nomeAluno", propriedadeItem: "nomeAluno", checked: true},
                {label: "Curso", colunaOrdenacao: "curso", propriedadeItem: "curso", checked: false},
                {label: "Centro", colunaOrdenacao: "centro", propriedadeItem: "centro", checked: false},
                {label: "Série", colunaOrdenacao: "serieSemestre", propriedadeItem: "serieSemestre", checked: false},
                {label: "Turno", colunaOrdenacao: "turno", propriedadeItem: "turno", checked: false},
                {label: "Bolsa", colunaOrdenacao: "bolsaFinanciamento", propriedadeItem: "bolsaFinanciamento", checked: false},
                {label: "Matriculado", colunaOrdenacao: "matriculado", propriedadeItem: "matriculado", checked: false},
                {label: "Laudo Médico", colunaOrdenacao: "laudoMedico", propriedadeItem: "laudoMedico", checked: true},
                {label: "Solicitação", colunaOrdenacao: "solicitacao", propriedadeItem: "solicitacao", checked: false},
                {label: "Encaminhado Para", colunaOrdenacao: "encaminhadoPara", propriedadeItem: "encaminhadoPara", checked: true},
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
        $http.post("atendimento/especial/listar", requisicaoListagem).success(onSuccess).error($scope.onError);
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

}
