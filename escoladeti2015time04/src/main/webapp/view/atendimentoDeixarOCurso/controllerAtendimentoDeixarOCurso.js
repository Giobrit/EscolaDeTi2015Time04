AppModule.controller("controllerFormAtendimentoDeixarOCurso", controllerFormAtendimentoDeixarOCurso);
var dataFormatada;
var horaFormatada;
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
        montarCampoData();
        alert($scope.atendimentoDeixarOCurso.data);
        alert(JSON.stringify($scope.atendimentoDeixarOCurso));
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
            var dataAux = new Date(data.data);
              
            alert(JSON.stringify(data));
            $scope.atendimentoDeixarOCurso.id = data.id;
            $scope.atendimentoDeixarOCurso.protocolo = data.protocolo;
            $scope.dataDeixarOCurso = dataAux;
            $scope.horaDeixarOCurso = dataAux;            
            $scope.setData($scope.dataDeixarOCurso);
            $scope.setHora($scope.horaDeixarOCurso);            
            $scope.atendimentoDeixarOCurso.ra = data.ra;
            $scope.atendimentoDeixarOCurso.transferencia = data.transferencia;
            $scope.atendimentoDeixarOCurso.coordenadorDiretor = data.coordenadordiretor;            
            $scope.atendimentoDeixarOCurso.descricaoPrivada = data.descricaoprivada;
            $scope.atendimentoDeixarOCurso.descricaoPublica = data.descricaopublica;
            selecionaObjetivoNaTela(data.objetivo);
            selecionaMotivoNaTela(data.motivo);
            $scope.setObjetivo($scope.objetivoSelecionado);
            $scope.setMotivo($scope.motivoSelecionado);
            $scope.carregarAluno(data.ra);                                
        }
    };   
    
    function selecionaObjetivoNaTela(descricao){
        $scope.objetivos.forEach(paraCada);
        function paraCada(objetivo){
            if(objetivo.descricao === descricao){
                $scope.objetivoSelecionado = objetivo;
            }
        }
    }
    
    function selecionaMotivoNaTela(descricao){
        $scope.motivos.forEach(paraCada);
        function paraCada(motivo){
            if(motivo.descricao === descricao){
                $scope.motivoSelecionado = motivo;
            }
        }
    }
    
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
        if (data === "Sim") {
            $scope.atendimentoDeixarOCurso.matriculado = true;
        } else {
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

    $scope.setData = function (data) {
        dataFormatada = "";
        var dataParaFormatacao = new Date(data);

        dataFormatada = formatarData(dataParaFormatacao);
    };

    function formatarData(dataParaFormatacao) {
        return dataParaFormatacao.getFullYear() + "-" +
                (((dataParaFormatacao.getMonth() + 1) < 10) ? "0" : "") + (dataParaFormatacao.getMonth() + 1) + "-" +
                ((dataParaFormatacao.getDate() < 10) ? "0" : "") + dataParaFormatacao.getDate();
    }

    $scope.setHora = function (hora) {        
        horaFormatada = "";
        var horaParaFormatacao = new Date(hora);

        horaFormatada = formatarHora(horaParaFormatacao);
    };
    
    function formatarHora(horaParaFormatacao){
        return ((horaParaFormatacao.getHours() < 10) ? "0" : "") + horaParaFormatacao.getHours() + ":" +
                ((horaParaFormatacao.getMinutes() < 10) ? "0" : "") + horaParaFormatacao.getMinutes() + ":00";
    }
    
    function montarCampoData() {
        $scope.atendimentoDeixarOCurso.data = dataFormatada + "T" + horaFormatada;
    }

    function onError(data) {
        alert(JSON.stringify(data));
    }

}