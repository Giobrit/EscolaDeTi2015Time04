AppModule.controller("controllerFormMotivoAtendimento", controllerFormMotivoAtendimento);

AppModule.controller("controllerListMotivoAtendimento", controllerListMotivoAtendimento);

function controllerFormMotivoAtendimento($scope, $http, $routeParams, $location, growl, $timeout) {

    $scope.init = function () {
        limparTela();

        var idMotivoEditado = $routeParams.id;
        if (idMotivoEditado) {
            $scope.editando = true;
            $scope.editar(idMotivoEditado);
        }
    };

    $scope.atendimentos =
            [
                {label: "Atendimento", atedimentoDoMotivo: "ATENDIMENTODEIXAROCURSO", checked: false},
                {label: "Atendimento Especial", atedimentoDoMotivo: "ATENDIMENTOESPECIAL", checked: false},
                {label: "Atendimento Preventivo", atedimentoDoMotivo: "ATENDIMENTOPREVENTIVO", checked: false}
            ];

    $scope.salvar = function () {
        setAtendimentosDoMotivo();
        if ($scope.editando) {
            $http.put("/atendimento/motivo", $scope.motivo).success(onSuccess).error(onError);
        } else {
            $http.post("/atendimento/motivo", $scope.motivo).success(onSuccess).error(onError);
        }


        function onSuccess() {
            $timeout(success, 100);
            $location.path("/AtendimentoMotivo/list");
        }
        function success() {
            growl.success("<b>Motivo cadastrado com sucesso!</b>");
        }
    };

    $scope.editar = function (id) {
        $http.get("/atendimento/motivo/" + id).success(onSuccess).error(onError);

        function onSuccess(data) {
            $scope.motivo = data;
            carregarAtendimentosDoMotivo();
        }
    };

    function limparTela() {
        $scope.motivo = {};
        $scope.editando = false;
    }

    function onError(data) {
        growl.error(JSON.stringify(data));
    }

    function setAtendimentosDoMotivo() {
        $scope.motivo.atendimentosDoMotivo = [];
        $scope.atendimentos.forEach(pegarAtendimentoDoMotivo);
        function pegarAtendimentoDoMotivo(atendimento) {
            if (atendimento.checked) {
                $scope.motivo.atendimentosDoMotivo.push(atendimento.atedimentoDoMotivo);
            }
        }
    }

    function carregarAtendimentosDoMotivo() {
        $scope.motivo.atendimentos.forEach(verificaSeExisteAtendimentoDoMotivo);
        function verificaSeExisteAtendimentoDoMotivo(atendimento) {
            $scope.motivo.atendimentosDoMotivo.forEach(existeAtendimentoDoMotivo);
            function existeAtendimentoDoMotivo(atendimentoDoMotivo) {
                console.log(atendimentoDoMotivo);
                if (atendimento === atendimentoDoMotivo) {
                    atendimento.checked = true;
                }
            }
        }
    }
}

function controllerListMotivoAtendimento($scope, $http, growl) {

    $scope.paginaAtual = 1;
    $scope.numeroItensPorPagina = 5;
    $scope.colunaOrdenacao = "descricao";
    $scope.ordenacaoCrescente = true;

    $scope.init = function () {
        $scope.listar();
    };

    $scope.alterarStatus = function (motivo) {

        var status = motivo.status === 'ATIVO' ? 'INATIVO' : 'ATIVO';
        $http.put("/atendimento/motivo/" + motivo.id + "/" + status).success(onSuccess).error(onError);

        function onSuccess() {
            motivo.status = status;
        }
    };

    $scope.listar = function () {
        var requisicaoListagem = new RequisicaoListagem();
        requisicaoListagem.numeroItens = $scope.numeroItensPorPagina;
        requisicaoListagem.paginaAtual = $scope.paginaAtual;
        requisicaoListagem.colunaOrdenacao = $scope.colunaOrdenacao;
        requisicaoListagem.ordenacaoCrescente = $scope.ordenacaoCrescente;
        requisicaoListagem.valorFiltragem = $scope.pesquisa;


        $http.post("/atendimento/motivo/listar", requisicaoListagem).success(onSuccess).error(onError);
        function onSuccess(data) {
            $scope.motivos = data.itens;
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
        growl.error(JSON.stringify(data));
    }
}