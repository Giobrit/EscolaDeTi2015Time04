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
                $scope.graficoRelatorioGeral();//Grafico em colunas
                break;
            }
            case 2 ://Relatório de permanencia
            {                
                $scope.permanencia();
                break;
            }
            case 3 ://Relatório de motivos por curso
            {             
                $scope.resumoMotivo();
                break;
            }
        }
    };

    function apagaTabela() {
        document.getElementById('tabela').innerHTML = "";
    }

    function criarTabela() {
        var html = "";

        html += '<table class="table table-hover table-bordered">' +
                '   <thead>' +
                '       <th>Cursos</th>' +
                '       <th>Atendimentos</th>' +
                '       <th colspan="2">Trancamentos/<br>Cancelamentos/<br>Transferencias</th>' +
                '       <th colspan="2">Permanências</th>' +
                '</thead>' +
                '   <tbody>' +
                '       <tr>' +
                '           <td>Biomedicina</td>' +
                '           <td>382</td>' +
                '           <td>341</td>' +
                '           <td>89,2%</td>' +
                '           <td>41</td>' +
                '           <td>10,73%</td>' +
                '       </tr>' +
                '       <tr>' +
                '           <td>Ciências Biológicas</td>' +
                '           <td>418</td>' +
                '           <td>361</td>' +
                '           <td>86,2%</td>' +
                '           <td>57</td>' +
                '           <td>13,73%</td>' +
                '       </tr>' +
                '       <tr>' +
                '           <td>Educação Física</td>' +
                '           <td>364</td>' +
                '           <td>305</td>' +
                '           <td>83,2%</td>' +
                '           <td>59</td>' +
                '           <td>16,73%</td>' +
                '       </tr>' +
                '       <tr>' +
                '           <td>Enfermagem</td>' +
                '           <td>364</td>' +
                '           <td>305</td>' +
                '           <td>83,2%</td>' +
                '           <td>59</td>' +
                '           <td>16,73%</td>' +
                '       </tr>' +
                '       <tr>' +
                '           <td>Estética e Cosmética</td>' +
                '           <td>364</td>' +
                '           <td>305</td>' +
                '           <td>83,2%</td>' +
                '           <td>59</td>' +
                '           <td>16,73%</td>' +
                '       </tr>' +
                '       <tr>' +
                '           <td>Farmácia</td>' +
                '           <td>364</td>' +
                '           <td>305</td>' +
                '           <td>83,2%</td>' +
                '           <td>59</td>' +
                '           <td>16,73%</td>' +
                '       </tr>' +
                '       <tr>' +
                '           <td>Fisioterapia</td>' +
                '           <td>364</td>' +
                '           <td>305</td>' +
                '           <td>83,2%</td>' +
                '           <td>59</td>' +
                '           <td>16,73%</td>' +
                '       </tr>' +
                '       <tr>' +
                '           <td>Fonoaudiologia</td>' +
                '           <td>364</td>' +
                '           <td>305</td>' +
                '           <td>83,2%</td>' +
                '           <td>59</td>' +
                '           <td>16,73%</td>' +
                '       </tr>' +
                '       <tr>' +
                '           <td>Medicina</td>' +
                '           <td>364</td>' +
                '           <td>305</td>' +
                '           <td>83,2%</td>' +
                '           <td>59</td>' +
                '           <td>16,73%</td>' +
                '       </tr>' +
                '       <tr>' +
                '           <td>Nutrição</td>' +
                '           <td>364</td>' +
                '           <td>305</td>' +
                '           <td>83,2%</td>' +
                '           <td>59</td>' +
                '           <td>16,73%</td>' +
                '       </tr>' +
                '       <tr>' +
                '           <td>Odontologia</td>' +
                '           <td>364</td>' +
                '           <td>305</td>' +
                '           <td>83,2%</td>' +
                '           <td>59</td>' +
                '           <td>16,73%</td>' +
                '       </tr>' +
                '       <tr>' +
                '           <td>Psicologia</td>' +
                '           <td>364</td>' +
                '           <td>305</td>' +
                '           <td>83,2%</td>' +
                '           <td>59</td>' +
                '           <td>16,73%</td>' +
                '       </tr>' +
                '       <tr>' +
                '           <td>Veterinária</td>' +
                '           <td>364</td>' +
                '           <td>305</td>' +
                '           <td>83,2%</td>' +
                '           <td>59</td>' +
                '           <td>16,73%</td>' +
                '       </tr>' +
                '   </tbody>' +
                '   <tfoot>' +
                '       <tr>' +
                '           <td><b>TOTAL</b></td>' +
                '           <td><b>1164</b></td>' +
                '           <td><b>1007</b></td>' +
                '           <td><b>86,51%</b></td>' +
                '           <td><b>157</b></td>' +
                '           <td><b>13,49%</b></td>' +
                '       </tr>' +
                '   </tfoot>' +
                '</table>';

        document.getElementById('tabela').innerHTML = html;
    }

    $scope.graficoRelatorioGeral = function () {
        criarTabela();
        
        $(function () {
            $('#grafico1').highcharts({
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
                $('#grafico2').highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: ''
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
                                    name: "Biomedicina",
                                    y: 341
                                }, {
                                    name: "Ciências Biológicas",
                                    y: 361
                                }, {
                                    name: "Educação Física",
                                    y: 305
                                }, {
                                    name: "Enfermagem",
                                    y: 305
                                }, {
                                    name: "Estética e cosmética",
                                    y: 305
                                }, {
                                    name: "Farmácia",
                                    y: 305
                                }, {
                                    name: "Fisioterapia",
                                    y: 305
                                }, {
                                    name: "Fonoaudioterapia",
                                    y: 305
                                }, {
                                    name: "Medicina",
                                    y: 305
                                }, {
                                    name: "Psicologia",
                                    y: 305
                                }, {
                                    name: "Veterinaria",
                                    y: 305
                                }]
                        }]
                });
            });
        });
        $(function () {

            $(document).ready(function () {

                // Build the chart
                $('#grafico3').highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: ''
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
                                    name: "Biomedicina",
                                    y: 341
                                }, {
                                    name: "Ciências Biológicas",
                                    y: 361
                                }, {
                                    name: "Educação Física",
                                    y: 305
                                }, {
                                    name: "Enfermagem",
                                    y: 305
                                }, {
                                    name: "Estética e cosmética",
                                    y: 305
                                }, {
                                    name: "Farmácia",
                                    y: 305
                                }, {
                                    name: "Fisioterapia",
                                    y: 305
                                }, {
                                    name: "Fonoaudioterapia",
                                    y: 305
                                }, {
                                    name: "Medicina",
                                    y: 305
                                }, {
                                    name: "Psicologia",
                                    y: 305
                                }, {
                                    name: "Veterinaria",
                                    y: 305
                                }]
                        }]
                });
            });
        });
    };

    $scope.permanencia = function () {
//        apagaTabela();
        
        $(function () {

            $(document).ready(function () {

                // Build the chart
                $('#grafico1').highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: ''
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
                                    name: "APRENDIZAGEM (dificuldade no processo ensino-aprendizagem)",
                                    y: 41
                                }, {
                                    name: "DISTÂNCIA (distância entre Insituição de Ensino e casa)",
                                    y: 57
                                }, {
                                    name: "DOENÇA (pessoal ou familiar)",
                                    y: 59
                                }, {
                                    name: "FINANCEIRO (FIES, CREDIN, PROUNE E PROMUBE)",
                                    y: 59
                                }, {
                                    name: "FREQUÊNCIA (igual ou maior que 5 faltas)",
                                    y: 59
                                }, {
                                    name: "GRAVIDEZ (afastamento dos estudos para gestação)",
                                    y: 59
                                }, {
                                    name: "MUDANÇA DE CIDADE (por trabalho ou pessoal)",
                                    y: 59
                                }, {
                                    name: "NÃO IDENTIFICAÇÃO COM O CURSO ",
                                    y: 59
                                }, {
                                    name: "NOTAS BAIXAS (abaixo da média 6,0)",
                                    y: 59
                                }, {
                                    name: "TRABALHO (dificuldade em conciliar estudos com o trabalho)",
                                    y: 59
                                }, {
                                    name: "TRANSFERÊNCIA PARA OUTRA IES (privada ou pública)",
                                    y: 59
                                }]
                        }]
                });
            });
        });
    };

    $scope.resumoMotivo = function () {
//        apagaTabela();
        
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