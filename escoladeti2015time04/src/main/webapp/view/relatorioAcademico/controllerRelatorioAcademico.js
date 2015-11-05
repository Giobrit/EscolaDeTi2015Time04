AppModule.controller("controllerRelatorioAcademico", controllerRelatorioAcademico);

function controllerRelatorioAcademico($scope, $http, $routeParams, $location, growl, $timeout) {

    $scope.itensTimeline = [];
    $scope.propriedadesItens = [];
    $scope.relatorioAcademico = {ra: ""};
    $scope.raParaFoto = "../../bibliotecas/img/user.png";

    $scope.propriedadesItens["Atendimento"] = new itemTimeline("panel-primary", "");
    $scope.propriedadesItens["Atendimento Preventivo"] = new itemTimeline("panel-danger", "");
    $scope.propriedadesItens["Atendimento Especial"] = new itemTimeline("panel-default", "");

    $scope.carregarAluno = function (ra) {
        if (ra.length !== 8) {
            $scope.itensTimeline = [];
            setAtributosAluno({});
            $scope.raParaFoto = "../../bibliotecas/img/user.png";
            return;
        }

        $http.get("/lyceumClient/aluno/" + ra).success(onSuccess).error($scope.onError);

        function onSuccess(data) {
            setAtributosAluno(data);
            console.log(data);
            carregaTimeline(ra);
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
        $http.get("/relatorioAcademico/aluno/" + ra).success(onSucess).error($scope.onError);

        function onSucess(data) {
            $scope.itensTimeline = data;
        }
    }

    $scope.timestampToData = function (data) {
        return timestampParaData(data);
    };

    $(function () {
        $("#tabs").tabs();
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
                    text: 'Registros de Atendimentos'
                },
                credits: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [{
                        name: "Brands",
                        colorByPoint: true,
                        data: [{
                                name: "Atendimento",
                                y: 56.33
                            }, {
                                name: "Atendimento Preventivo",
                                y: 24.03,
                                sliced: true,
                                selected: true
                            }, {
                                name: "Atendimento Especial",
                                y: 10.38
                            }]
                    }]
            });
        });
    });
}