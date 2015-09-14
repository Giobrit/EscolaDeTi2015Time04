AppModule.controller("controllerRelatorioResumido", controllerRelatorioResumido);
AppModule.controller("controllerRelatorioPorCentro", controllerRelatorioPorCentro);

function controllerRelatorioResumido($scope, $http) {

    $scope.init = function () {

        $scope.buscarRelatorioResumoCursoAtendimentos();
        $scope.buscarRelatorioResumoMotivo();
//        $scope.buscarRelatorioMotivos();
    };

    $scope.buscarRelatorioResumoCursoAtendimentos = function () {
        $http.get("/relatorio/resumo/relatorioResumoCursoAtendimentos").success(onSucess).error(onError);

        function onSucess(data) {
            $scope.armazenarDadosRelatorioResumoCursoAtendimentos(data);
        }
    };

    $scope.buscarRelatorioResumoMotivo = function () {
        $http.get("/relatorio/resumo/relatorioResumoMotivo").success(onSucess).error(onError);
        function onSucess(data) {
            $scope.armazenarDadosRelatorioResumoMotivo(data);
        }
    };

    $scope.buscarRelatorioMotivos = function () {
        $http.get("/relatorio/resumo/relatorioMotivos").success(onSucess).error(onError);
        function onSucess(data) {
            $scope.armazenarDadosRelatorioMotivos(data);
        }
    };

    $scope.armazenarDadosRelatorioResumoCursoAtendimentos = function (data) {

        $scope.qtdeAtendimentoCETA = 0;
        $scope.qtdeAtendimentoCBS = 0;
        $scope.qtdeAtendimentoCHSA = 0;
        $scope.totalAtendimentos = 0;

        $scope.qtdePermanenciasCETA = 0;
        $scope.qtdePermanenciasCBS = 0;
        $scope.qtdePermanenciasCHSA = 0;
        $scope.totalPermanencias = 0;

        $scope.qtdeTrancamentosCancelamentosTransferenciasCETA = 0;
        $scope.qtdeTrancamentosCancelamentosTransferenciasCBS = 0;
        $scope.qtdeTrancamentosCancelamentosTransferenciasCHSA = 0;
        $scope.totalTrancamentosCancelamentosTransferencias = 0;

        //Atendimentos
        var contador = 0;
        for (contador = 0; contador < data.atendimentos.length; contador++) {
            switch (data.atendimentos[contador].centro) {
                case "CETA" :
                {
                    $scope.qtdeAtendimentoCETA = data.atendimentos[contador].atendimentos;
                    break;
                }
                case "CBS" :
                {
                    $scope.qtdeAtendimentoCBS = data.atendimentos[contador].atendimentos;
                    break;
                }
                case "CHSA" :
                {
                    $scope.qtdeAtendimentoCHSA = data.atendimentos[contador].atendimentos;
                    break;
                }
            }
            $scope.totalAtendimentos += data.atendimentos[contador].atendimentos;
        }

        //Permanencias
        for (contador = 0; contador < data.permanencias.length; contador++) {
            switch (data.permanencias[contador].centro) {
                case "CETA" :
                {
                    $scope.qtdePermanenciasCETA = data.permanencias[contador].permanencias;
                    break;
                }
                case "CBS" :
                {
                    $scope.qtdePermanenciasCBS = data.permanencias[contador].permanencias;
                    break;
                }
                case "CHSA" :
                {
                    $scope.qtdePermanenciasCHSA = data.permanencias[contador].permanencias;
                    break;
                }
            }
            $scope.totalPermanencias += data.permanencias[contador].permanencias;
        }

        //Trancamentos - Cancelamentos - Transferencias
        for (contador = 0; contador < data.trancamentosCancelamentosTransferencias.length; contador++) {
            switch (data.trancamentosCancelamentosTransferencias[contador].centro) {
                case "CETA" :
                {
                    $scope.qtdeTrancamentosCancelamentosTransferenciasCETA = data.trancamentosCancelamentosTransferencias[contador].trancamentoscancelamentostransferencias;
                    break;
                }
                case "CBS" :
                {
                    $scope.qtdeTrancamentosCancelamentosTransferenciasCBS = data.trancamentosCancelamentosTransferencias[contador].trancamentoscancelamentostransferencias;
                    break;
                }
                case "CHSA" :
                {
                    $scope.qtdeTrancamentosCancelamentosTransferenciasCHSA = data.trancamentosCancelamentosTransferencias[contador].trancamentoscancelamentostransferencias;
                    break;
                }
            }
            $scope.totalTrancamentosCancelamentosTransferencias += data.trancamentosCancelamentosTransferencias[contador].trancamentoscancelamentostransferencias;
        }

        $scope.gerarRelatorioResumoCursoAtendimentos();
    };

    $scope.gerarRelatorioResumoCursoAtendimentos = function () {
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
                            ['CBS - Saúde', $scope.qtdeAtendimentoCBS],
                            ['CETA - Exatas', $scope.qtdeAtendimentoCETA],
                            ['CHSA - Humanas', $scope.qtdeAtendimentoCHSA]
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
                                    y: $scope.qtdeTrancamentosCancelamentosTransferenciasCBS
                                }, {
                                    name: "CETA - Exatas",
                                    y: $scope.qtdeTrancamentosCancelamentosTransferenciasCETA
                                }, {
                                    name: "CHSA - Humanas",
                                    y: $scope.qtdeTrancamentosCancelamentosTransferenciasCHSA
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
                                    y: $scope.qtdePermanenciasCBS
                                }, {
                                    name: "CETA - Exatas",
                                    y: $scope.qtdePermanenciasCETA
                                }, {
                                    name: "CHSA - Humanas",
                                    y: $scope.qtdePermanenciasCHSA
                                }]
                        }]
                });
            });
        });
    };

    $scope.armazenarDadosRelatorioResumoMotivo = function (data) {
        $scope.relatorioResumoMotivo = data;
        console.log($scope.relatorioResumoMotivo);        

        $scope.gerarRelatorioResumoMotivo($scope.relatorioResumoMotivo);
    };

    $scope.gerarRelatorioResumoMotivo = function (relatorioResumoMotivo) {
        
        var qtdeAprendizagemResumoMotivo = 0;
        var qtdeGravidezResumoMotivo = 0;
        var qtdeNotasBaixasResumoMotivo = 0;
        var qtdeOutrosResumoMotivo = 0;
        var qtdeDistanciaResumoMotivo = 0;
        var qtdeDoencaResumoMotivo = 0;
        var qtdeFinanceiroResumoMotivo = 0;
        var qtdeMudancaDeCidadeResumoMotivo = 0;
        var qtdeNaoIndentificacaoComOCursoResumoMotivo = 0;
        var qtdeTrabalhoResumoMotivo = 0;
        var qtdeTransferenciaResumoMotivo = 0;
        var qtdeFrequenciaResumoMotivo = 0;
        
        for (var contador = 0; contador < relatorioResumoMotivo.resumoMotivos.length; contador++) {
            switch (relatorioResumoMotivo.resumoMotivos[contador].motivo) {
                case "Aprendizagem" :
                {
                    qtdeAprendizagemResumoMotivo = relatorioResumoMotivo.resumoMotivos[contador].atendimentos;
                    break;
                }
                case "Gravidez" :
                {
                    qtdeGravidezResumoMotivo = relatorioResumoMotivo.resumoMotivos[contador].atendimentos;
                    break;
                }
                case "Notas baixas" :
                {
                    qtdeNotasBaixasResumoMotivo = relatorioResumoMotivo.resumoMotivos[contador].atendimentos;
                    break;
                }
                case "Outros" :
                {
                    qtdeOutrosResumoMotivo = relatorioResumoMotivo.resumoMotivos[contador].atendimentos;
                    break;
                }
                case "Distância" :
                {
                    qtdeDistanciaResumoMotivo = relatorioResumoMotivo.resumoMotivos[contador].atendimentos;
                    break;
                }
                case "Doença" :
                {
                    qtdeDoencaResumoMotivo = relatorioResumoMotivo.resumoMotivos[contador].atendimentos;
                    break;
                }
                case "Financeiro" :
                {
                    qtdeFinanceiroResumoMotivo = relatorioResumoMotivo.resumoMotivos[contador].atendimentos;
                    break;
                }
                case "Mudança de Cidade" :
                {
                    qtdeMudancaDeCidadeResumoMotivo = relatorioResumoMotivo.resumoMotivos[contador].atendimentos;
                    break;
                }
                case "Não Identificação com o Curso" :
                {
                    qtdeNaoIndentificacaoComOCursoResumoMotivo = relatorioResumoMotivo.resumoMotivos[contador].atendimentos;
                    break;
                }
                case "Trabalho" :
                {
                    qtdeTrabalhoResumoMotivo = relatorioResumoMotivo.resumoMotivos[contador].atendimentos;
                    break;
                }
                case "Transferência para outra IES" :
                {
                    qtdeTransferenciaResumoMotivo = relatorioResumoMotivo.resumoMotivos[contador].atendimentos;
                    break;
                }
                case "Frequência baixa" :
                {
                    qtdeFrequenciaResumoMotivo = relatorioResumoMotivo.resumoMotivos[contador].atendimentos;
                    break;
                }
            }
        }
        
        console.log(qtdeAprendizagemResumoMotivo +","+
        qtdeGravidezResumoMotivo +","+
        qtdeNotasBaixasResumoMotivo +","+
        qtdeOutrosResumoMotivo +","+
        qtdeDistanciaResumoMotivo +","+
        qtdeDoencaResumoMotivo +","+
        qtdeFinanceiroResumoMotivo +","+
        qtdeMudancaDeCidadeResumoMotivo +","+
        qtdeNaoIndentificacaoComOCursoResumoMotivo +","+
        qtdeTrabalhoResumoMotivo +","+
        qtdeTransferenciaResumoMotivo +","+
        qtdeFrequenciaResumoMotivo);
        
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
                                    y: qtdeAprendizagemResumoMotivo
                                }, {
                                    name: "Distância",
                                    y: qtdeDistanciaResumoMotivo
                                },
                                {
                                    name: "Doença",
                                    y: qtdeDoencaResumoMotivo
                                },
                                {
                                    name: "Financeiro",
                                    y: qtdeFinanceiroResumoMotivo
                                },
                                {
                                    name: "Frequência",
                                    y: qtdeFrequenciaResumoMotivo
                                },
                                {
                                    name: "Gravidez",
                                    y: qtdeGravidezResumoMotivo
                                },
                                {
                                    name: "Mudança de cidade",
                                    y: qtdeMudancaDeCidadeResumoMotivo
                                },
                                {
                                    name: "Não indentificação com o curso",
                                    y: qtdeNaoIndentificacaoComOCursoResumoMotivo
                                },
                                {
                                    name: "Notas baixas",
                                    y: qtdeNotasBaixasResumoMotivo
                                },
                                {
                                    name: "Outros",
                                    y: qtdeOutrosResumoMotivo
                                },
                                {
                                    name: "Trabalho",
                                    y: qtdeTrabalhoResumoMotivo
                                }, {
                                    name: "Transferencia para outra instituição",
                                    y: qtdeTransferenciaResumoMotivo
                                }]
                        }]
                });
            });
        });
    };

    $scope.armazenarDadosRelatorioMotivos = function (data) {
        var qtdeMotivos = [];
        for (var contador = 0; contador < data.motivos.length; contador++) {
            qtdeMotivos[contador] = data.motivos[contador].atendimentos;
        }
        console.log("2-" + qtdeMotivos[0]);
        $scope.gerarRelatorioMotivo(qtdeMotivos);
    };

    $scope.gerarRelatorioMotivo = function (qtdeMotivos) {
        $scope.qtdeAprendizagem = qtdeMotivos[1];
        $scope.qtdeDistancia = qtdeMotivos[5];
        $scope.qtdeDoenca = qtdeMotivos[6];
        $scope.qtdeFinanceiro = qtdeMotivos[7];
        $scope.qtdeFrequencia = qtdeMotivos[17];
        $scope.qtdeGravidez = qtdeMotivos[2];
        $scope.qtdeMudancaDeCidade = qtdeMotivos[8];
        $scope.qtdeNaoIndentificacaoComOCurso = qtdeMotivos[9];
        $scope.qtdeNotasBaixas = qtdeMotivos[3];
        $scope.qtdeOutros = qtdeMotivos[4];
        $scope.qtdeTrabalho = qtdeMotivos[10];
        $scope.qtdeTransferencia = qtdeMotivos[11];

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
                                    y: $scope.qtdeAprendizagem
                                }, {
                                    name: "Distância",
                                    y: $scope.qtdeDistancia
                                },
                                {
                                    name: "Doença",
                                    y: $scope.qtdeDoenca
                                },
                                {
                                    name: "Financeiro",
                                    y: $scope.qtdeFinanceiro
                                },
                                {
                                    name: "Frequência",
                                    y: $scope.qtdeFrequencia
                                },
                                {
                                    name: "Gravidez",
                                    y: $scope.qtdeGravidez
                                },
                                {
                                    name: "Mudança de cidade",
                                    y: $scope.qtdeMudancaDeCidade
                                },
                                {
                                    name: "Não indentificação com o curso",
                                    y: $scope.qtdeNaoIndentificacaoComOCurso
                                },
                                {
                                    name: "Notas baixas",
                                    y: $scope.qtdeNotasBaixas
                                },
                                {
                                    name: "Outros",
                                    y: $scope.qtdeOutros
                                },
                                {
                                    name: "Trabalho",
                                    y: $scope.qtdeTrabalho
                                }, {
                                    name: "Transferencia para outra instituição",
                                    y: $scope.qtdeTransferencia
                                }]
                        }]
                });
            });
        });
    };

    function onError() {
        //Mensagem de erro
    }
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

    function limpaGraficos() {
        document.getElementById('tabela').innerHTML = "";
        document.getElementById('grafico1').innerHTML = "";
        document.getElementById('grafico2').innerHTML = "";
        document.getElementById('grafico3').innerHTML = "";
    }

    function criarTabela(tipo) {
        var html = "";
        switch (tipo) {
            case "relatorioGeral":
                {
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
                }
                break;
            case "relatorioPermanencia" :
            {
                {
                    html += '<table class="table table-hover table-bordered">' +
                            '<thead> ' +
                            '</thead>' +
                            '<tbody>' +
                            '    <tr>' +
                            '        <td rowspan="13" style="padding-top: 270px;"><b>Motivo</b></td>' +
                            '        <td><b>Justificativa apresentadas na solicitação</b></td>' +
                            '        <td><b>Quantidade</b></td>' +
                            '    </tr>' +
                            '    <tr>' +
                            '        <td>APRENDIZAGEM (dificuldade no processo ensino-aprendizagem)</td>' +
                            '        <td style="text-align: center">7</td>' +
                            '    </tr>' +
                            '    <tr>' +
                            '        <td>DISTÂNCIA (distância entre Insituição de Ensino e casa)</td>' +
                            '        <td style="text-align: center">14</td>' +
                            '    </tr>' +
                            '    <tr>' +
                            '        <td>DOENÇA (pessoal ou familiar)</td>' +
                            '        <td style="text-align: center">25</td>' +
                            '    </tr>' +
                            '    <tr>' +
                            '        <td>FINANCEIRO (FIES, CREDIN, PROUNE E PROMUBE)</td>' +
                            '        <td style="text-align: center">286</td>' +
                            '    </tr>' +
                            '    <tr>' +
                            '        <td>FREQUÊNCIA (igual ou maior que 5 faltas)</td>' +
                            '        <td style="text-align: center">1</td>' +
                            '    </tr>' +
                            '    <tr>' +
                            '        <td>GRAVIDEZ (afastamento dos estudos para gestação)</td>' +
                            '        <td style="text-align: center">7</td>' +
                            '    </tr>' +
                            '    <tr>' +
                            '        <td>MUDANÇA DE CIDADE (por trabalho ou pessoal)</td>' +
                            '        <td style="text-align: center">127</td>' +
                            '    </tr>' +
                            '    <tr>' +
                            '        <td>NÃO IDENTIFICAÇÃO COM O CURSO </td>' +
                            '        <td style="text-align: center">76</td>' +
                            '    </tr>' +
                            '    <tr>' +
                            '        <td>NOTAS BAIXAS (abaixo da média 6,0) </td>' +
                            '        <td style="text-align: center">11</td>' +
                            '    </tr>' +
                            '    <tr>' +
                            '        <td>OUTROS (familiares ou pessoais) - mencionar motivo </td>' +
                            '        <td style="text-align: center">177</td>' +
                            '    </tr>' +
                            '    <tr>' +
                            '        <td>TRABALHO (dificuldade em conciliar estudos com o trabalho) </td>' +
                            '        <td style="text-align: center">64</td>' +
                            '    </tr>' +
                            '    <tr>' +
                            '        <td>TRANSFERÊNCIA PARA OUTRA IES (privada ou pública)</td>' +
                            '        <td style="text-align: center">213</td>' +
                            '    </tr>' +
                            '</tbody>' +
                            '<tfoot>' +
                            '    <tr>' +
                            '        <td colspan="2" style="text-align: center"><b>TOTAL</b></td>' +
                            '        <td style="text-align: center"><b>1007</b></td>' +
                            '    </tr>' +
                            '</tfoot>' +
                            '</table>';
                }
                break;
            }
            case  "relatorioMotivo" :
            {
                {
                    html += '<table class="table table-hover table-bordered">' +
                            '<thead> ' +
                            '</thead>' +
                            '<tbody>' +
                            '    <tr>' +
                            '        <td rowspan="13" style="padding-top: 270px;"><b>Motivo</b></td>' +
                            '        <td><b>Justificativa apresentadas na solicitação</b></td>' +
                            '        <td><b>Quantidade</b></td>' +
                            '    </tr>' +
                            '    <tr>' +
                            '        <td>APRENDIZAGEM (dificuldade no processo ensino-aprendizagem)</td>' +
                            '        <td style="text-align: center">7</td>' +
                            '    </tr>' +
                            '    <tr>' +
                            '        <td>DISTÂNCIA (distância entre Insituição de Ensino e casa)</td>' +
                            '        <td style="text-align: center">14</td>' +
                            '    </tr>' +
                            '    <tr>' +
                            '        <td>DOENÇA (pessoal ou familiar)</td>' +
                            '        <td style="text-align: center">25</td>' +
                            '    </tr>' +
                            '    <tr>' +
                            '        <td>FINANCEIRO (FIES, CREDIN, PROUNE E PROMUBE)</td>' +
                            '        <td style="text-align: center">286</td>' +
                            '    </tr>' +
                            '    <tr>' +
                            '        <td>FREQUÊNCIA (igual ou maior que 5 faltas)</td>' +
                            '        <td style="text-align: center">1</td>' +
                            '    </tr>' +
                            '    <tr>' +
                            '        <td>GRAVIDEZ (afastamento dos estudos para gestação)</td>' +
                            '        <td style="text-align: center">7</td>' +
                            '    </tr>' +
                            '    <tr>' +
                            '        <td>MUDANÇA DE CIDADE (por trabalho ou pessoal)</td>' +
                            '        <td style="text-align: center">127</td>' +
                            '    </tr>' +
                            '    <tr>' +
                            '        <td>NÃO IDENTIFICAÇÃO COM O CURSO </td>' +
                            '        <td style="text-align: center">76</td>' +
                            '    </tr>' +
                            '    <tr>' +
                            '        <td>NOTAS BAIXAS (abaixo da média 6,0) </td>' +
                            '        <td style="text-align: center">11</td>' +
                            '    </tr>' +
                            '    <tr>' +
                            '        <td>OUTROS (familiares ou pessoais) - mencionar motivo </td>' +
                            '        <td style="text-align: center">177</td>' +
                            '    </tr>' +
                            '    <tr>' +
                            '        <td>TRABALHO (dificuldade em conciliar estudos com o trabalho) </td>' +
                            '        <td style="text-align: center">64</td>' +
                            '    </tr>' +
                            '    <tr>' +
                            '        <td>TRANSFERÊNCIA PARA OUTRA IES (privada ou pública)</td>' +
                            '        <td style="text-align: center">213</td>' +
                            '    </tr>' +
                            '</tbody>' +
                            '<tfoot>' +
                            '    <tr>' +
                            '        <td colspan="2" style="text-align: center"><b>TOTAL</b></td>' +
                            '        <td style="text-align: center"><b>1007</b></td>' +
                            '    </tr>' +
                            '</tfoot>' +
                            '</table>';
                }
                break;
            }
        }

        document.getElementById('tabela').innerHTML = html;
    }

    $scope.graficoRelatorioGeral = function () {
        limpaGraficos();
        criarTabela("relatorioGeral");

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
                        rotation: -65,
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
                            ['Biomedicina', 382],
                            ['Ciências Biológicas', 418],
                            ['Educação Física', 364],
                            ['Enfermagem', 364],
                            ['Estética e Cosmética', 364],
                            ['Farmácia', 364],
                            ['Fisioterapia', 364],
                            ['Fonoaudiologia', 364],
                            ['Medicina', 364],
                            ['Nutrição', 364],
                            ['Odontologia', 364],
                            ['Psicologia', 364],
                            ['Veterinária', 364]
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
        limpaGraficos();
        criarTabela("relatorioPermanencia");

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
        limpaGraficos();
        criarTabela("relatorioMotivo");

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

}