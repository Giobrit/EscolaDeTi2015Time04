AppModule.controller("controllerFormPerfilAcesso", controllerFormPerfilAcesso, '$interval');

AppModule.controller("controllerListPerfilAcesso", controllerListPerfilAcesso);

function controllerFormPerfilAcesso($scope, $http, $location, $routeParams, growl) {

    $scope.itensAcesso = [];
    $scope.itemAcessoSelecionado = {};
    
    
    $scope.nextPath = $scope.useOldPath  ? $scope.oldPath : "/PerfilAcesso/list";
    $scope.setUseOldPath(false);
    
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


        if ($scope.editando) {
            $http.put("/perfilAcesso", $scope.perfilDeAcesso).success(onSuccess).error($scope.onError);
        } else {
            $http.post("/perfilAcesso", $scope.perfilDeAcesso).success(onSuccess).error($scope.onError);
        }
        function onSuccess() {
            $location.path($scope.nextPath);
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
        var itemAcessoLocalizado = $scope.itensAcesso[buscarEmArray($scope.itensAcesso, itemAcesso.id, "id")];
        $scope.seleciona(itemAcessoLocalizado, !itemAcessoLocalizado.check, itemAcessoLocalizado.grupo);
    };

    $scope.seleciona = function (itemAcesso, check, grupoOriginal) {
        if (grupoOriginal || check || !itemAcesso.grupo) {
            itemAcesso.check = check;
        }
        if (!check && itemAcesso.grupo && !possuiInferiorCheckado(itemAcesso.id)) {
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
    };

}

function controllerListPerfilAcesso($scope, $http, $location, $routeParams, growl) {

    $scope.paginaAtual = 1;
    $scope.numeroItensPorPagina = 5;
    $scope.colunaOrdenacao = "nome";
    $scope.ordenacaoCrescente = true;

    $scope.init = function () {
        $scope.listar();
    };

    $scope.listar = function () {
        var requisicaoListagem = new RequisicaoListagem();
        requisicaoListagem.numeroItens = $scope.numeroItensPorPagina;
        requisicaoListagem.paginaAtual = $scope.paginaAtual;
        requisicaoListagem.colunaOrdenacao = $scope.colunaOrdenacao;
        requisicaoListagem.ordenacaoCrescente = $scope.ordenacaoCrescente;
        requisicaoListagem.valorFiltragem = $scope.pesquisa;

        $http.post("perfilAcesso/listar", requisicaoListagem).success(onSuccess).error($scope.onError);
        function onSuccess(data) {
            $scope.perfisAcesso = data.itens;
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

    $scope.remover = function (id) {
        $http.delete("perfilAcesso/" + id).success(onSuccess).error(onErrorRemover);

        function onSuccess() {
            growl.success("Perfil de Acesso removido com sucesso!");
        }
        
        function onErrorRemover() {
            growl.error("Perfil de Acesso vinculado à algum  usuário");
        }
    }

}