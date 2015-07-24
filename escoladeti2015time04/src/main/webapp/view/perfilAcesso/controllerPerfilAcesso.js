AppModule.controller("controllerFormPerfilAcesso", controllerFormPerfilAcesso, '$interval');

AppModule.controller("controllerListPerfilAcesso", controllerListPerfilAcesso);

AppModule.controller("controllerFormPerfilUsuario", controllerFormPerfilUsuario);

function controllerFormPerfilAcesso($scope, $http, $location, $routeParams, growl) {

    $scope.itensAcesso = [];
    $scope.itemAcessoSelecionado = {};
    $scope.perfilDeAcesso = {
        nome: "",
        itensDeAcesso: []
    };

    var tudoSelecionado = false;

    $scope.init = function () {
        $scope.getItensAcesso();


        idEditando = $routeParams.id;
    };

    $scope.salvar = function () {
        $scope.perfilDeAcesso.itensDeAcesso = [];
        $scope.itensAcesso.forEach(paraCadaElemento);
        function paraCadaElemento(itemAcesso) {
            if (itemAcesso.check) {
                $scope.perfilDeAcesso.itensDeAcesso.push(itemAcesso.id);
            }
        }

//            console.log( $scope.perfilDeAcesso.itensDeAcesso);
            
        if ($scope.editando) {
            $http.put("/perfilAcesso", $scope.perfilDeAcesso).success(onSuccess).error($scope.onError);
        } else {
            $http.post("/perfilAcesso", $scope.perfilDeAcesso).success(onSuccess).error($scope.onError);
        }
        function onSuccess() {
            $location.path("/PerfilAcesso/list");
            growl.success("Perfil salvo com sucesso");
        }
    };

    $scope.editar = function (id) {
        $http.get("/perfilAcesso/" + id).success(onSuccess).error($scope.onError);

        function onSuccess(data) {
            $scope.perfilDeAcesso = data;
            $scope.perfilDeAcesso.itensDeAcesso.forEach(percorreIdsQueElePossui);
            
            function percorreIdsQueElePossui(idItem) {
                $scope.itensAcesso.forEach(percorreItensAcesso);
                function percorreItensAcesso(itemAcesso) {
                    if (itemAcesso.id === idItem) {
                        itemAcesso.check = true;
                    }
                }
            }
//            console.log(data.itensDeAcesso);
        }
    };

    $scope.getItensAcesso = function () {
        $http.get("/itemAcesso/").success(onSuccess).error($scope.onError);

        function onSuccess(data) {
            data.splice(0, 1);
//            callback(data);
            $scope.itensAcesso = data;
            if (idEditando) {
                $scope.editando = true;
                $scope.editar(idEditando);
            }
        }
    };

    $scope.selecionaPeloCombo = function (itemAcesso) {
//        console.log(itemAcesso);
//        console.log(!itemAcesso.check);
        var itemAcessoLocalizado = $scope.itensAcesso[buscarEmArray($scope.itensAcesso, itemAcesso.id, "id")];
        $scope.seleciona(itemAcessoLocalizado, !itemAcessoLocalizado.check, itemAcessoLocalizado.grupo);
    };

    $scope.seleciona = function (itemAcesso, check, grupoOriginal) {
        if (grupoOriginal || check || !itemAcesso.grupo) {
//            console.log(1);
            itemAcesso.check = check;
        }
        if (!check && itemAcesso.grupo && !possuiInferiorCheckado(itemAcesso.id)) {
//            console.log(2);
            itemAcesso.check = check;
        }

        if (grupoOriginal && itemAcesso.grupo) {
            selecionarBySuperior(itemAcesso.id, check);
        }

        if (itemAcesso.superior > 1) {
            var indexSuperior = buscarEmArray($scope.itensAcesso, itemAcesso.superior, "id");
            $scope.seleciona($scope.itensAcesso[indexSuperior], check, grupoOriginal);
        }

    };

    function possuiInferiorCheckado(idItemAcesso) {
        var possui = false;

        $scope.itensAcesso.forEach(paraCada);
        function paraCada(itemAcesso, index) {
            if (itemAcesso.superior === idItemAcesso && itemAcesso.check) {
                possui = true;
            }
        }

        return possui;
    }

    function selecionarBySuperior(superior, check) {
        $scope.itensAcesso.forEach(paraCada);
        function paraCada(itemAcesso) {
            if (itemAcesso.superior === superior) {
                itemAcesso.check = check;
            }
        }
    }

    $scope.checkTudo = function () {
        tudoSelecionado = !tudoSelecionado;
        $scope.itensAcesso.forEach(paraCada);
        function paraCada(itemAcesso) {
            itemAcesso.check = !tudoSelecionado;
        }
    }

}

function controllerListPerfilAcesso($scope, $http, $routeParams, $location) {

    $scope.init = function () {
        $scope.listar();
    };
    $scope.listar = function () {
        $http.post("/perfilDeAcesso/listar", requisicaoListagem).success(onSuccess).error($scope.$scope.onError);
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

//    $scope.perfis = [
//        {nomePerfil: 'Perfil de Acesso 1', id: 1},
//        {nomePerfil: 'Perfil de Acesso 2', id: 2},
//        {nomePerfil: 'Perfil de Acesso 3', id: 3},
//        {nomePerfil: 'Perfil de Acesso 4', id: 4}
//    ];
//    $scope.meuPerfil = $scope.perfis[0];
//
//    $scope.adicionarPerfil = function () {
//        $http.post("/perfilUsuario", $scope.perfilUsuario);
//
//    };
//
//    $scope.itens = [
//        {nomeItem: 'Item Avulso 1'},
//        {nomeItem: 'Item Avulso 2'}
//    ];
//    $scope.meuItem = $scope.itens[0];
//    $scope.nomeItens = [
//        {nome: 'Item Avulso 3'},
//        {nome: 'Item Avulso 4'}
//    ];

}
