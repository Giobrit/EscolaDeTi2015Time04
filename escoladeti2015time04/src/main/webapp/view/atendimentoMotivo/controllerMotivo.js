AppModule.controller("controllerFormMotivoAtendimento", controllerFormMotivoAtendimento);

AppModule.controller("controllerListMotivoAtendimento", controllerListMotivoAtendimento);

function controllerFormMotivoAtendimento($scope, $http, $routeParams, $location, growl, $timeout) {
    
    $scope.nextPath = $scope.useOldPath  ? $scope.oldPath : "/AtendimentoMotivo/list";
    $scope.setUseOldPath(false);

    $scope.init = function () {
        limparTela();

        var idMotivoEditado = $routeParams.id;
        if (idMotivoEditado) {
            $scope.editando = true;
            $scope.editar(idMotivoEditado);
        }
    };

    $scope.atendimentos =
            [
                {label: "Atendimento", atendimentoDoMotivo: "ATENDIMENTODEIXAROCURSO", checked: false},
                {label: "Atendimento Especial", atendimentoDoMotivo: "ATENDIMENTOESPECIAL", checked: false},
                {label: "Atendimento Preventivo", atendimentoDoMotivo: "ATENDIMENTOPREVENTIVO", checked: false}
            ];

    $scope.salvar = function () {
        setAtendimentosDoMotivo();
        if ($scope.editando) {
            $http.put("/atendimento/motivo", $scope.motivo).success(onSuccess).error($scope.onError);
        } else {
            $http.post("/atendimento/motivo", $scope.motivo).success(onSuccess).error($scope.onError);
        }


        function onSuccess() {
            $timeout(success, 100);
            $location.path($scope.nextPath);
        }
        function success() {
            growl.success("<b>Motivo salvo com sucesso!</b>");
        }
    };

    $scope.editar = function (id) {
        
        $http.get("/atendimento/motivo/" + id).success(onSuccess).error($scope.onError);

        function onSuccess(data) {
            $scope.motivo = data;
            
            marcarAtendimentoDoMotivo();
        }
    };

    function limparTela() {
        $scope.motivo = {};
        $scope.editando = false;
    }
    
    function marcarAtendimentoDoMotivo(){
        for(var i = 0; i < $scope.motivo.atendimentosDoMotivo.length; i++){
//            console.log($scope.motivo.atendimentosDoMotivo[i]);
            for(var j = 0; j < $scope.atendimentos.length;j++){
                if($scope.atendimentos[j].atendimentoDoMotivo === $scope.motivo.atendimentosDoMotivo[i]){
                    $scope.atendimentos[j].checked = true;
                }
            }
        }
    }

    function setAtendimentosDoMotivo() {
       $scope.motivo.atendimentosDoMotivo = [];
       for(var i=0; i < $scope.atendimentos.length; i++){
           if($scope.atendimentos[i].checked){
               $scope.motivo.atendimentosDoMotivo.push($scope.atendimentos[i].atendimentoDoMotivo);
           }
       }
    }
}

function controllerListMotivoAtendimento($scope, $http, growl) {

    $scope.paginaAtual = 1;
    $scope.numeroItensPorPagina = 5;
    $scope.colunaOrdenacao = "descricao";
    $scope.ordenacaoCrescente = true;

    $scope.init = function () {
        $scope.listar();
    };

    $scope.alterarStatus = function (motivo) {

        var status = motivo.status === 'ATIVO' ? 'INATIVO' : 'ATIVO';
        $http.put("/atendimento/motivo/" + motivo.id + "/" + status).success(onSuccess).error($scope.onError);

        function onSuccess() {
            motivo.status = status;
        }
    };

    $scope.listar = function () {
        var requisicaoListagem = new RequisicaoListagem();
        requisicaoListagem.numeroItens = $scope.numeroItensPorPagina;
        requisicaoListagem.paginaAtual = $scope.paginaAtual;
        requisicaoListagem.colunaOrdenacao = $scope.colunaOrdenacao;
        requisicaoListagem.ordenacaoCrescente = $scope.ordenacaoCrescente;
        requisicaoListagem.valorFiltragem = $scope.pesquisa;


        $http.post("/atendimento/motivo/listar", requisicaoListagem).success(onSuccess).error($scope.onError);
        function onSuccess(data) {
            $scope.motivos = data.itens;
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

}