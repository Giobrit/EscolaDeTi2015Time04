AppModule.controller("controllerFormPerfilUsuario", controllerFormPerfilUsuario);

function controllerFormPerfilUsuario($scope, $http, $routeParams, $location) {

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
        }
    }


    // Perfil Acesso
    $scope.adicionarPerfil = function () {
        var posicao = buscarEmArray($scope.perfisDeAcesso, $scope.perfilSelecionado.id, "id");
        $scope.perfisDeAcessoSelecionados.push($scope.perfilSelecionado);
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
        $scope.setUseOldPath(true);
        $location.path("/PerfilAcesso/form");
    };

    // Atens Avulsos
    $scope.adicionarItemAvulso = function () {
        var posicao = buscarEmArray($scope.itensAcesso, $scope.itemSelecionado.id, "id");

        var novoItemAvulso = new ItemAvulso();
//        novoItemAvulso.usuario = usuario;
        novoItemAvulso.itemAcesso = $scope.itemSelecionado;
        novoItemAvulso.defineTipoItemAvulso();
        console.log(novoItemAvulso);

        $scope.itensAvulsos.push(novoItemAvulso);
        console.log(JSON.stringify($scope.itensAvulsos));
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
        })
    }


}
