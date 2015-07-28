AppModule.controller("controllerFormPerfilUsuario", controllerFormPerfilUsuario);

function controllerFormPerfilUsuario($scope, $http, $routeParams, $location, growl) {

    $scope.perfisDeAcesso = [];
    $scope.perfilSelecionado = {};
    $scope.perfisDeAcessoSelecionados = [];

    $scope.itensAcesso = [];
    $scope.itemSelecionado = {};
    $scope.itensAvulsos = [];

    var idUsuario;
    var usuario;

    $scope.init = function () {
        carregarPerfis();
        idUsuario = $routeParams.id;
    };

    function carregarPerfis() {
        $http.post("/perfilAcesso/listar", {}).success(success).error($scope.onError);

        function success(data) {
            $scope.perfisDeAcesso = data.itens;

            carregarItensAcesso();
        }
    }

    function carregarItensAcesso() {
        $http.get("/itemAcesso", {}).success(success).error($scope.onError);
        function success(data) {
            data.splice(0, 1);
            $scope.itensAcesso = data;

            carregarUsuario();
        }
    }

    function carregarUsuario() {
        $http.get("/usuario/" + idUsuario).success(success).error($scope.onError);
        function success(data) {
            usuario = data;
            if (!restaurarTela()) {
                usuario.perfisDeAcesso.forEach($scope.adicionarPerfil);
            }

//            function paraCadaPerfil(perfilAcesso) {
////                console.log(perfilAcesso);
//                $scope.adicionarPerfil(perfilAcesso);
//            }

        }
    }

    $scope.salvar = function () {
        var idsPerfisDeAcesso = getListaIdsPerfisSelecionados();

//        console.log(idsPerfisDeAcesso);

        $http.put("usuario/alterarPerfilUsuario", {idUsuario: usuario.id, perfisDeAcesso: idsPerfisDeAcesso}).success(onSccuss).error($scope.onError);

        function onSccuss() {
            growl.success("Perfil do Usuario " + $scope.usuarioLogado.nome + " salvo com sucesso");
            $location.path("/Usuario/list");
        }
    }

    // Perfil Acesso
    $scope.adicionarPerfil = function (perfilAcesso) {
        var posicao = buscarEmArray($scope.perfisDeAcesso, perfilAcesso.id, "id");
        $scope.perfisDeAcessoSelecionados.push(perfilAcesso);
        atualizarTipoItensAvulsos();
        $scope.perfisDeAcesso.splice(posicao, 1);
        $scope.perfilSelecionado = {};
    };

    $scope.removerPerfil = function (perfil) {
        var posicao = buscarEmArray($scope.perfisDeAcessoSelecionados, perfil.id, "id");
        $scope.perfisDeAcesso.push(perfil);

        $scope.perfisDeAcessoSelecionados.splice(posicao, 1);
        atualizarTipoItensAvulsos();

    };

    $scope.criarNovoPerfilAcesso = function () {
        salvarTelaParaSerRefataurada();
        $scope.setUseOldPath(true);
        $location.path("/PerfilAcesso/form");
    };

    function getListaIdsPerfisSelecionados() {
        var ids = [];

        $scope.perfisDeAcessoSelecionados.forEach(paraCadaPerfil);

        function paraCadaPerfil(perfil) {
            ids.push(perfil.id);
        }

        return ids;
    }

    // Atens Avulsos
    $scope.adicionarItemAvulso = function () {
        var posicao = buscarEmArray($scope.itensAcesso, $scope.itemSelecionado.id, "id");

        var novoItemAvulso = new ItemAvulso();
        novoItemAvulso.usuario = usuario;
        novoItemAvulso.itemAcesso = $scope.itemSelecionado;
        novoItemAvulso.defineTipoItemAvulso();
//        console.log(novoItemAvulso);

        $scope.itensAvulsos.push(novoItemAvulso);
//        console.log(JSON.stringify($scope.itensAvulsos));
        $scope.itensAcesso.splice(posicao, 1);
        $scope.itemSelecionado = {};
    };

    $scope.removerItemAvulso = function (perfil) {
        var posicao = buscarEmArray($scope.perfisDeAcessoSelecionados, perfil.id, "id");
        $scope.perfisDeAcesso.push(perfil);

        $scope.perfisDeAcessoSelecionados.splice(posicao, 1);
        atualizarTipoItensAvulsos();

    };

    function atualizarTipoItensAvulsos() {
        $scope.itensAvulsos.forEach(function (itemAvulso) {
            itemAvulso.defineTipoItemAvulso();
        });
    }

    //cadastrar outro
    function restaurarTela() {
        if (!$scope.pilhaTelas) {
            return false;
        }

        $scope.pilhaTelas.perfisDeAcessoSelecionados.forEach($scope.adicionarPerfil);
       
        $scope.pilhaTelas = undefined;

        return true;
    }

    function salvarTelaParaSerRefataurada() {
        var objeto = {};
        objeto.perfisDeAcessoSelecionados = $scope.perfisDeAcessoSelecionados;
        objeto.path = $location.path();
        $scope.setPilhaTelas(objeto);
    }


}
