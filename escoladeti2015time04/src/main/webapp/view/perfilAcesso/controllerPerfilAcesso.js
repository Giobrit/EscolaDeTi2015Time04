AppModule.controller("controllerFormPerfilAcesso", controllerFormPerfilAcesso);

AppModule.controller("controllerListPerfilAcesso", controllerListPerfilAcesso);

AppModule.controller("controllerFormPerfilUsuario", controllerFormPerfilUsuario);

function controllerFormPerfilAcesso($scope, $http, $routeParams, $location) {

    $scope.salvar = function () {
        if ($scope.editando) {
            $scope.put("/perfilDeAcesso", $scope.perfilDeAcesso).success(onSuccess).error();
        } else {
            $scope.post("/perfilDeAcesso", $scope.perfilDeAcesso).success(onSuccess).error();
        }
        function onSuccess() {
            $location.path("/PerfilAcesso/list");
            alert("Perfil cadastrado com sucesso");
        }
        $scope.editar = function (id) {
            $http.get("/perfilDeAcesso/" + id).success(onSuccess).error(onError);

            function onSuccess(data) {
                $scope.perfilDeAcesso = data;
            }
        };
    };


    $scope.getItensAcesso = function (callback) {
        $http.get("/itemAcesso/").success(onSuccess).error(onError);

        function onSuccess(data) {
            callback(data);
        }
    };

    $scope.selecionouItemAcesso = function (state) {
        console.log(state);

        $scope.data.push(state)
    };
//
//    $scope.itensAcesso = [
//        {"name": "Alabama", "id": "AL"},
//        {"name": "Alaska", "id": "AK"}
//    ];
    $scope.data = [];
    $scope.itemAcessoSelecionado = {};

    function onError() {

    }

}

function controllerListPerfilAcesso($scope, $http, $routeParams, $location) {

    $scope.init = function () {
        $scope.listar();
    };
    $scope.listar = function () {
        $http.post("/perfilDeAcesso/listar", requisicaoListagem).success(onSuccess).error(onError);
        function onSuccess(data) {
            $scope.perfilDeAcesso = data.itens;
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
}


function controllerFormPerfilUsuario($scope, $http, $routeParams, $location) {

    $scope.perfis = [
        {nomePerfil: 'Perfil de Acesso 1', id: 1},
        {nomePerfil: 'Perfil de Acesso 2', id: 2},
        {nomePerfil: 'Perfil de Acesso 3', id: 3},
        {nomePerfil: 'Perfil de Acesso 4', id: 4}
    ];
    $scope.meuPerfil = $scope.perfis[0];

    $scope.adicionarPerfil = function () {
        $http.post("/perfilUsuario", $scope.perfilUsuario);

    };

    $scope.itens = [
        {nomeItem: 'Item Avulso 1'},
        {nomeItem: 'Item Avulso 2'}
    ];
    $scope.meuItem = $scope.itens[0];
    $scope.nomeItens = [
        {nome: 'Item Avulso 3'},
        {nome: 'Item Avulso 4'}
    ];

}
