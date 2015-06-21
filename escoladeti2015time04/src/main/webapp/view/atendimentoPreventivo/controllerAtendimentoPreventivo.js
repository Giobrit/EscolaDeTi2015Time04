AppModule.controller("controllerFormAtendimentoPreventivo", controllerFormAtendimentoPreventivo);

function controllerFormAtendimentoPreventivo($scope, $http, $routeParams, $location, growl, $timeout) {
    
    $scope.init = function () {
        $scope.preencherListdeMotivo();
        $scope.limparTela();
        
        idEditando = $routeParams.id;
        
        if (idEditando) {
            $scope.editando = true;
            $scope.editar(idEditando);
        }
    };
    
    $scope.limparTela = function () {
        $scope.atendimentoPreventivo = {};
        $scope.editando = false;
    };
    
    $scope.salvar = function () {
        montarCampoData();
        if ($scope.editando) {
            $http.put("/atendimento/preventivo",$scope.atendimentoPreventivo).success(onSuccess).error(onError);
        } else {
            $http.post("/atendimento/preventivo",$scope.atendimentoPreventivo).success(onSuccess).error(onError);
        }
        
        function onSuccess() {
            $timeout(success, 100);
            $location.path("/AtendimentoPreventivo/list");
        }
    };
    
    function success() {
        growl.success("<b>Atendimento" + ($scope.editando === true ? "editado" : "salvo") + " com sucesso</b>");
    }; 
    
    $scope.editar = function (id) {
        $http.get("/atendimento/preventivo/" + id).success(onSuccess).error(onError);
        
        function onSuccess(data) {
            
            $scope.atendimentoPreventivo.id = data.id;
            $scope.atendimentoPreventivo.ra = data.ra;
            $scope.atendimentoPreventivo.nomeAluno = data.nomealuno;
            $scope.atendimentoPreventivo.curso = data.curso;
            $scope.atendimentoPreventivo.centro = data.centro;
            $scope.atendimentoPreventivo.serieSemestre = data.serieSemestre;
            $scope.atendimentoPreventivo.turno = data.turno;
            $scope.atendimentoPreventivo.bolsaFinanciamento = data.bolsafinanciamento;
            $scope.atendimentoPreventivo.numeroReprovacoes = data.numeroreprovacoes;
            $scope.atendimentoPreventivo.descricaoPrivada = data.descricaoprivada;
            $scope.atendimentoPreventivo.descricaoPublica = data.descricaopublica;
            $scope.atendimentoPreventivo.descricaoPublica = data.descricaopublica;
            $scope.atendimentoPreventivo.meioDeContato = data.meiodecontato;
            $scope.atendimentoPreventivo.encaminhamento = data.encaminhamento;
            $scope.dataPreventivo = timestampParaData(data.data);
            $scope.horaPreventivo = new Date(data.data);
            $scope.matriculadoSelecionado = data.matriculado;
            $scope.setMatriculado(data.matriculado);
            
            selecionaMotivoNaTela(data.motivo);
            $scope.setMotivo($scope.motivoSelecionado);
        }
    };
    
    function selecionaMotivoNaTela(descricao) {
        $scope.motivos.forEach(paraCada);
        function paraCada(motivo) {
            if (motivo.descricao === descricao) {
                $scope.motivoSelecionado = motivo;
            }
        }
    }
    
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
    
    $scope.setMotivo = function (data) {
        $scope.atendimentoPreventivo.idMotivo = data.id;
    };
    
    $scope.setMatriculado = function (data) {
        $scope.atendimentoPreventivo.matriculado = data === "Sim" ? true : false;
    };
    
    function setAtributosAluno(aluno) {
        $scope.atendimentoPreventivo.nomeAluno = aluno.nome;
        $scope.atendimentoPreventivo.curso = aluno.curso;
        $scope.atendimentoPreventivo.centro = aluno.centro;
        $scope.atendimentoPreventivo.serieSemestre = aluno.serie;
        $scope.atendimentoPreventivo.turno = aluno.turno;
        $scope.atendimentoPreventivo.bolsaFinanciamento = aluno.bolsa;
        $scope.atendimentoPreventivo.numeroReprovacoes = aluno.reprovacao;
        $scope.matriculadoSelecionado = aluno.matriculado;
        $scope.setMatriculado(aluno.matriculado);
    }
    
    $scope.setData = function () {
        return formatarData(new Date($scope.dataPreventivo));
        ;
    };
    
    function formatarData(dataParaFormatacao) {
        return dataParaFormatacao.getFullYear() + "-" +
                ((dataParaFormatacao.getDate() < 10) ? "0" : "") + dataParaFormatacao.getDate() + "-" +
                (((dataParaFormatacao.getMonth() + 1) < 10) ? "0" : "") + (dataParaFormatacao.getMonth() + 1);
    }
    
    $scope.setHora = function () {
        return formatarHora(new Date($scope.horaPreventivo));
    };
    
    function formatarHora(horaParaFormatacao) {
        return ((horaParaFormatacao.getHours() < 10) ? "0" : "") + horaParaFormatacao.getHours() + ":" +
                ((horaParaFormatacao.getMinutes() < 10) ? "0" : "") + horaParaFormatacao.getMinutes() + ":00";
    }
    
     function montarCampoData() {
        if ($scope.horaPreventivo && $scope.dataPreventivo) {
            $scope.atendimentoPreventivo.data = $scope.setData() + "T" + $scope.setHora() + "-03";
        }
    }
    
    $scope.setData();

    function onError(data) {
        growl.error(JSON.stringify(data));
    }        
}

AppModule.controller("controllerListAtendimentoPreventivo", controllerListAtendimentoPreventivo);

function controllerListAtendimentoPreventivo($scope,$http,growl) {
    
    $scope.paginaAtual = 1;
    $scope.numeroItensPorPagina = 8;
    colunaOrdenacao = "data";
    $scope.labelOrdenacao = "Data";
    var ordenacaoCrescente = true;

    $scope.colunas = 
            
            [
                {label: "Data", colunaOrdenacao: "data", propriedadeItem: "data", checked: true},
                {label: "Hora", colunaOrdenacao: "data", propriedadeItem: "hora", checked: true},
                
            ]
}













