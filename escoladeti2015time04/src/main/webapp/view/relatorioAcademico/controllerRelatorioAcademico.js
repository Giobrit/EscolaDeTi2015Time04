AppModule.controller("controllerRelatorioAcademico", controllerRelatorioAcademico);

function controllerRelatorioAcademico($scope, $http, $routeParams, $location, growl, $timeout) {

    $scope.itensTimeline = [];
    $scope.propriedadesItens = [];

    $scope.propriedadesItens["Atendimento"] = new itemTimeline("panel-primary", "");
    $scope.propriedadesItens["Atendimento Preventivo"] = new itemTimeline("panel-success", "");
    $scope.propriedadesItens["Atendimento Especial"] = new itemTimeline("panel-default", "");

    $scope.carregarAluno = function (ra) {
        if (ra.length !== 8) {
            $scope.itensTimeline = [];
            setAtributosAluno({});
            return;
        }

        $http.get("/lyceumClient/aluno/" + ra).success(onSuccess).error($scope.onError);

        function onSuccess(data) {
            setAtributosAluno(data);
            console.log(data);
            carregaTimeline(ra);
            $scope.raParaFoto = ra;
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
    });
    
    $scope.init = function () {
        document.getElementById('tabela01').innerHTML = "";
    };

    $scope.armazenarDadosRelatorioEstatisticaAtendimentos = function (data) {
        $scope.atendimentos = data.atendimentos;
        $scope.gerarRelatorioEstatisticaAtendimentos($scope.atendimentos);
    };

    $scope.gerarRelatorioEstatisticaAtendimentos = function (atendimentos) {

        var totalAtendimentos = 0;

        //Atendimentos
        for (var contador = 0; contador < atendimentos.length; contador++) {
            
            totalAtendimentos += atendimentos[contador].atendimentos;
        }

        //CRIAR TABELA01
        var htmlTagTable = '<table id="tabela01" class="table table-hover table-bordered">';
        var htmlTHead = '<thead>' +
                '   <th>Cursos</th>' +
                '   <th>Atendimentos</th>' +
                '   <th colspan="2">Trancamentos/<br>Cancelamentos/<br>Transferencias</th>' +
                '   <th colspan="2">Permanências</th>' +
                '</thead>';
        var htmlTBody = '<tbody>' +
                '   <tr>' +
                '      <td>CBS - Saúde</td>' +
                '      <td>' + qtdeAtendimentoCBS + '</td>' +
                '      <td>' + qtdeTrancamentosCancelamentosTransferenciasCBS + '</td>' +
                '      <td>' + percentualCBS.toFixed(2) + '%</td>' +
                '      <td>' + qtdePermanenciasCBS + '</td>' +
                '      <td>' + percentualPermanenciasCBS.toFixed(2) + '%</td>' +
                '   </tr>' +
                '   <tr>' +
                '      <td>CETA - Exatas</td>' +
                '      <td>' + qtdeAtendimentoCETA + '</td>' +
                '      <td>' + qtdeTrancamentosCancelamentosTransferenciasCETA + '</td>' +
                '      <td>' + percentualCETA.toFixed(2) + '%</td>' +
                '      <td>' + qtdePermanenciasCETA + '</td>' +
                '      <td>' + percentualPermanenciasCETA.toFixed(2) + '%</td>' +
                '   </tr>' +
                '   <tr>' +
                '      <td>CHSA - Humanas</td>' +
                '      <td>' + qtdeAtendimentoCHSA + '</td>' +
                '      <td>' + qtdeTrancamentosCancelamentosTransferenciasCHSA + '</td>' +
                '      <td>' + percentualCHSA.toFixed(2) + '%</td>' +
                '      <td>' + qtdePermanenciasCHSA + '</td>' +
                '      <td>' + percentualPermanenciasCHSA.toFixed(2) + '%</td>' +
                '   </tr>' +
                '</tbody>';
        var htmlTagFoot = '<tfoot>' +
                '   <tr>' +
                '      <td><b>TOTAL</b></td>' +
                '      <td><b>' + totalAtendimentos + '</b></td>' +
                '      <td><b>' + totalTrancamentosCancelamentosTransferencias + '</b></td>' +
                '      <td><b>' + totalPercentual.toFixed(2) + '%</b></td>' +
                '      <td><b>' + totalPermanencias + '</b></td>' +
                '      <td><b>' + totalPermanenciasPercentual.toFixed(2) + '%</b></td>' +
                '   </tr>' +
                '</tfoot>';
        var htmlTagFechaTable = '</table>';

        document.getElementById('tabela01').innerHTML = htmlTagTable + htmlTHead + htmlTBody + htmlTagFoot + htmlTagFechaTable;

        $(function () {
            $('#container').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'column'
                },
                title: {
                    text: ''
                },
                legend: {
                    enabled: false
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: 0,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }},
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Atendimentos'
                    }
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.y}</b>'
                },
                credits: {
                    enabled: false
                },
                series: [{
                        name: "Atendimentos",
                        data: [
                            ['CBS - Saúde', qtdeAtendimentoCBS],
                            ['CETA - Exatas', qtdeAtendimentoCETA],
                            ['CHSA - Humanas', qtdeAtendimentoCHSA]
                        ]
                    }],
                dataLabels: {
                    enabled: true,
                    rotation: -90,
                    color: '#FFFFFF',
                    align: 'right',
                    format: '{point.y:.1f}', // one decimal
                    y: 10, // 10 pixels down from the top
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            });
        });
        $(function () {

            $(document).ready(function () {

                // Build the chart
                $('#pie').highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: 'Percentual Trancamento/Cancelamento/Transferência'
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
                                enabled: false
                            },
                            showInLegend: true
                        }
                    },
                    series: [{
                            name: "Brands",
                            colorByPoint: true,
                            data: [{
                                    name: "CBS - Saúde",
                                    y: qtdeTrancamentosCancelamentosTransferenciasCBS
                                }, {
                                    name: "CETA - Exatas",
                                    y: qtdeTrancamentosCancelamentosTransferenciasCETA
                                }, {
                                    name: "CHSA - Humanas",
                                    y: qtdeTrancamentosCancelamentosTransferenciasCHSA
                                }]
                        }]
                });
            });
        });
        $(function () {

            $(document).ready(function () {

                // Build the chart
                $('#pie1').highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: 'Percentual Permanência'
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
                                enabled: false
                            },
                            showInLegend: true
                        }
                    },
                    series: [{
                            name: "Brands",
                            colorByPoint: true,
                            data: [{
                                    name: "CBS - Saúde",
                                    y: qtdePermanenciasCBS
                                }, {
                                    name: "CETA - Exatas",
                                    y: qtdePermanenciasCETA
                                }, {
                                    name: "CHSA - Humanas",
                                    y: qtdePermanenciasCHSA
                                }]
                        }]
                });
            });
        });
    };

}