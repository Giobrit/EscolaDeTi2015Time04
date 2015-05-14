AppModule.controller("controllerFormUsuario", controllerFormularioFilho);

AppModule.controller("controllerListUsuario", controllerListagemFilho);

function controllerFormularioFilho($scope, $http, $routeParams, $location) {

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
            $http.put("/usuario", $scope.usuario).success(onSuccess).error(onError);
        } else {
            $http.post("/usuario", $scope.usuario).success(onSuccess).error(onError);
        }

        function onSuccess() {
            $location.path("/Usuario/list");
            alert("Usuario salvo com sucesso");
        }
    };

    $scope.editar = function (id) {
        $http.get("/usuario/" + id).success(onSuccess).error(onError);

        function onSuccess(data) {
            $scope.usuario = data;
        }
    };

    $scope.iniciarAlteracaoSenha = function () {
        $scope.usuarioCommandEditarSenha = {};
    };

    $scope.alterarSenha = function () {
        $scope.usuarioCommandEditarSenha.id = $scope.usuario.id;

        $http.put("/usuario/alterarSenha", $scope.usuarioCommandEditarSenha).success(onSuccess).error(onError);

        function onSuccess() {
            alert("Senha do usuario [" + $scope.usuario.nome + "] alterada com sucesso!")
        }
    };

    function limparTela() {
        $scope.usuario = {};
        $scope.editando = false;
    }

    function onError(data) {
        alert(JSON.stringify(data));
    }
}

function controllerListagemFilho($scope, $http) {

    $scope.paginaAtual = 1;
    $scope.totalPaginas = 1;
    $scope.usuarioAlterandoSenha = {};
    $scope.usuarioCommandEditarSenha = {};
    $scope.colunaOrdenacao = "nome";

    $scope.init = function () {
        $scope.listar();
    };

    $scope.alterarStatus = function (usuario) {
        var status = usuario.status === 'ATIVO' ? 'INATIVO' : 'ATIVO';
        $http.put("/usuario/" + usuario.id + "/" + status).success(onSuccess).error(onError);

        function onSuccess() {
            usuario.status = status;
        }
    };

    $scope.listar = function () {
        var requisicaoListagem = new RequisicaoListagem();
        requisicaoListagem.numeroItens = 8;
        requisicaoListagem.paginaAtual = $scope.paginaAtual;
        requisicaoListagem.colunaOrdenacao = $scope.colunaOrdenacao;
        requisicaoListagem.valorFiltragem = $scope.pesquisa;
        
        $http.post("/usuario/listar", requisicaoListagem).success(onSuccess).error(onError);
        function onSuccess(data) {
            $scope.usuarios = data.itens;
            $scope.totalPaginas = data.numeroTotalPaginas;
        }
    };

    $scope.alterarOrdenacao = function (coluna) {
        $scope.colunaOrdenacao = coluna;
    };
    
    $scope.alterarPagina = function (pagina) {
        if (pagina < 1) {
            return;
        }

        if (pagina > $scope.totalPaginas) {
            return;
        }

        $scope.paginaAtual = pagina;
        $scope.listar();
    };

    $scope.setUsuarioAlterandoSenha = function (usuario) {
        $scope.usuarioAlterandoSenha = usuario;
        $scope.usuarioCommandEditarSenha = {};
    };

    $scope.alterarSenha = function () {
        $scope.usuarioCommandEditarSenha.id = $scope.usuarioAlterandoSenha.id;

        $http.put("/usuario/alterarSenha", $scope.usuarioCommandEditarSenha).success(onSuccess).error(onError);

        function onSuccess() {
            alert("Senha do usuario [" + $scope.usuarioAlterandoSenha.nome + "] alterada com sucesso!")
        }
    };

    function onError(data) {
        alert(JSON.stringify(data));
    }

}

