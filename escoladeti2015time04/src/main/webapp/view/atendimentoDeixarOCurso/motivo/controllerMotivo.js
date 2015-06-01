AppModule.controller("controllerFormMotivoAtendimentoDeixarOCurso", controllerFormMotivoAtendimentoDeixarOCurso);

AppModule.controller("controllerListMotivoAtendimentoDeixarOCurso", controllerListMotivoAtendimentoDeixarOCurso );

function controllerFormMotivoAtendimentoDeixarOCurso($scope, $http, $routeParams, $location, growl, $timeout) {

    $scope.init = function () {
        limparTela();

        var idMotivoEditado = $routeParams.id;
        if (idMotivoEditado) {
            $scope.editando = true;
            $scope.editar(idMotivoEditado);
        }
    };


    $scope.salvar = function () {
        if ($scope.editando) {
            $http.put("/atendimento/deixarOCurso/motivo", $scope.motivo).success(onSuccess).error(onError);
        } else {
            $http.post("/atendimento/deixarOCurso/motivo", $scope.motivo).success(onSuccess).error(onError);
        }
            

        function onSuccess() {
            $timeout(success,100);
            $location.path("/AtendimentoDeixarOCurso/Motivo/list");
        }
        function success(){
            growl.success("<b>Motivo cadastrado com sucesso!</b>");
        }
    };

    $scope.editar = function (id) {
        $http.get("/atendimento/deixarOCurso/motivo/" + id).success(onSuccess).error(onError);

        function onSuccess(data) {
            $scope.motivo = data;
        }
    };

    function limparTela() {
        $scope.motivo = {};
        $scope.editando = false;
    }

    function onError(data) {
        growl.error(JSON.stringify(data));
    }

}

function controllerListMotivoAtendimentoDeixarOCurso($scope, $http, growl) {

    $scope.paginaAtual = 1;
    $scope.totalPaginas = 1;
    $scope.colunaOrdenacao = "descricao";
    var ordenacaoCrescente = true;

    $scope.init = function () {
        $scope.listar();
    };
    
    $scope.alterarStatus = function (motivo) {
        var status = motivo.status === 'ATIVO' ? 'INATIVO' : 'ATIVO';
        $http.put("/atendimento/deixarOCurso/motivo/" + motivo.id + "/" + status).success(onSuccess).error(onError);

        function onSuccess() {
            motivo.status = status;
        }
    };

    $scope.listar = function () {
        var requisicaoListagem = new RequisicaoListagem();
        requisicaoListagem.numeroItens = 8;
        requisicaoListagem.paginaAtual = $scope.paginaAtual;
        requisicaoListagem.colunaOrdenacao = $scope.colunaOrdenacao;
        requisicaoListagem.ordenacaoCrescente = ordenacaoCrescente;
        requisicaoListagem.valorFiltragem = $scope.pesquisa;
        
        
        $http.post("/atendimento/deixarOCurso/motivo/listar", requisicaoListagem).success(onSuccess).error(onError);
        function onSuccess(data) {
            $scope.motivos = data.itens;
            $scope.totalPaginas = data.numeroTotalPaginas;
        }
    };
 
     $scope.alterarOrdenacao = function (coluna) {
        if ($scope.colunaOrdenacao === coluna) {
            ordenacaoCrescente = !ordenacaoCrescente;
        }
        
        $scope.colunaOrdenacao = coluna;
        $scope.listar();
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
   
    function onError(data) {
        growl.error(JSON.stringify(data));
    }
}