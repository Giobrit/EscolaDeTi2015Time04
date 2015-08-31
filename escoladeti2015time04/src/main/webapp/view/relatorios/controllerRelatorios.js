AppModule.controller("controllerRelatorioResumido", controllerRelatorioResumido);
AppModule.controller("controllerRelatorioPorCentro", controllerRelatorioPorCentro);

function controllerRelatorioResumido($scope) {

    $scope.init = function () {
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
                            ['CBS - Saúde', 382],
                            ['CETA - Exatas', 418],
                            ['CHSA - Humanas', 364]
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
                                    y: 341
                                }, {
                                    name: "CETA - Exatas",
                                    y: 361
                                }, {
                                    name: "CHSA - Humanas",
                                    y: 305
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
                                    y: 41
                                }, {
                                    name: "CETA - Exatas",
                                    y: 57
                                }, {
                                    name: "CHSA - Humanas",
                                    y: 59
                                }]
                        }]
                });
            });
        });
        $(function () {

            $(document).ready(function () {

                // Build the chart
                $('#pie2').highcharts({
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
                                    name: "Aprendizagem",
                                    y: 7
                                }, {
                                    name: "Distância",
                                    y: 14
                                },
                                {
                                    name: "Doença",
                                    y: 25
                                },
                                {
                                    name: "Financeiro",
                                    y: 286
                                },
                                {
                                    name: "Frequência",
                                    y: 1
                                },
                                {
                                    name: "Gravides",
                                    y: 7
                                },
                                {
                                    name: "Mudança de cidade",
                                    y: 127
                                },
                                {
                                    name: "Não indentificação com o curso",
                                    y: 76
                                },
                                {
                                    name: "Notas baixas",
                                    y: 11
                                },
                                {
                                    name: "Outros",
                                    y: 177
                                },
                                {
                                    name: "Trabalho",
                                    y: 64
                                }, {
                                    name: "Transferencia para outra instituição",
                                    y: 213
                                }]
                        }]
                });
            });
        });
        $(function () {

            $(document).ready(function () {

                // Build the chart
                $('#pie3').highcharts({
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
                                    name: "Aprendizagem",
                                    y: 3
                                }, {
                                    name: "Distância",
                                    y: 12
                                },
                                {
                                    name: "Doença",
                                    y: 1
                                },
                                {
                                    name: "Financeiro",
                                    y: 52
                                },
                                {
                                    name: "Frequência",
                                    y: 2
                                },
                                {
                                    name: "Gravides",
                                    y: 3
                                },
                                {
                                    name: "Mudança de cidade",
                                    y: 5
                                },
                                {
                                    name: "Não indentificação com o curso",
                                    y: 16
                                },
                                {
                                    name: "Notas baixas",
                                    y: 4
                                },
                                {
                                    name: "Outros",
                                    y: 32
                                },
                                {
                                    name: "Trabalho",
                                    y: 23
                                }, {
                                    name: "Transferencia para outra instituição",
                                    y: 4
                                }]
                        }]
                });
            });
        });
    };
}

