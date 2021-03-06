AppModule.controller("controllerFormUsuario", controllerFormularioFilho);

AppModule.controller("controllerListUsuario", controllerListagemFilho);

function controllerFormularioFilho($scope, $http, $routeParams, $location, growl, $timeout) {
    $scope.usuarioCommandEditarSenha = {};

    $scope.init = function () {
        limparTela();

        idUsuarioEditado = $routeParams.id;
        if (idUsuarioEditado) {
            $scope.editando = true;
            $scope.editar(idUsuarioEditado);
        }
    };

    $scope.salvar = function () {
        if ($scope.editando) {
            $http.put("/usuario", $scope.usuario).success(onSuccess).error($scope.onError);
        } else {
            $http.post("/usuario", $scope.usuario).success(onSuccess).error($scope.onError);
        }

        function onSuccess() {
            growl.success("Usuário Salvo com Sucesso");
            $location.path("/Usuario/list");
        }
    };

    $scope.editar = function (id) {
        $http.get("/usuario/" + id).success(onSuccess).error($scope.onError);

        function onSuccess(data) {
            $scope.usuario = data;
        }
    };

    $scope.iniciarAlteracaoSenha = function () {
        $scope.usuarioCommandEditarSenha = {};
    };

    $scope.alterarSenha = function () {
        $scope.usuarioCommandEditarSenha.id = $scope.usuario.id;

        $http.put("/usuario/alterarSenha", $scope.usuarioCommandEditarSenha).success(onSuccess).error($scope.onError);

        function onSuccess() {
            growl.success("Senha do usuario <b>" + $scope.usuario.nome + "</b> alterada com sucesso!")
        }
    };

    function limparTela() {
        $scope.usuario = {};
        $scope.editando = false;
    }

}

function controllerListagemFilho($scope, $http, growl) {

    $scope.paginaAtual = 1;
    $scope.numeroItensPorPagina = 5;
    $scope.usuarioAlterandoSenha = {};
    $scope.usuarioCommandEditarSenha = {};
    $scope.colunaOrdenacao = "nome";
    $scope.ordenacaoCrescente = true;

    $scope.init = function () {
        $scope.listar();
    };

    $scope.alterarStatus = function (usuario) {
        var status = usuario.status === 'ATIVO' ? 'INATIVO' : 'ATIVO';
        $http.put("/usuario/" + usuario.id + "/" + status).success(onSuccess).error($scope.onError);

        function onSuccess() {
            usuario.status = status;
        }
    };

    $scope.listar = function () {
        var requisicaoListagem = new RequisicaoListagem();
        requisicaoListagem.numeroItens = $scope.numeroItensPorPagina;
        requisicaoListagem.paginaAtual = $scope.paginaAtual;
        requisicaoListagem.colunaOrdenacao = $scope.colunaOrdenacao;
        requisicaoListagem.ordenacaoCrescente = $scope.ordenacaoCrescente;
        requisicaoListagem.valorFiltragem = $scope.pesquisa;

        $http.post("/usuario/listar", requisicaoListagem).success(onSuccess).error($scope.onError);
        function onSuccess(data) {
            $scope.usuarios = data.itens;
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

    $scope.setUsuarioAlterandoSenha = function (usuario) {
        $scope.usuarioAlterandoSenha = usuario;
        $scope.usuarioCommandEditarSenha = {};
    };

    $scope.alterarSenha = function () {
        $scope.usuarioCommandEditarSenha.id = $scope.usuarioAlterandoSenha.id;

        $http.put("/usuario/alterarSenha", $scope.usuarioCommandEditarSenha).success(onSuccess).error($scope.onError);

        function onSuccess() {
            growl.success("Senha do usuario <b>" + $scope.usuarioAlterandoSenha.nome + "</b> alterada com sucesso!")
        }
    };

}