AppModule.controller("controllerRelatorioResumido", controllerRelatorioResumido);
AppModule.controller("controllerRelatorioPorCentro", controllerRelatorioPorCentro);

function controllerRelatorioResumido($scope, $http, $routeParams, $location, growl) {

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
                    credits:{
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
                    credits:{
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
                    credits:{
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
                                },{
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
                    credits:{
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
                                },{
                                    name: "Transferencia para outra instituição",
                                    y: 4
                                }]
                        }]
                });
            });
        });
    };

}
function controllerRelatorioPorCentro($scope, $http, $growl) {


}