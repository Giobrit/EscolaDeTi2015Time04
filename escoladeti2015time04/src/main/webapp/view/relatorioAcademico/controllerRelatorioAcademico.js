AppModule.controller("controllerRelatorioAcademico", controllerRelatorioAcademico);

function controllerRelatorioAcademico($scope, $http, $routeParams, $location, growl, $timeout) {
    $scope.itensTimeline = [];
    $scope.propriedadesItens = [];
    $scope.relatorioAcademico = {ra: ""};
    $scope.raParaFoto = "../../bibliotecas/img/user.png";
    $scope.quantidadeAtendimentosDoAluno = {};
            
    $scope.propriedadesItens["Atendimento"] = new itemTimeline("panel-primary", "", {nome: "AtendimentoDeixarOCurso", exibir: true}, 1);
    $scope.propriedadesItens["Atendimento Preventivo"] = new itemTimeline("panel-danger", "", {nome: "AtendimentoPreventivo", exibir: true}, 1);
    $scope.propriedadesItens["Atendimento Especial"] = new itemTimeline("panel-default", "", {nome: "AtendimentoEspecial", exibir: true}, 1);

    $scope.carregarAluno = function (ra) {
        if (ra.length !== 8) {
            $scope.itensTimeline = [];
            setAtributosAluno({});
            $scope.raParaFoto = "../../bibliotecas/img/user.png";
            return;
        }

        $http.get("/lyceumClient/aluno/" + ra).success(onSuccess).error($scope.onError);

        function onSuccess(data) {
            getRelatorioEstatistica(ra);
            setAtributosAluno(data);
            console.log(data);
            carregaTimeline(ra);
            getMotivos(ra);
            $scope.raParaFoto = "lyceumClient/aluno/foto/" + ra;
        }
    };

    $scope.setMatriculado = function (data) {
        $scope.relatorioAcademico.matriculado = stringToBoolean(data);

    };

    function setAtributosAluno(aluno) {
        $scope.relatorioAcademico.nomeAluno = aluno.nome;
        $scope.relatorioAcademico.curso = aluno.curso;
        $scope.relatorioAcademico.centro = aluno.centro;
        $scope.relatorioAcademico.serieSemestre = aluno.serie;
        $scope.relatorioAcademico.turno = aluno.turno;
        $scope.relatorioAcademico.bolsaFinanciamento = aluno.bolsa;
        $scope.relatorioAcademico.numeroReprovacoes = aluno.reprovacao;
        $scope.relatorioAcademico.matriculado = (aluno.matriculado);
        $scope.matriculadoSelecionado = aluno.matriculado;
    }

    function carregaTimeline(ra) {
        $http.post("/relatorioAcademico/aluno", getRequisicaoLinhaDoTempo()).success(onSucess).error($scope.onError);

        function onSucess(data) {
            $scope.itensTimeline = data;
        }
    }

    function getRequisicaoLinhaDoTempo() {
        var requisicaoLinhaDoTempo = {};
        requisicaoLinhaDoTempo.ra = $scope.relatorioAcademico.ra;
        requisicaoLinhaDoTempo.filtrosLinhaTempo = [];

        var filtroAtendimento = $scope.propriedadesItens["Atendimento"].filtroLinhaTempo;
        var filtroAtendimentoPreventivo = $scope.propriedadesItens["Atendimento Preventivo"].filtroLinhaTempo;
        var filtroAtendimentoEspecial = $scope.propriedadesItens["Atendimento Especial"].filtroLinhaTempo;

        if (filtroAtendimento.exibir) {
            requisicaoLinhaDoTempo.filtrosLinhaTempo.push(filtroAtendimento);
        }
        if (filtroAtendimentoPreventivo.exibir) {
            requisicaoLinhaDoTempo.filtrosLinhaTempo.push(filtroAtendimentoPreventivo);
        }
        if (filtroAtendimentoEspecial.exibir) {
            requisicaoLinhaDoTempo.filtrosLinhaTempo.push(filtroAtendimentoEspecial);
        }

//        requisicaoLinhaDoTempo.filtrosLinhaTempo.put();
        return requisicaoLinhaDoTempo;
    }

    $scope.setExibirElemento = function (elemento) {
        $scope.propriedadesItens[elemento].filtroLinhaTempo.exibir = !$scope.propriedadesItens[elemento].filtroLinhaTempo.exibir;
        $scope.propriedadesItens[elemento].opacidade = $scope.propriedadesItens[elemento].opacidade === 1 ? 0.4 : 1;
        carregaTimeline();
    };

    $scope.timestampToData = function (data) {
        return timestampParaData(data);
    };

    carregaRelatorioMotivo();

    $("#tabs").tabs();

    function carregaRelatorioMotivo(motivosDoAluno) {
        if (!motivosDoAluno) {
            $scope.exibeRelatorioMotivo = false;
            return;
        }
        $scope.exibeRelatorioMotivo = true;

        $(document).ready(function () {

            // Build the chart
            $('#pie4').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Resumo motivos'
                },
                credits: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: '<b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                        name: "Brands",
                        colorByPoint: true,
                        data: motivosDoAluno
                    }]
            });
        });
    }

    function getMotivos(ra) {


        return $http.get("/relatorioAcademico/aluno/" + ra).success(onSuccess).error($scope.onError);

        function onSuccess(result) {
            carregaRelatorioMotivo(result);
        }
    }
    
    
    function getRelatorioEstatistica(ra){
        return $http.get("/relatorioAcademico/aluno/quantidade/" + ra).success(onSuccess).error($scope.onError);
        
        function onSuccess(result){
            $scope.quantidadeAtendimentosDoAluno = result;
        }
    }
}