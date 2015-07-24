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
    }

}

function controllerListPerfilAcesso($scope, $http, $routeParams, $location) {

    $scope.init = function () {
        $scope.listar();
    };
    
    $scope.paginaAtual = 1;
    $scope.numeroItensPorPagina = 8;
    var colunaOrdenacao = "protocolo";
    $scope.labelOrdenacao = "Protocolo";
    var ordenacaoCrescente = true;

    $scope.colunas =
            [
                {label: "Protocolo", colunaOrdenacao: "protocolo", propriedadeItem: "protocolo", checked: false},
                {label: "Data", colunaOrdenacao: "data", propriedadeItem: "data", checked: true},
                {label: "Hora", colunaOrdenacao: "data", propriedadeItem: "hora", checked: true},
                {label: "RA", colunaOrdenacao: "ra", propriedadeItem: "ra", checked: false},
                {label: "Nome Aluno", colunaOrdenacao: "nomeAluno", propriedadeItem: "nomeAluno", checked: true},
                {label: "Curso", colunaOrdenacao: "curso", propriedadeItem: "curso", checked: false},
                {label: "Série", colunaOrdenacao: "serieSemestre", propriedadeItem: "serieSemestre", checked: false},
                {label: "Turno", colunaOrdenacao: "turno", propriedadeItem: "turno", checked: false},
                {label: "Bolsa", colunaOrdenacao: "bolsaFinanciamento", propriedadeItem: "bolsaFinanciamento", checked: false},
                {label: "Reprovações", colunaOrdenacao: "numeroReprovacoes", propriedadeItem: "numeroReprovacoes", checked: false},
                {label: "Matriculado", colunaOrdenacao: "matriculado", propriedadeItem: "matriculado", checked: true},
                {label: "Transferência", colunaOrdenacao: "transferencia", propriedadeItem: "transferencia", checked: true},
                {label: "Coordenador", colunaOrdenacao: "coordenadorDiretor", propriedadeItem: "coordenadorDiretor", checked: true},
                {label: "Objetivo", colunaOrdenacao: "objetivo", propriedadeItem: "objetivo", checked: true},
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
        $http.post("perfilAcesso/listar", requisicaoListagem).success(onSuccess).error(onError);
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
    function onError(data) {
        console.log(JSON.stringify(data));
        growl.error(JSON.stringify(data));
    }

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
