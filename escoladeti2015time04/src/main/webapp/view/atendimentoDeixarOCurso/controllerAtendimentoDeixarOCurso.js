AppModule.controller("controllerFormAtendimentoDeixarOCurso",controllerFormAtendimentoDeixarOCurso);

function controllerFormAtendimentoDeixarOCurso($scope, $http, $routeParams, $location){
    
    $scope.init = function(){
        $scope.limparTela();
        $scope.preencherListDeObjetivo();
        $scope.preencherListDeMotivo();
        
        idEditando = $routeParams.id;
        
        if(idEditando){
            $scope.editando = true;
            $scope.editar(idEditando);
        }
    };
    
    $scope.limparTela = function (){
        $scope.atendimentoDeixarOCurso = {};
        $scope.editando = false;
    };
    
    $scope.salvar = function () {        
        
        if ($scope.editando) {
            $http.put("/atendimento/deixarOCurso", $scope.atendimentoDeixarOCurso).success(onSuccess).error(onError);
        } else {
            $http.post("/atendimento/deixarOCurso", $scope.atendimentoDeixarOCurso).success(onSuccess).error(onError);
        }

        function onSuccess() {            
            alert(JSON.stringify($scope.atendimentoDeixarOCurso));
            $location.path("/atendimento/deixarOCurso/list");
            alert("Atendimento salvo com sucesso");
        }
    };
    
    $scope.editar = function (id){
        $http.get("/atendimento/deixarOCurso/"+ id).success(onSuccess).error(onError);
        
        function onSuccess(data){            
            $scope.atendimentoDeixarOCurso = data;
        }
    };
    
    $scope.preencherListDeObjetivo = function (){
        var requisicaoListagem = new RequisicaoListagem();
        $http.post("atendimento/deixarOCurso/objetivo/listar", requisicaoListagem).success(onSuccess).error(onError);
        
        function onSuccess(data) {
            $scope.objetivos = data.itens;                  
        }
    };
    
    $scope.preencherListDeMotivo = function (){
        var requisicaoListagem = new RequisicaoListagem();
        $http.post("/atendimento/deixarOCurso/motivo/listar", requisicaoListagem).success(onSuccess).error(onError);
        
        function onSuccess(data) {            
            $scope.motivos = data.itens;       
        }
    };
    
    $scope.carregarAluno = function (ra) {        
        alert("R.A: "+ ra);       
        $http.get("/lyceumClient/aluno/"+ ra).success(onSuccess).error();
        
        function onSuccess(data) {            
            alert("Deu certo!!!");
            alert(JSON.stringify(data));
            $scope.ra = data.ra;
            $scope.nomeAluno = data.nome;
            $scope.curso = data.curso;
            $scope.centro = data.centro;
            $scope.serieSemestre = data.serie;
            $scope.turno = data.turno;
            $scope.bolsaFinanciamento = data.bolsa;
            $scope.numeroReprovacoes = data.reprovacao;
            $scope.matriculado = data.matriculado;
        }        
    };
    
    function onError(data) {
        alert(JSON.stringify(data));
    };
}