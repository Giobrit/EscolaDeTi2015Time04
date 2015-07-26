AppModule.controller("controllerFormPerfilUsuario", controllerFormPerfilUsuario);

function controllerFormPerfilUsuario($scope, $http, $routeParams, $location) {

    $scope.perfisDeAcesso = [];
    $scope.perfilSelecionado = {};
    $scope.perfisDeAcessoSelecionados = [];

    $scope.itensAcesso = [];
    $scope.itemSelecionado = {};
    $scope.itensAcessoSelecionados = [];

    $scope.init = function () {
        carregarPerfis();

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
            $scope.itensAcesso = data;
        }
    }

    $scope.adicionarPerfil = function () {
//        $scope.perfisDeAcesso.replace && newValue
        var posicao = buscarEmArray($scope.perfisDeAcesso, $scope.perfilSelecionado.id, "id");
        $scope.perfisDeAcessoSelecionados.push($scope.perfilSelecionado);
        atualizarTipoItensAcesso();
        $scope.perfisDeAcesso.splice(posicao, 1);
        $scope.perfilSelecionado = {};
    };

    $scope.removerPerfil = function (perfil) {
        var posicao = buscarEmArray($scope.perfisDeAcessoSelecionados, perfil.id, "id");
        $scope.perfisDeAcesso.push(perfil);

        $scope.perfisDeAcessoSelecionados.splice(posicao, 1);
        atualizarTipoItensAcesso();

    };

    function atualizarTipoItensAcesso() {
        // TODO: fazer sa bagaça
    }


//    $scope.meuItem = $scope.itens[0];
    $scope.nomeItens = [
        {nome: 'Item Avulso 3'},
        {nome: 'Item Avulso 4'}
    ];

}
