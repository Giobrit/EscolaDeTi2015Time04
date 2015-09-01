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
    };

    $scope.selecionouUmCurso = function (curso) {
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
    };

    function habilitaDesabilitaSelecaoPorCurso(data) {
        document.getElementById("selectPorCurso").disabled = data;
    }

    $scope.gerarRelatorio = function () {
        //Os graficos estão confusos!!!
        switch ($scope.tipoSelecionado.id) {
            case 1 ://Relatório geral
            {
                criarTabela();
                $scope.grafico2();//Grafico em colunas
                break;
            }
            case 2 ://Relatório de permanencia
            {
                $scope.permanencia();
                break;
            }
            case 3 ://Relatório de motivos por curso
            {
//                $scope.resumo();
                criarTabela();
                break;
            }
        }
    };

    function criarTabela() {
        var html = "";
        
        //Porquice mas foi feito para teste!!!
        //FUNCIONA!!!
        html += '<table class="table table-hover table-bordered">';
        html += '<thead>';
        html += '<th>Cursos</th>';
        html += '<th>Atendimentos</th>';
        html += '<th colspan="2">Trancamentos/<br>Cancelamentos/<br>Transferencias</th>';
        html += '<th colspan="2">Permanências</th>';
        html += '</thead>';
        html += '<tbody>';
        html += '<tr>';
        html += '<td>CBS - Saúde</td>';
        html += '<td>382</td>';
        html += '<td>341</td>';
        html += '<td>89,2%</td>';
        html += '<td>41</td>';
        html += '<td>10,73%</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<td>CETA - Exatas</td>';
        html += '<td>418</td>';
        html += '<td>361</td>';
        html += '<td>86,2%</td>';
        html += '<td>57</td>';
        html += '<td>13,73%</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<td>CHSA - Humanas</td>';
        html += '<td>364</td>';
        html += '<td>305</td>';
        html += '<td>83,2%</td>';
        html += '<td>59</td>';
        html += '<td>16,73%</td>';
        html += '</tr>';
        html += '</tbody>';
        html += '<tfoot>';
        html += '<tr>';
        html += '<td><b>TOTAL</b></td>';
        html += '<td><b>1164</b></td>';
        html += '<td><b>1007</b></td>';
        html += '<td><b>86,51%</b></td>';
        html += '<td><b>157</b></td>';
        html += '<td><b>13,49%</b></td>';
        html += '</tr>';
        html += '</tfoot>';
        html += '</table>';
        
        document.getElementById('tabela').innerHTML = html;
    }

//Cria tabela de forma dinamica
//    function criarTabela() {
//        var linha = 3;
//        var coluna = 4;
//        var conteudo = 1;
//        var html = "";
//        
//        html += '<table border>';
//        for (var x = 1; x <= linha; x++) {
//            html += '<tr>';
//            for (var y = 1; y <= coluna; y++) {
//                html += '<td>' + conteudo + '</td>';
//                conteudo++;
//            }
//            html += '</tr>';
//        }
//        html += '</table>';
//        document.getElementById('tabela').innerHTML = html;
//    }

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