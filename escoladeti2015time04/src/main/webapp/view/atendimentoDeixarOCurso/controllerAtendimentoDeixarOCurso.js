AppModule.controller("controllerFormAtendimentoDeixarOCurso", controllerFormAtendimentoDeixarOCurso);

function controllerFormAtendimentoDeixarOCurso($scope, $http, $routeParams, $location) {

    $scope.init = function () {
        $scope.limparTela();
        $scope.preencherListDeObjetivo();
        $scope.preencherListDeMotivo();

        idEditando = $routeParams.id;

        if (idEditando) {
            $scope.editando = true;
            $scope.editar(idEditando);
        }
    };

    $scope.limparTela = function () {
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
            $location.path("/atendimento/deixarOCurso/list");
            alert("Atendimento salvo com sucesso");
        }
    };

    $scope.editar = function (id) {
        $http.get("/atendimento/deixarOCurso/" + id).success(onSuccess).error(onError);

        function onSuccess(data) {
            $scope.atendimentoDeixarOCurso = data;
        }
    };

    $scope.preencherListDeObjetivo = function () {
        $http.get("/atendimento/deixarOCurso/objetivo/listarAtivos").success(onSuccess).error(onError);

        function onSuccess(data) {
            $scope.objetivos = data.itens;
        }
    };

    $scope.preencherListDeMotivo = function () {
        $http.get("/atendimento/deixarOCurso/motivo/listarAtivos").success(onSuccess).error(onError);

        function onSuccess(data) {
            $scope.motivos = data.itens;
        }
    };

    $scope.carregarAluno = function (ra) {
        if (ra.length !== 8) {
            setAtributosAluno({});
            return;
        }

        $http.get("/lyceumClient/aluno/" + ra).success(onSuccess).error();

        function onSuccess(data) {
            setAtributosAluno(data);
        }
    };

    $scope.setObjetivo = function (data) {
        $scope.atendimentoDeixarOCurso.idObjetivo = data.id;
    };

    $scope.setMotivo = function (data) {
        $scope.atendimentoDeixarOCurso.idMotivo = data.id;
    };

    $scope.setMatriculado = function (data) {        
        if(data === "Sim"){
            $scope.atendimentoDeixarOCurso.matriculado = true;
        }else{
            $scope.atendimentoDeixarOCurso.matriculado = false;
        }
    };

    function setAtributosAluno(aluno) {
        $scope.atendimentoDeixarOCurso.nomeAluno = aluno.nome;
        $scope.atendimentoDeixarOCurso.curso = aluno.curso;
        $scope.atendimentoDeixarOCurso.centro = aluno.centro;
        $scope.atendimentoDeixarOCurso.serieSemestre = aluno.serie;
        $scope.atendimentoDeixarOCurso.turno = aluno.turno;
        $scope.atendimentoDeixarOCurso.bolsaFinanciamento = aluno.bolsa;
        $scope.atendimentoDeixarOCurso.numeroReprovacoes = aluno.reprovacao;                
        $scope.matriculadoSelecionado = aluno.matriculado;
        $scope.setMatriculado(aluno.matriculado);
    }
    
    $scope.montarData = function (data){
        var dataFormatada = new Date(data);
        $scope.atendimentoDeixarOCurso.data =  dataFormatada.getFullYear() +"-"+ (((dataFormatada.getMonth() + 1) < 10) ? "0" : "") + (dataFormatada.getMonth() + 1) +"-"+ ((dataFormatada.getDate() < 10) ? "0" : "") + dataFormatada.getDate();
        
        alert($scope.atendimentoDeixarOCurso.data);
        alert(JSON.stringify(data));
    };
    
    $scope.montarHora = function (hora){
        alert(JSON.stringify(hora));    
    };
    
    function onError(data) {
        alert(JSON.stringify(data));
    }

}