function controllerRelatorioPorCentro($scope) {

    $scope.init = function () {
        $scope.getCentros();
        $scope.getTipoRelatorio();
        habilitaDesabilitaSelecaoPorCurso(true);
    };

    $scope.centroSelecionado = {};

    $scope.getCentros = function () {
        $scope.centros = [];
        $scope.centros = [{id: 1, descricao: "CBS"},
            {id: 2, descricao: "CETA"},
            {id: 3, descricao: "CHSA"}];

    };

    $scope.getTipoRelatorio = function () {
        $scope.tiposRelatorio = [];
        $scope.tiposRelatorio = [{id: 1, descricao: "Relatório geral"},
            {id: 2, descricao: "Relatório de permanencia"},
            {id: 3, descricao: "Relatório de motivos por curso"}];

    };

    $scope.getCursosRelatorio = function (centro) {
        $scope.cursos = [];
        switch (centro.id) {
            case 1 ://CBS
            {
                $scope.cursos = [{id: 1, descricao: "Biomedicina"},
                    {id: 2, descricao: "Medicina"}];
                break;
            }
            case 2 ://CETA
            {
                $scope.cursos = [{id: 1, descricao: "Analise e desenvolvimento de sistemas"},
                    {id: 2, descricao: "Engenharia civil"}];
                break;
            }
            case 3 ://CHSA
            {
                $scope.cursos = [{id: 1, descricao: "Administração"},
                    {id: 2, descricao: "Direito"}];
                break;
            }
            default :
            {
                $scope.cursos = [];
                break;
            }
        }
        ;
    };

    $scope.selecionouUmCentro = function (centro) {
        $scope.getCursosRelatorio(centro);

        switch (centro.id) {
            case 1 ://CBS
            {
                break;
            }
            case 2 ://CETA
            {
                break;
            }
            case 3 ://CHSA
            {
                break;
            }
        }
//        if (centro === "CBS") {
//            $scope.grafico();
//        } else if (centro === "CETA") {
//            $scope.grafico2();
//        } else if (centro === "CHSA") {
//            $scope.grafico3();
//        }
    };

    $scope.selecionouUmTipo = function (tipo) {
        habilitaDesabilitaSelecaoPorCurso(true);
        switch (tipo.id) {
            case 1 ://Relatório geral
            {
                break;
            }
            case 2 ://Relatório de permanencia
            {
                break;
            }
            case 3 ://Relatório de motivos por curso
            {
                habilitaDesabilitaSelecaoPorCurso(false);
                break;
            }
        }
//        if (tipo === "Relatório resumido de permanencia") {
//            $scope.permanencia();
//        } else if (tipo === "Relatório resumido") {
//            $scope.resumo();
//        }
    };

    function habilitaDesabilitaSelecaoPorCurso(data) {
        document.getElementById("selectPorCurso").disabled = data;
    }

    $scope.gerarRelatorio = function () {
        //Os graficos estão confusos!!!
        switch ($scope.tipoSelecionado.id) {
            case 1 ://Relatório geral
            {                
                $scope.grafico();//Grafico pizza resumo motivo
                $scope.grafico2();//Grafico em colunas
                $scope.grafico3();//Grafico pizza resumo motivo?
                break;
            }
            case 2 ://Relatório de permanencia
            {
                $scope.permanencia();
                break;
            }
            case 3 ://Relatório de motivos por curso
            {
                $scope.resumo();
                break;
            }
        }
    };

    $scope.grafico = function () {
        $(function () {

            $(document).ready(function () {

                // Build the chart
                $('#pie5').highcharts({
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
                            name: "Percentual",
                            colorByPoint: true,
                            data: [{
                                    name: "Aprendizagem",
                                    y: 7
                                }, {
                                    name: "Distância",
                                    y: 14
                                },
                                {
                                    name: "Doença",
                                    y: 25
                                },
                                {
                                    name: "Financeiro",
                                    y: 286
                                },
                                {
                                    name: "Frequência",
                                    y: 1
                                },
                                {
                                    name: "Gravides",
                                    y: 7
                                },
                                {
                                    name: "Mudança de cidade",
                                    y: 127
                                },
                                {
                                    name: "Não indentificação com o curso",
                                    y: 76
                                },
                                {
                                    name: "Notas baixas",
                                    y: 11
                                },
                                {
                                    name: "Outros",
                                    y: 177
                                },
                                {
                                    name: "Trabalho",
                                    y: 64
                                }, {
                                    name: "Transferencia para outra instituição",
                                    y: 213
                                }]
                        }]
                });
            });
        });
    };

    $scope.grafico2 = function () {
        $(function () {
            $('#pie6').highcharts({
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
                            ['CBS - Saúde', 382],
                            ['CETA - Exatas', 418],
                            ['CHSA - Humanas', 364]
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
    };

    $scope.grafico3 = function () {
        $(function () {

            $(document).ready(function () {

                // Build the chart
                $('#pie7').highcharts({
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
                            name: "Percentual",
                            colorByPoint: true,
                            data: [{
                                    name: "Aprendizagem",
                                    y: 7
                                }, {
                                    name: "Distância",
                                    y: 14
                                },
                                {
                                    name: "Doença",
                                    y: 25
                                },
                                {
                                    name: "Financeiro",
                                    y: 286
                                },
                                {
                                    name: "Frequência",
                                    y: 1
                                },
                                {
                                    name: "Gravides",
                                    y: 7
                                },
                                {
                                    name: "Mudança de cidade",
                                    y: 127
                                },
                                {
                                    name: "Não indentificação com o curso",
                                    y: 76
                                },
                                {
                                    name: "Notas baixas",
                                    y: 11
                                },
                                {
                                    name: "Outros",
                                    y: 177
                                },
                                {
                                    name: "Trabalho",
                                    y: 64
                                }, {
                                    name: "Transferencia para outra instituição",
                                    y: 213
                                }]
                        }]
                });
            });
        });
    };

    $scope.permanencia = function () {
        $(function () {

            $(document).ready(function () {

                // Build the chart
                $('#pie8').highcharts({
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
                            name: "Percentual",
                            colorByPoint: true,
                            data: [{
                                    name: "CBS - Saúde",
                                    y: 41
                                }, {
                                    name: "CETA - Exatas",
                                    y: 57
                                }, {
                                    name: "CHSA - Humanas",
                                    y: 59
                                }]
                        }]
                });
            });
        });
    };

    $scope.resumo = function () {
        $(function () {
            $('#pie9').highcharts({
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
                            ['CBS - Saúde', 382],
                            ['CETA - Exatas', 418],
                            ['CHSA - Humanas', 364]
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
                $('#pie10').highcharts({
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
                                    y: 341
                                }, {
                                    name: "CETA - Exatas",
                                    y: 361
                                }, {
                                    name: "CHSA - Humanas",
                                    y: 305
                                }]
                        }]
                });
            });
        });
        $(function () {

            $(document).ready(function () {

                // Build the chart
                $('#pie11').highcharts({
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
                                    y: 41
                                }, {
                                    name: "CETA - Exatas",
                                    y: 57
                                }, {
                                    name: "CHSA - Humanas",
                                    y: 59
                                }]
                        }]
                });
            });
        });
    };

}