AppModule.controller("controllerRelatorioAcademico", controllerRelatorioAcademico);

function controllerRelatorioAcademico($scope, $http, $routeParams, $location, growl, $timeout) {

    $scope.itensTimeline = [];
    $scope.propriedadesItens = [];
    $scope.relatorioAcademico = {ra: ""};
    $scope.raParaFoto = "../../bibliotecas/img/user.png";

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
                            enabled: false,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        },
                        showInLegend: true
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
    $(function () {
        $('#container').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Quantidade de Atendimentos'
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: [
                    'Atendimento',
                    'Atedimento Preventivo',
                    'Atendimento Especial'
                ]
            },
            yAxis: [{
                    min: 0,
                    title: {
                        text: 'Atendimento'
                    }
                }, {
                    title: {
                        text: 'Profit (millions)'
                    },
                    opposite: true
                }],
            legend: {
                shadow: false
            },
            tooltip: {
                shared: true
            },
            plotOptions: {
                column: {
                    grouping: false,
                    shadow: false,
                    borderWidth: 0
                }
            },
            series: [{
                    name: 'Atendimento',
                    color: 'rgba(165,170,217,1)',
                    data: [150, 73, 20],
                    pointPadding: 0.3,
                    pointPlacement: -0.2
                }, {
                    name: 'Atendimento Preventivo',
                    color: 'rgba(126,86,134,.9)',
                    data: [140, 90, 40],
                    pointPadding: 0.4,
                    pointPlacement: -0.2
                }, {
                    name: 'Atendimento Especial',
                    color: 'rgba(248,161,63,1)',
                    data: [183.6, 178.8, 198.5],
                    tooltip: {
                        valuePrefix: '$',
                        valueSuffix: ' M'
                    },
                    pointPadding: 0.3,
                    pointPlacement: 0.2,
                    yAxis: 1
                }]
        });
    });
}