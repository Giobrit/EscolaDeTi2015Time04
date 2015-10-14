AppModule.controller("controllerRelatorioResumido", controllerRelatorioResumido);
AppModule.controller("controllerRelatorioPorCentro", controllerRelatorioPorCentro);

function controllerRelatorioResumido($scope, $http, growl) {

    $scope.init = function () {
        document.getElementById('tabela1').innerHTML = "";
        document.getElementById('tabela2').innerHTML = "";
        document.getElementById('tabela3').innerHTML = "";
        $scope.buscarRelatorioResumoCursoAtendimentos();
        $scope.buscarRelatorioMotivos();
        $scope.buscarRelatorioResumoMotivo();
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

        $scope.atendimentos = data.atendimentos;
        $scope.permanencias = data.permanencias;
        $scope.trancamentosCancelamentosTransferencias = data.trancamentosCancelamentosTransferencias;

        $scope.gerarRelatorioResumoCursoAtendimentos($scope.atendimentos, $scope.permanencias, $scope.trancamentosCancelamentosTransferencias);
    };

    $scope.gerarRelatorioResumoCursoAtendimentos = function (atendimentos, permanencias, trancamentosCancelamentosTransferencias) {

        var qtdeAtendimentoCETA = 0;
        var qtdeAtendimentoCBS = 0;
        var qtdeAtendimentoCHSA = 0;
        var totalAtendimentos = 0;

        var qtdePermanenciasCETA = 0;
        var qtdePermanenciasCBS = 0;
        var qtdePermanenciasCHSA = 0;
        var totalPermanencias = 0;

        var qtdeTrancamentosCancelamentosTransferenciasCETA = 0;
        var qtdeTrancamentosCancelamentosTransferenciasCBS = 0;
        var qtdeTrancamentosCancelamentosTransferenciasCHSA = 0;
        var totalTrancamentosCancelamentosTransferencias = 0;

        //Atendimentos
        for (var contador = 0; contador < atendimentos.length; contador++) {
            switch (atendimentos[contador].centro) {
                case "CETA" :
                {
                    qtdeAtendimentoCETA = atendimentos[contador].atendimentos;
                    break;
                }
                case "CBS" :
                {
                    qtdeAtendimentoCBS = atendimentos[contador].atendimentos;
                    break;
                }
                case "CHSA" :
                {
                    qtdeAtendimentoCHSA = atendimentos[contador].atendimentos;
                    break;
                }
            }
            totalAtendimentos += atendimentos[contador].atendimentos;
        }

        //Permanencias
        for (var contador = 0; contador < permanencias.length; contador++) {
            switch (permanencias[contador].centro) {
                case "CETA" :
                {
                    qtdePermanenciasCETA = permanencias[contador].permanencias;
                    break;
                }
                case "CBS" :
                {
                    qtdePermanenciasCBS = permanencias[contador].permanencias;
                    break;
                }
                case "CHSA" :
                {
                    qtdePermanenciasCHSA = permanencias[contador].permanencias;
                    break;
                }
            }
            totalPermanencias += permanencias[contador].permanencias;
        }

        //Trancamentos - Cancelamentos - Transferencias
        for (var contador = 0; contador < trancamentosCancelamentosTransferencias.length; contador++) {
            switch (trancamentosCancelamentosTransferencias[contador].centro) {
                case "CETA" :
                {
                    qtdeTrancamentosCancelamentosTransferenciasCETA = trancamentosCancelamentosTransferencias[contador].trancamentoscancelamentostransferencias;
                    break;
                }
                case "CBS" :
                {
                    qtdeTrancamentosCancelamentosTransferenciasCBS = trancamentosCancelamentosTransferencias[contador].trancamentoscancelamentostransferencias;
                    break;
                }
                case "CHSA" :
                {
                    qtdeTrancamentosCancelamentosTransferenciasCHSA = trancamentosCancelamentosTransferencias[contador].trancamentoscancelamentostransferencias;
                    break;
                }
            }
            totalTrancamentosCancelamentosTransferencias += trancamentosCancelamentosTransferencias[contador].trancamentoscancelamentostransferencias;
        }

        var percentualCBS = ((qtdeTrancamentosCancelamentosTransferenciasCBS * 100) / qtdeAtendimentoCBS) || 0;
        var percentualCETA = ((qtdeTrancamentosCancelamentosTransferenciasCETA * 100) / qtdeAtendimentoCETA) || 0;
        var percentualCHSA = ((qtdeTrancamentosCancelamentosTransferenciasCHSA * 100) / qtdeAtendimentoCHSA) || 0;
        var percentualPermanenciasCBS = ((qtdePermanenciasCBS * 100) / qtdeAtendimentoCBS) || 0;
        var percentualPermanenciasCETA = ((qtdePermanenciasCETA * 100) / qtdeAtendimentoCETA) || 0;
        var percentualPermanenciasCHSA = ((qtdePermanenciasCHSA * 100) / qtdeAtendimentoCHSA) || 0;

        var totalPercentual = ((totalTrancamentosCancelamentosTransferencias * 100) / totalAtendimentos) || 0;
        var totalPermanenciasPercentual = ((totalPermanencias * 100) / totalAtendimentos) || 0;

        //CRIAR TABELA1
        var htmlTagTable = '<table id="tabela1" class="table table-hover table-bordered">';
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

        document.getElementById('tabela1').innerHTML = htmlTagTable + htmlTHead + htmlTBody + htmlTagFoot + htmlTagFechaTable;

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

    $scope.armazenarDadosRelatorioResumoMotivo = function (data) {
        $scope.relatorioResumoMotivo = data;

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

        //CRIAR TABELA3
        var total = qtdeAprendizagemResumoMotivo +
                qtdeGravidezResumoMotivo +
                qtdeNotasBaixasResumoMotivo +
                qtdeOutrosResumoMotivo +
                qtdeDistanciaResumoMotivo +
                qtdeDoencaResumoMotivo +
                qtdeFinanceiroResumoMotivo +
                qtdeMudancaDeCidadeResumoMotivo +
                qtdeNaoIndentificacaoComOCursoResumoMotivo +
                qtdeTrabalhoResumoMotivo +
                qtdeTransferenciaResumoMotivo +
                qtdeFrequenciaResumoMotivo;

        var htmlTagTableTabela3 = '<table class="table table-hover table-bordered">';
        var htmlTHeadTabela3 = '<thead>' +
                '</thead>';
        var htmlTBodyTabela3 = '<tbody>' +
                '   <tr>' +
                '      <td rowspan="13" style="padding-top: 270px;"><b>Motivo</b></td>' +
                '      <td><b>Justificativa apresentadas na solicitação</b></td>' +
                '      <td><b>Quantidade</b></td>' +
                '   </tr>' +
                '   <tr>' +
                '      <td>APRENDIZAGEM (dificuldade no processo ensino-aprendizagem)</td>' +
                '      <td style="text-align: center">' + qtdeAprendizagemResumoMotivo + '</td>' +
                '   </tr>' +
                '   <tr>' +
                '       <td>DISTÂNCIA (distância entre Insituição de Ensino e casa)</td>' +
                '       <td style="text-align: center">' + qtdeDistanciaResumoMotivo + '</td>' +
                '   </tr>' +
                '   <tr>' +
                '       <td>DOENÇA (pessoal ou familiar)</td>' +
                '       <td style="text-align: center">' + qtdeDoencaResumoMotivo + '</td>' +
                '   </tr>' +
                '   <tr>' +
                '       <td>FINANCEIRO (FIES, CREDIN, PROUNE E PROMUBE)</td>' +
                '       <td style="text-align: center">' + qtdeFinanceiroResumoMotivo + '</td>' +
                '   </tr>' +
                '   <tr>' +
                '       <td>FREQUÊNCIA (igual ou maior que 5 faltas)</td>' +
                '       <td style="text-align: center">' + qtdeFrequenciaResumoMotivo + '</td>' +
                '   </tr>' +
                '   <tr>' +
                '       <td>GRAVIDEZ (afastamento dos estudos para gestação)</td>' +
                '       <td style="text-align: center">' + qtdeGravidezResumoMotivo + '</td>' +
                '   </tr>' +
                '   <tr>' +
                '       <td>MUDANÇA DE CIDADE (por trabalho ou pessoal)</td>' +
                '       <td style="text-align: center">' + qtdeMudancaDeCidadeResumoMotivo + '</td>' +
                '   </tr>' +
                '   <tr>' +
                '       <td>NÃO IDENTIFICAÇÃO COM O CURSO </td>' +
                '       <td style="text-align: center">' + qtdeNaoIndentificacaoComOCursoResumoMotivo + '</td>' +
                '   </tr>' +
                '   <tr>' +
                '       <td>NOTAS BAIXAS (abaixo da média 6,0) </td>' +
                '       <td style="text-align: center">' + qtdeNotasBaixasResumoMotivo + '</td>' +
                '   </tr>' +
                '   <tr>' +
                '      <td>OUTROS (familiares ou pessoais) - mencionar motivo </td>' +
                '       <td style="text-align: center">' + qtdeOutrosResumoMotivo + '</td>' +
                '   </tr>' +
                '   <tr>' +
                '       <td>TRABALHO (dificuldade em conciliar estudos com o trabalho) </td>' +
                '       <td style="text-align: center">' + qtdeTrabalhoResumoMotivo + '</td>' +
                '   </tr>' +
                '   <tr>' +
                '       <td>TRANSFERÊNCIA PARA OUTRA IES (privada ou pública)</td>' +
                '       <td style="text-align: center">' + qtdeTransferenciaResumoMotivo + '</td>' +
                '   </tr>' +
                '</tbody>';
        var htmlTFootTabela3 = '<tfoot>' +
                '   <tr>' +
                '       <td colspan="2" style="text-align: center"><b>TOTAL</b></td>' +
                '       <td style="text-align: center"><b>' + total + '</b></td>' +
                '   </tr>' +
                '</tfoot>';
        var htmlTagTableFechaTabela3 = '</table>';

        document.getElementById('tabela3').innerHTML = htmlTagTableTabela3 + htmlTHeadTabela3 + htmlTBodyTabela3 + htmlTFootTabela3 + htmlTagTableFechaTabela3;

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
        $scope.relatorioMotivos = data;

        $scope.gerarRelatorioMotivo($scope.relatorioMotivos);
    };

    $scope.gerarRelatorioMotivo = function (relatorioMotivos) {

        var qtdeAprendizagemMotivo = 0;
        var qtdeGravidezMotivo = 0;
        var qtdeNotasBaixasMotivo = 0;
        var qtdeOutrosMotivo = 0;
        var qtdeDistanciaMotivo = 0;
        var qtdeDoencaMotivo = 0;
        var qtdeFinanceiroMotivo = 0;
        var qtdeMudancaDeCidadeMotivo = 0;
        var qtdeNaoIndentificacaoComOCursoMotivo = 0;
        var qtdeTrabalhoMotivo = 0;
        var qtdeTransferenciaMotivo = 0;
        var qtdeFrequenciaMotivo = 0;

        for (var contador = 0; contador < relatorioMotivos.motivos.length; contador++) {
            switch (relatorioMotivos.motivos[contador].motivo) {
                case "Aprendizagem" :
                {
                    qtdeAprendizagemMotivo = relatorioMotivos.motivos[contador].atendimentos;
                    break;
                }
                case "Gravidez" :
                {
                    qtdeGravidezMotivo = relatorioMotivos.motivos[contador].atendimentos;
                    break;
                }
                case "Notas baixas" :
                {
                    qtdeNotasBaixasMotivo = relatorioMotivos.motivos[contador].atendimentos;
                    break;
                }
                case "Outros" :
                {
                    qtdeOutrosMotivo = relatorioMotivos.motivos[contador].atendimentos;
                    break;
                }
                case "Distância" :
                {
                    qtdeDistanciaMotivo = relatorioMotivos.motivos[contador].atendimentos;
                    break;
                }
                case "Doença" :
                {
                    qtdeDoencaMotivo = relatorioMotivos.motivos[contador].atendimentos;
                    break;
                }
                case "Financeiro" :
                {
                    qtdeFinanceiroMotivo = relatorioMotivos.motivos[contador].atendimentos;
                    break;
                }
                case "Mudança de Cidade" :
                {
                    qtdeMudancaDeCidadeMotivo = relatorioMotivos.motivos[contador].atendimentos;
                    break;
                }
                case "Não Identificação com o Curso" :
                {
                    qtdeNaoIndentificacaoComOCursoMotivo = relatorioMotivos.motivos[contador].atendimentos;
                    break;
                }
                case "Trabalho" :
                {
                    qtdeTrabalhoMotivo = relatorioMotivos.motivos[contador].atendimentos;
                    break;
                }
                case "Transferência para outra IES" :
                {
                    qtdeTransferenciaMotivo = relatorioMotivos.motivos[contador].atendimentos;
                    break;
                }
                case "Frequência baixa" :
                {
                    qtdeFrequenciaMotivo = relatorioMotivos.motivos[contador].atendimentos;
                    break;
                }
            }
        }

        //CRIAR TABELA2
        var total = qtdeAprendizagemMotivo +
                qtdeGravidezMotivo +
                qtdeNotasBaixasMotivo +
                qtdeOutrosMotivo +
                qtdeDistanciaMotivo +
                qtdeDoencaMotivo +
                qtdeFinanceiroMotivo +
                qtdeMudancaDeCidadeMotivo +
                qtdeNaoIndentificacaoComOCursoMotivo +
                qtdeTrabalhoMotivo +
                qtdeTransferenciaMotivo +
                qtdeFrequenciaMotivo;

        var htmlTagTableTabela2 = '<table class="table table-hover table-bordered">';
        var htmlTHeadTabela2 = '<thead>' +
                '</thead>';
        var htmlTBodyTabela2 = '<tbody>' +
                '   <tr>' +
                '      <td rowspan="13" style="padding-top: 270px;"><b>Motivo</b></td>' +
                '      <td><b>Justificativa apresentadas na solicitação</b></td>' +
                '      <td><b>Quantidade</b></td>' +
                '   </tr>' +
                '   <tr>' +
                '      <td>APRENDIZAGEM (dificuldade no processo ensino-aprendizagem)</td>' +
                '      <td style="text-align: center">' + qtdeAprendizagemMotivo + '</td>' +
                '   </tr>' +
                '   <tr>' +
                '       <td>DISTÂNCIA (distância entre Insituição de Ensino e casa)</td>' +
                '       <td style="text-align: center">' + qtdeDistanciaMotivo + '</td>' +
                '   </tr>' +
                '   <tr>' +
                '       <td>DOENÇA (pessoal ou familiar)</td>' +
                '       <td style="text-align: center">' + qtdeDoencaMotivo + '</td>' +
                '   </tr>' +
                '   <tr>' +
                '       <td>FINANCEIRO (FIES, CREDIN, PROUNE E PROMUBE)</td>' +
                '       <td style="text-align: center">' + qtdeFinanceiroMotivo + '</td>' +
                '   </tr>' +
                '   <tr>' +
                '       <td>FREQUÊNCIA (igual ou maior que 5 faltas)</td>' +
                '       <td style="text-align: center">' + qtdeFrequenciaMotivo + '</td>' +
                '   </tr>' +
                '   <tr>' +
                '       <td>GRAVIDEZ (afastamento dos estudos para gestação)</td>' +
                '       <td style="text-align: center">' + qtdeGravidezMotivo + '</td>' +
                '   </tr>' +
                '   <tr>' +
                '       <td>MUDANÇA DE CIDADE (por trabalho ou pessoal)</td>' +
                '       <td style="text-align: center">' + qtdeMudancaDeCidadeMotivo + '</td>' +
                '   </tr>' +
                '   <tr>' +
                '       <td>NÃO IDENTIFICAÇÃO COM O CURSO </td>' +
                '       <td style="text-align: center">' + qtdeNaoIndentificacaoComOCursoMotivo + '</td>' +
                '   </tr>' +
                '   <tr>' +
                '       <td>NOTAS BAIXAS (abaixo da média 6,0) </td>' +
                '       <td style="text-align: center">' + qtdeNotasBaixasMotivo + '</td>' +
                '   </tr>' +
                '   <tr>' +
                '      <td>OUTROS (familiares ou pessoais) - mencionar motivo </td>' +
                '       <td style="text-align: center">' + qtdeOutrosMotivo + '</td>' +
                '   </tr>' +
                '   <tr>' +
                '       <td>TRABALHO (dificuldade em conciliar estudos com o trabalho) </td>' +
                '       <td style="text-align: center">' + qtdeTrabalhoMotivo + '</td>' +
                '   </tr>' +
                '   <tr>' +
                '       <td>TRANSFERÊNCIA PARA OUTRA IES (privada ou pública)</td>' +
                '       <td style="text-align: center">' + qtdeTransferenciaMotivo + '</td>' +
                '   </tr>' +
                '</tbody>';
        var htmlTFootTabela2 = '<tfoot>' +
                '   <tr>' +
                '       <td colspan="2" style="text-align: center"><b>TOTAL</b></td>' +
                '       <td style="text-align: center"><b>' + total + '</b></td>' +
                '   </tr>' +
                '</tfoot>';
        var htmlTagTableFechaTabela2 = '</table>';

        document.getElementById('tabela2').innerHTML = htmlTagTableTabela2 + htmlTHeadTabela2 + htmlTBodyTabela2 + htmlTFootTabela2 + htmlTagTableFechaTabela2;

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
                                    y: qtdeAprendizagemMotivo
                                }, {
                                    name: "Distância",
                                    y: qtdeDistanciaMotivo
                                },
                                {
                                    name: "Doença",
                                    y: qtdeDoencaMotivo
                                },
                                {
                                    name: "Financeiro",
                                    y: qtdeFinanceiroMotivo
                                },
                                {
                                    name: "Frequência",
                                    y: qtdeFrequenciaMotivo
                                },
                                {
                                    name: "Gravidez",
                                    y: qtdeGravidezMotivo
                                },
                                {
                                    name: "Mudança de cidade",
                                    y: qtdeMudancaDeCidadeMotivo
                                },
                                {
                                    name: "Não indentificação com o curso",
                                    y: qtdeNaoIndentificacaoComOCursoMotivo
                                },
                                {
                                    name: "Notas baixas",
                                    y: qtdeNotasBaixasMotivo
                                },
                                {
                                    name: "Outros",
                                    y: qtdeOutrosMotivo
                                },
                                {
                                    name: "Trabalho",
                                    y: qtdeTrabalhoMotivo
                                }, {
                                    name: "Transferencia para outra instituição",
                                    y: qtdeTransferenciaMotivo
                                }]
                        }]
                });
            });
        });
    };

    function onError() {
        growl.error("<b>Erro ao carregar relatório</b>");
    }
}

function controllerRelatorioPorCentro($scope, $http, growl) {

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
            {id: 2, descricao: "Relatório de resumo motivos"},
            {id: 3, descricao: "Relatório de motivos por curso"}];

    };

    $scope.getCursosRelatorio = function (centro) {
        $scope.cursos = [];
        switch (centro.id) {
            case 1 ://CBS
            {
                $scope.cursos = [{id: 1, descricao: "Biomedicina"},
                    {id: 2, descricao: "Ciências Biológicas"},
                    {id: 3, descricao: "Educação Física"},
                    {id: 4, descricao: "Enfermagem"},
                    {id: 5, descricao: "Estética e Cosmética"},
                    {id: 6, descricao: "Farmácia"},
                    {id: 7, descricao: "Fisioterapia"},
                    {id: 8, descricao: "Fonoaudiologia"},
                    {id: 9, descricao: "Medicina"},
                    {id: 10, descricao: "Engenharia de Produção"},
                    {id: 11, descricao: "Odontologia"},
                    {id: 12, descricao: "Psicologia"},
                    {id: 13, descricao: "Manutenção de Aeronaves"}];

                break;
            }
            case 2 ://CETA
            {
                $scope.cursos = [{id: 1, descricao: "Agronegócio"},
                    {id: 2, descricao: "Agronomia"},
                    {id: 3, descricao: "Anál. Des.de Sistemas"},
                    {id: 4, descricao: "Arquitetura e Urbanismo"},
                    {id: 5, descricao: "Automação Industrial"},
                    {id: 6, descricao: "Design de Interiores"},
                    {id: 7, descricao: "Eng.Amb.e Sanitária"},
                    {id: 8, descricao: "Engenharia Civil"},
                    {id: 9, descricao: "Eng.Controle e Autom."},
                    {id: 10, descricao: "Engenharia de Produção"},
                    {id: 11, descricao: "Engenharia de Software"},
                    {id: 12, descricao: "Engenharia Elétrica"},
                    {id: 13, descricao: "Manutenção de Aeronaves"},
                    {id: 14, descricao: "Redes de Computadores"},
                    {id: 15, descricao: "Sistemas de Informação"},
                    {id: 16, descricao: "Sistemas para Internet"}];
                break;
            }
            case 3 ://CHSA
            {
                $scope.cursos = [{id: 1, descricao: "Administração"},
                    {id: 2, descricao: "Artes Visuais"},
                    {id: 3, descricao: "Ciências Contábeis"},
                    {id: 4, descricao: "Comercio Exterior"},
                    {id: 5, descricao: "Direito"},
                    {id: 6, descricao: "Gastronomia"},
                    {id: 7, descricao: "Gestão Comercial"},
                    {id: 8, descricao: "Gestão de Recursos Humanos"},
                    {id: 9, descricao: "Jornalismo"},
                    {id: 10, descricao: "Logística"},
                    {id: 11, descricao: "Moda"},
                    {id: 12, descricao: "Música"},
                    {id: 13, descricao: "Pedagogia"},
                    {id: 14, descricao: "Pilotagem Prof. de aeronaves"},
                    {id: 15, descricao: "Publicidade e Propaganda"},
                    {id: 16, descricao: "Serviço Social"},
                    {id: 17, descricao: "Teologia"}];
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
                $scope.cursoSelecionado = "";
                break;
            }
            case 2 ://Relatório de permanencia
            {
                $scope.cursoSelecionado = "";
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
                $http.get("/relatorio/porcentro/relatorioCentroCursoAtendimentos/" + $scope.centroSelecionado.descricao).success(onSuccess1).error(onError);
                function onSuccess1(data) {
                    limpaGraficos();
                    criarTabela("relatorioGeral", data);
                }
                break;
            }
            case 2 ://Relatório Resumo Motivos
            {
                $http.get("/relatorio/porcentro/relatorioCentroResumoMotivos/" + $scope.centroSelecionado.descricao).success(onSuccess2).error(onError);
                function onSuccess2(data) {
                    limpaGraficos();
                    criarTabela("relatorioResumoMotivos", data);
                }
                break;
            }
            case 3 ://Relatório de motivos por curso
            {
                $http.get("/relatorio/porcentro/relatorioCentroMotivosPorCurso/" + $scope.centroSelecionado.descricao + "-" + $scope.cursoSelecionado.descricao).success(onSuccess3).error(onError);
                function onSuccess3(data) {
                    limpaGraficos();                    
                    criarTabela("relatorioMotivosPorCurso", data);
                }
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

    function criarTabela(tipo, relatorio) {
        var html = "";
        switch (tipo) {
            case "relatorioGeral":
            {
                switch ($scope.centroSelecionado.descricao) {
                    case "CBS":
                    {
                        criarHTMLTabelaRelatorioGeral("CBS", relatorio);
                        break;
                    }
                    case "CETA":
                    {
                        criarHTMLTabelaRelatorioGeral("CETA", relatorio);
                        break;
                    }
                    case "CHSA":
                    {
                        criarHTMLTabelaRelatorioGeral("CHSA", relatorio);
                        break;
                    }
                }

                break;
            }
            case "relatorioResumoMotivos" :
            {
                criarHTMLTabelaRelatorioResumoMotivo(relatorio);
                break;
            }
            case  "relatorioMotivosPorCurso" :
            {
                criarHTMLTabelaRelatorioMotivoPorCurso(relatorio);
                break;
            }
        }

        function criarHTMLTabelaRelatorioGeral(centro, relatorio) {            
            var total = 0;
            var totalPermanencias = 0;
            var totalTCT = 0;
            var htmlTCab = '<table class="table table-hover table-bordered">' +
                    '   <thead>' +
                    '       <th>Cursos</th>' +
                    '       <th>Atendimentos</th>' +
                    '       <th colspan="2">Trancamentos/<br>Cancelamentos/<br>Transferencias</th>' +
                    '       <th colspan="2">Permanências</th>' +
                    '   </thead>' +
                    '   <tbody>';

            var htmlTCorpo = "";
            switch (centro) {
                case "CBS":
                {
                    var biomedicina = objectFindByKey(relatorio.atendimentos, 'curso', 'Biomedicina');
                    var cienciasBiologicas = objectFindByKey(relatorio.atendimentos, 'curso', 'Ciências Biológicas');
                    var educacaoFisica = objectFindByKey(relatorio.atendimentos, 'curso', 'Educação Física');
                    var enfermagem = objectFindByKey(relatorio.atendimentos, 'curso', 'Enfermagem');
                    var esteticaCosmetica = objectFindByKey(relatorio.atendimentos, 'curso', 'Estética e Cosmética');
                    var farmacia = objectFindByKey(relatorio.atendimentos, 'curso', 'Farmácia');
                    var fisioterapia = objectFindByKey(relatorio.atendimentos, 'curso', 'Fisioterapia');
                    var fonoaudiologia = objectFindByKey(relatorio.atendimentos, 'curso', 'Fonoaudiologia');
                    var medicina = objectFindByKey(relatorio.atendimentos, 'curso', 'Medicina');
                    var nutricao = objectFindByKey(relatorio.atendimentos, 'curso', 'Nutrição');
                    var odontologia = objectFindByKey(relatorio.atendimentos, 'curso', 'Odontologia');
                    var psicologia = objectFindByKey(relatorio.atendimentos, 'curso', 'Psicologia');
                    var veterinaria = objectFindByKey(relatorio.atendimentos, 'curso', 'Veterinária');

                    var biomedicinaPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Biomedicina');
                    var cienciasBiologicasPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Ciências Biológicas');
                    var educacaoFisicaPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Educação Física');
                    var enfermagemPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Enfermagem');
                    var esteticaCosmeticaPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Estética e Cosmética');
                    var farmaciaPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Farmácia');
                    var fisioterapiaPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Fisioterapia');
                    var fonoaudiologiaPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Fonoaudiologia');
                    var medicinaPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Medicina');
                    var nutricaoPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Nutrição');
                    var odontologiaPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Odontologia');
                    var psicologiaPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Psicologia');
                    var veterinariaPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Veterinária');

                    var biomedicinaTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Biomedicina');
                    var cienciasBiologicasTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Ciências Biológicas');
                    var educacaoFisicaTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Educação Física');
                    var enfermagemTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Enfermagem');
                    var esteticaCosmeticaTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Estética e Cosmética');
                    var farmaciaTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Farmácia');
                    var fisioterapiaTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Fisioterapia');
                    var fonoaudiologiaTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Fonoaudiologia');
                    var medicinaTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Medicina');
                    var nutricaoTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Nutrição');
                    var odontologiaTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Odontologia');
                    var psicologiaTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Psicologia');
                    var veterinariaTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Veterinária');

                    htmlTCorpo = '       <tr>' +
                            '           <td>Biomedicina</td>' +
                            '           <td>' + (biomedicina.atendimentos || 0) + '</td>' +
                            '           <td>' + (biomedicinaTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((biomedicinaTCT.trancamentoscancelamentostransferencias * 100) / biomedicina.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (biomedicinaPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((biomedicinaPermanencia.permanencias * 100) / biomedicina.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>' +
                            '       <tr>' +
                            '           <td>Ciências Biológicas</td>' +
                            '           <td>' + (cienciasBiologicas.atendimentos || 0) + '</td>' +
                            '           <td>' + (cienciasBiologicasTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((cienciasBiologicasTCT.trancamentoscancelamentostransferencias * 100) / cienciasBiologicas.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (cienciasBiologicasPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((cienciasBiologicasPermanencia.permanencias * 100) / cienciasBiologicas.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>' +
                            '       <tr>' +
                            '           <td>Educação Física</td>' +
                            '           <td>' + (educacaoFisica.atendimentos || 0) + '</td>' +
                            '           <td>' + (educacaoFisicaTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((educacaoFisicaTCT.trancamentoscancelamentostransferencias * 100) / educacaoFisica.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (educacaoFisicaPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((educacaoFisicaPermanencia.permanencias * 100) / educacaoFisica.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>' +
                            '       <tr>' +
                            '           <td>Enfermagem</td>' +
                            '           <td>' + (enfermagem.atendimentos || 0) + '</td>' +
                            '           <td>' + (enfermagemTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((enfermagemTCT.trancamentoscancelamentostransferencias * 100) / enfermagem.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (enfermagemPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((enfermagemPermanencia.permanencias * 100) / enfermagem.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>' +
                            '       <tr>' +
                            '           <td>Estética e Cosmética</td>' +
                            '           <td>' + (esteticaCosmetica.atendimentos || 0) + '</td>' +
                            '           <td>' + (esteticaCosmeticaTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((esteticaCosmeticaTCT.trancamentoscancelamentostransferencias * 100) / esteticaCosmetica.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (esteticaCosmeticaPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((esteticaCosmeticaPermanencia.permanencias * 100) / esteticaCosmetica.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>' +
                            '       <tr>' +
                            '           <td>Farmácia</td>' +
                            '           <td>' + (farmacia.atendimentos || 0) + '</td>' +
                            '           <td>' + (farmaciaTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((farmaciaTCT.trancamentoscancelamentostransferencias * 100) / farmacia.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (farmaciaPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((farmaciaPermanencia.permanencias * 100) / farmacia.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>' +
                            '       <tr>' +
                            '           <td>Fisioterapia</td>' +
                            '           <td>' + (fisioterapia.atendimentos || 0) + '</td>' +
                            '           <td>' + (fisioterapiaTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((fisioterapiaTCT.trancamentoscancelamentostransferencias * 100) / fisioterapia.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (fisioterapiaPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((fisioterapiaPermanencia.permanencias * 100) / fisioterapia.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>' +
                            '       <tr>' +
                            '           <td>Fonoaudiologia</td>' +
                            '           <td>' + (fonoaudiologia.atendimentos || 0) + '</td>' +
                            '           <td>' + (fonoaudiologiaTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((fonoaudiologiaTCT.trancamentoscancelamentostransferencias * 100) / fonoaudiologia.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (fonoaudiologiaPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((fonoaudiologiaPermanencia.permanencias * 100) / fonoaudiologia.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>' +
                            '       <tr>' +
                            '           <td>Medicina</td>' +
                            '           <td>' + (medicina.atendimentos || 0) + '</td>' +
                            '           <td>' + (medicinaTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((medicinaTCT.trancamentoscancelamentostransferencias * 100) / medicina.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (medicinaPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((medicinaPermanencia.permanencias * 100) / medicina.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>' +
                            '       <tr>' +
                            '           <td>Nutrição</td>' +
                            '           <td>' + (nutricao.atendimentos || 0) + '</td>' +
                            '           <td>' + (nutricaoTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((nutricaoTCT.trancamentoscancelamentostransferencias * 100) / nutricao.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (nutricaoPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((nutricaoPermanencia.permanencias * 100) / nutricao.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>' +
                            '       <tr>' +
                            '           <td>Odontologia</td>' +
                            '           <td>' + (odontologia.atendimentos || 0) + '</td>' +
                            '           <td>' + (odontologiaTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((odontologiaTCT.trancamentoscancelamentostransferencias * 100) / odontologia.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (odontologiaPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((odontologiaPermanencia.permanencias * 100) / odontologia.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>' +
                            '       <tr>' +
                            '           <td>Psicologia</td>' +
                            '           <td>' + (psicologia.atendimentos || 0) + '</td>' +
                            '           <td>' + (psicologiaTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((psicologiaTCT.trancamentoscancelamentostransferencias * 100) / psicologia.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (psicologiaPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((psicologiaPermanencia.permanencias * 100) / psicologia.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>' +
                            '       <tr>' +
                            '           <td>Veterinária</td>' +
                            '           <td>' + (veterinaria.atendimentos || 0) + '</td>' +
                            '           <td>' + (veterinariaTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((veterinariaTCT.trancamentoscancelamentostransferencias * 100) / veterinaria.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (veterinariaPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((veterinariaPermanencia.permanencias * 100) / veterinaria.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>';
                    
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
                                        ['Biomedicina', biomedicina.atendimentos || 0],
                                        ['Ciências Biológicas', cienciasBiologicas.atendimentos || 0],
                                        ['Educação Física', educacaoFisica.atendimentos || 0],
                                        ['Enfermagem', enfermagem.atendimentos || 0],
                                        ['Estética e Cosmética', esteticaCosmetica.atendimentos || 0],
                                        ['Farmácia', farmacia.atendimentos || 0],
                                        ['Fisioterapia', fisioterapia.atendimentos || 0],
                                        ['Fonoaudiologia', fonoaudiologia.atendimentos || 0],
                                        ['Medicina', medicina.atendimentos || 0],
                                        ['Nutrição', nutricao.atendimentos || 0],
                                        ['Odontologia', odontologia.atendimentos || 0],
                                        ['Psicologia', psicologia.atendimentos || 0],
                                        ['Veterinária', veterinaria.atendimentos || 0]
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
                                                y: biomedicinaTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Ciências Biológicas",
                                                y: cienciasBiologicasTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Educação Física",
                                                y: educacaoFisicaTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Enfermagem",
                                                y: enfermagemTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Estética e cosmética",
                                                y: esteticaCosmeticaTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Farmácia",
                                                y: farmaciaTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Fisioterapia",
                                                y: fisioterapiaTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Fonoaudioterapia",
                                                y: fonoaudiologiaTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Medicina",
                                                y: medicinaTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Psicologia",
                                                y: psicologiaTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Veterinaria",
                                                y: veterinariaTCT.trancamentoscancelamentostransferencias || 0
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
                                                y: biomedicinaPermanencia.permanencias || 0
                                            }, {
                                                name: "Ciências Biológicas",
                                                y: cienciasBiologicasPermanencia.permanencias || 0
                                            }, {
                                                name: "Educação Física",
                                                y: educacaoFisicaPermanencia.permanencias || 0
                                            }, {
                                                name: "Enfermagem",
                                                y: enfermagemPermanencia.permanencias || 0
                                            }, {
                                                name: "Estética e cosmética",
                                                y: esteticaCosmeticaPermanencia.permanencias || 0
                                            }, {
                                                name: "Farmácia",
                                                y: farmaciaPermanencia.permanencias || 0
                                            }, {
                                                name: "Fisioterapia",
                                                y: fisioterapiaPermanencia.permanencias || 0
                                            }, {
                                                name: "Fonoaudioterapia",
                                                y: fonoaudiologiaPermanencia.permanencias || 0
                                            }, {
                                                name: "Medicina",
                                                y: medicinaPermanencia.permanencias || 0
                                            }, {
                                                name: "Psicologia",
                                                y: psicologiaPermanencia.permanencias || 0
                                            }, {
                                                name: "Veterinaria",
                                                y: veterinariaPermanencia.permanencias || 0
                                            }]
                                    }]
                            });
                        });
                    });

                    total = (biomedicina.atendimentos || 0) + 
                            (cienciasBiologicas.atendimentos || 0) + 
                            (educacaoFisica.atendimentos || 0) +
                            (enfermagem.atendimentos || 0) +
                            (esteticaCosmetica.atendimentos || 0) +
                            (farmacia.atendimentos || 0) +
                            (fisioterapia.atendimentos || 0) +
                            (fonoaudiologia.atendimentos || 0) +
                            (medicina.atendimentos || 0) +
                            (nutricao.atendimentos || 0) +
                            (odontologia.atendimentos || 0) +
                            (psicologia.atendimentos || 0) +
                            (veterinaria.atendimentos || 0);
                    totalPermanencias = (biomedicinaPermanencia.permanencias || 0) +
                            (cienciasBiologicasPermanencia.permanencias || 0) +
                            (educacaoFisicaPermanencia.permanencias || 0) +
                            (enfermagemPermanencia.permanencias || 0) +
                            (esteticaCosmeticaPermanencia.permanencias || 0) +
                            (farmaciaPermanencia.permanencias || 0) +
                            (fisioterapiaPermanencia.permanencias || 0) +
                            (fonoaudiologiaPermanencia.permanencias || 0) +
                            (medicinaPermanencia.permanencias || 0) +
                            (nutricaoPermanencia.permanencias || 0) +
                            (odontologiaPermanencia.permanencias || 0) +
                            (psicologiaPermanencia.permanencias || 0) +
                            (veterinariaPermanencia.permanencias || 0);
                    totalTCT = (biomedicinaTCT.trancamentoscancelamentostransferencias || 0) + 
                            (cienciasBiologicasTCT.trancamentoscancelamentostransferencias || 0) + 
                            (educacaoFisicaTCT.trancamentoscancelamentostransferencias || 0) +
                            (enfermagemTCT.trancamentoscancelamentostransferencias || 0) +
                            (esteticaCosmeticaTCT.trancamentoscancelamentostransferencias || 0) +
                            (farmaciaTCT.trancamentoscancelamentostransferencias || 0) +
                            (fisioterapiaTCT.trancamentoscancelamentostransferencias || 0) +
                            (fonoaudiologiaTCT.trancamentoscancelamentostransferencias || 0) +
                            (medicinaTCT.trancamentoscancelamentostransferencias || 0) +
                            (nutricaoTCT.trancamentoscancelamentostransferencias || 0) +
                            (odontologiaTCT.trancamentoscancelamentostransferencias || 0) +
                            (psicologiaTCT.trancamentoscancelamentostransferencias || 0) +
                            (veterinariaTCT.trancamentoscancelamentostransferencias || 0);
                    break;
                }
                case "CETA":
                {
                    var agronegocio = objectFindByKey(relatorio.atendimentos, 'curso', 'Agronegócio');
                    var agronomia = objectFindByKey(relatorio.atendimentos, 'curso', 'Agronomia');
                    var ads = objectFindByKey(relatorio.atendimentos, 'curso', 'Anál. Des.de Sistemas');
                    var arquitetura = objectFindByKey(relatorio.atendimentos, 'curso', 'Arquitetura e Urbanismo');
                    var automacao = objectFindByKey(relatorio.atendimentos, 'curso', 'Automação Industrial');
                    var design = objectFindByKey(relatorio.atendimentos, 'curso', 'Design de Interiores');
                    var engAmbiental = objectFindByKey(relatorio.atendimentos, 'curso', 'Eng.Amb.e Sanitária');
                    var engenhariaCivil = objectFindByKey(relatorio.atendimentos, 'curso', 'Engenharia Civil');
                    var engControleAutom = objectFindByKey(relatorio.atendimentos, 'curso', 'Eng.Controle e Autom.');
                    var engProducao = objectFindByKey(relatorio.atendimentos, 'curso', 'Engenharia de Produção');
                    var engSoftware = objectFindByKey(relatorio.atendimentos, 'curso', 'Engenharia de Software');
                    var engEletrica = objectFindByKey(relatorio.atendimentos, 'curso', 'Engenharia Elétrica');
                    var manuAero = objectFindByKey(relatorio.atendimentos, 'curso', 'Manutenção de Aeronaves');
                    var redes = objectFindByKey(relatorio.atendimentos, 'curso', 'Redes de Computadores');
                    var sistemaInformacao = objectFindByKey(relatorio.atendimentos, 'curso', 'Sistemas de Informação');
                    var sistemaInternet = objectFindByKey(relatorio.atendimentos, 'curso', 'Sistemas para Internet');

                    var agronegocioPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Agronegócio');
                    var agronomiaPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Agronomia');
                    var adsPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Anál. Des.de Sistemas');
                    var arquiteturaPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Arquitetura e Urbanismo');
                    var automacaoPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Automação Industrial');
                    var designPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Design de Interiores');
                    var engAmbientalPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Eng.Amb.e Sanitária');
                    var engenhariaCivilPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Engenharia Civil');
                    var engControleAutomPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Eng.Controle e Autom.');
                    var engProducaoPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Engenharia de Produção');
                    var engSoftwarePermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Engenharia de Software');
                    var engEletricaPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Engenharia Elétrica');
                    var manuAeroPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Manutenção de Aeronaves');
                    var redesPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Redes de Computadores');
                    var sistemaInformacaoPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Sistemas de Informação');
                    var sistemaInternetPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Sistemas para Internet');
                    
                    var agronegocioTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Agronegócio');
                    var agronomiaTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Agronomia');
                    var adsTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Anál. Des.de Sistemas');
                    var arquiteturaTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Arquitetura e Urbanismo');
                    var automacaoTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Automação Industrial');
                    var designTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Design de Interiores');
                    var engAmbientalTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Eng.Amb.e Sanitária');
                    var engenhariaCivilTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Engenharia Civil');
                    var engControleAutomTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Eng.Controle e Autom.');
                    var engProducaoTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Engenharia de Produção');
                    var engSoftwareTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Engenharia de Software');
                    var engEletricaTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Engenharia Elétrica');
                    var manuAeroTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Manutenção de Aeronaves');
                    var redesTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Redes de Computadores');
                    var sistemaInformacaoTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Sistemas de Informação');
                    var sistemaInternetTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Sistemas para Internet');
                    
                    htmlTCorpo = '       <tr>' +
                            '           <td>Agronegócio</td>' +
                            '           <td>' + (agronegocio.atendimentos || 0) + '</td>' +
                            '           <td>' + (agronegocioTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((agronegocioTCT.trancamentoscancelamentostransferencias * 100) / agronegocio.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (agronegocioPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((agronegocioPermanencia.permanencias * 100) / agronegocio.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>' +
                            '       <tr>' +
                            '           <td>Agronomia</td>' +
                            '           <td>' + (agronomia.atendimentos || 0) + '</td>' +
                            '           <td>' + (agronomiaTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((agronomiaTCT.trancamentoscancelamentostransferencias * 100) / agronomia.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (agronomiaPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((agronomiaPermanencia.permanencias * 100) / agronomia.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>' +
                            '       <tr>' +
                            '           <td>Anál. Des.de Sistemas</td>' +
                            '           <td>' + (ads.atendimentos || 0) + '</td>' +
                            '           <td>' + (adsTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((adsTCT.trancamentoscancelamentostransferencias * 100) / ads.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (adsPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((adsPermanencia.permanencias * 100) / ads.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>' +
                            '       <tr>' +
                            '           <td>Arquitetura e Urbanismo</td>' +
                            '           <td>' + (arquitetura.atendimentos || 0) + '</td>' +
                            '           <td>' + (arquiteturaTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((arquiteturaTCT.trancamentoscancelamentostransferencias * 100) / arquitetura.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (arquiteturaPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((arquiteturaPermanencia.permanencias * 100) / arquitetura.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>' +
                            '       <tr>' +
                            '           <td>Automação Industrial</td>' +
                            '           <td>' + (automacao.atendimentos || 0) + '</td>' +
                            '           <td>' + (automacaoTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((automacaoTCT.trancamentoscancelamentostransferencias * 100) / automacao.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (automacaoPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((automacaoPermanencia.permanencias * 100) / automacao.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>' +
                            '       <tr>' +
                            '           <td>Design de Interiores</td>' +
                            '           <td>' + (design.atendimentos || 0) + '</td>' +
                            '           <td>' + (designTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((designTCT.trancamentoscancelamentostransferencias * 100) / design.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (designPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((designPermanencia.permanencias * 100) / design.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>' +
                            '       <tr>' +
                            '           <td>Eng.Amb.e Sanitária</td>' +
                            '           <td>' + (engAmbiental.atendimentos || 0) + '</td>' +
                            '           <td>' + (engAmbientalTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((engAmbientalTCT.trancamentoscancelamentostransferencias * 100) / engAmbiental.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (engAmbientalPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((engAmbientalPermanencia.permanencias * 100) / engAmbiental.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>' +
                            '       <tr>' +
                            '           <td>Engenharia Civil</td>' +
                            '           <td>' + (engenhariaCivil.atendimentos || 0) + '</td>' +
                            '           <td>' + (engenhariaCivilTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((engenhariaCivilTCT.trancamentoscancelamentostransferencias * 100) / engenhariaCivil.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (engenhariaCivilPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((engenhariaCivilPermanencia.permanencias * 100) / engenhariaCivil.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>' +
                            '       <tr>' +
                            '           <td>Eng.Controle e Autom.</td>' +
                            '           <td>' + (engControleAutom.atendimentos || 0) + '</td>' +
                            '           <td>' + (engControleAutomTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((engControleAutomTCT.trancamentoscancelamentostransferencias * 100) / engControleAutom.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (engControleAutomPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((engControleAutomPermanencia.permanencias * 100) / engControleAutom.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>' +
                            '       <tr>' +
                            '           <td>Engenharia de Produção</td>' +
                            '           <td>' + (engProducao.atendimentos || 0) + '</td>' +
                            '           <td>' + (engProducaoTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((engProducaoTCT.trancamentoscancelamentostransferencias * 100) / engProducao.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (engProducaoPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((engProducaoPermanencia.permanencias * 100) / engProducao.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>' +
                            '       <tr>' +
                            '           <td>Engenharia de Software</td>' +
                            '           <td>' + (engSoftware.atendimentos || 0) + '</td>' +
                            '           <td>' + (engSoftwareTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((engSoftwareTCT.trancamentoscancelamentostransferencias * 100) / engSoftware.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (engSoftwarePermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((engSoftwarePermanencia.permanencias * 100) / engSoftware.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>' +
                            '       <tr>' +
                            '           <td>Engenharia Elétrica</td>' +
                            '           <td>' + (engEletrica.atendimentos || 0) + '</td>' +
                            '           <td>' + (engEletricaTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((engEletricaTCT.trancamentoscancelamentostransferencias * 100) / engEletrica.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (engEletricaPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((engEletricaPermanencia.permanencias * 100) / engEletrica.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>' +
                            '       <tr>' +
                            '           <td>Manutenção de Aeronaves</td>' +
                            '           <td>' + (manuAero.atendimentos || 0) + '</td>' +
                            '           <td>' + (manuAeroTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((manuAeroTCT.trancamentoscancelamentostransferencias * 100) / manuAero.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (manuAeroPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((manuAeroPermanencia.permanencias * 100) / manuAero.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>'+
                            '       <tr>' +
                            '           <td>Redes de Computadores</td>' +
                            '           <td>' + (redes.atendimentos || 0) + '</td>' +
                            '           <td>' + (redesTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((redesTCT.trancamentoscancelamentostransferencias * 100) / redes.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (redesPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((redesPermanencia.permanencias * 100) / redes.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>'+
                            '       <tr>' +
                            '           <td>Sistemas de Informação</td>' +
                            '           <td>' + (sistemaInformacao.atendimentos || 0) + '</td>' +
                            '           <td>' + (sistemaInformacaoTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((sistemaInformacaoTCT.trancamentoscancelamentostransferencias * 100) / sistemaInformacao.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (sistemaInformacaoPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((sistemaInformacaoPermanencia.permanencias * 100) / sistemaInformacao.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>'+
                            '       <tr>' +
                            '           <td>Sistemas para Internet</td>' +
                            '           <td>' + (sistemaInternet.atendimentos || 0) + '</td>' +
                            '           <td>' + (sistemaInternetTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((sistemaInternetTCT.trancamentoscancelamentostransferencias * 100) / sistemaInternet.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (sistemaInternetPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((sistemaInternetPermanencia.permanencias * 100) / sistemaInternet.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>';
                    
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
                                        ['Agronegócio', agronegocio.atendimentos || 0],
                                        ['Agronomia', agronomia.atendimentos || 0],
                                        ['Anál. Des.de Sistemas', ads.atendimentos || 0],
                                        ['Arquitetura e Urbanismo', arquitetura.atendimentos || 0],
                                        ['Automação Industrial', automacao.atendimentos || 0],
                                        ['Design de Interiores', design.atendimentos || 0],
                                        ['Eng.Amb.e Sanitária', engAmbiental.atendimentos || 0],
                                        ['Engenharia Civil', engenhariaCivil.atendimentos || 0],
                                        ['Eng.Controle e Autom.', engControleAutom.atendimentos || 0],
                                        ['Engenharia de Produção', engProducao.atendimentos || 0],
                                        ['Engenharia de Software', engSoftware.atendimentos || 0],
                                        ['Engenharia Elétrica', engEletrica.atendimentos || 0],
                                        ['Manutenção de Aeronaves', manuAero.atendimentos || 0],
                                        ['Redes de Computadores', redes.atendimentos || 0],
                                        ['Sistemas de Informação', sistemaInformacao.atendimentos || 0],
                                        ['Sistemas para Internet', sistemaInternet.atendimentos || 0]
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
                                                name: "Agronegócio",
                                                y: agronegocioTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Agronomia",
                                                y: agronomiaTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Anál. Des.de Sistemas",
                                                y: adsTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Arquitetura e Urbanismo",
                                                y: arquiteturaTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Automação Industrial",
                                                y: automacaoTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Design de Interiores",
                                                y: designTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Eng.Amb.e Sanitária",
                                                y: engAmbientalTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Engenharia Civil",
                                                y: engenhariaCivilTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Eng.Controle e Autom.",
                                                y: engControleAutomTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Engenharia de Produção",
                                                y: engProducaoTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Engenharia de Software",
                                                y: engSoftwareTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Engenharia Elétrica",
                                                y: engEletricaTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Manutenção de Aeronaves",
                                                y: manuAeroTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Redes de Computadores",
                                                y: redesTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Sistemas de Informação",
                                                y: sistemaInformacaoTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Sistemas para Internet",
                                                y: sistemaInternetTCT.trancamentoscancelamentostransferencias || 0
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
                                                name: "Agronegócio",
                                                y: agronegocioPermanencia.permanencias || 0
                                            }, {
                                                name: "Agronomia",
                                                y: agronomiaPermanencia.permanencias || 0
                                            }, {
                                                name: "Anál. Des.de Sistemas",
                                                y: adsPermanencia.permanencias || 0
                                            }, {
                                                name: "Arquitetura e Urbanismo",
                                                y: arquiteturaPermanencia.permanencias || 0
                                            }, {
                                                name: "Automação Industrial",
                                                y: automacaoPermanencia.permanencias || 0
                                            }, {
                                                name: "Design de Interiores",
                                                y: designPermanencia.permanencias || 0
                                            }, {
                                                name: "Eng.Amb.e Sanitária",
                                                y: engAmbientalPermanencia.permanencias || 0
                                            }, {
                                                name: "Engenharia Civil",
                                                y: engenhariaCivilPermanencia.permanencias || 0
                                            }, {
                                                name: "Eng.Controle e Autom.",
                                                y: engControleAutomPermanencia.permanencias || 0
                                            }, {
                                                name: "Engenharia de Produção",
                                                y: engProducaoPermanencia.permanencias || 0
                                            }, {
                                                name: "Engenharia de Software",
                                                y: engSoftwarePermanencia.permanencias || 0
                                            }, {
                                                name: "Engenharia Elétrica",
                                                y: engEletricaPermanencia.permanencias || 0
                                            }, {
                                                name: "Manutenção de Aeronaves",
                                                y: manuAeroPermanencia.permanencias || 0
                                            }, {
                                                name: "Redes de Computadores",
                                                y: redesPermanencia.permanencias || 0
                                            }, {
                                                name: "Sistemas de Informação",
                                                y: sistemaInformacaoPermanencia.permanencias || 0
                                            }, {
                                                name: "Sistemas para Internet",
                                                y: sistemaInternetPermanencia.permanencias || 0
                                            }]
                                    }]
                            });
                        });
                    });

                    total = (agronegocio.atendimentos || 0) + 
                            (agronomia.atendimentos || 0) + 
                            (ads.atendimentos || 0) +
                            (arquitetura.atendimentos || 0) +
                            (automacao.atendimentos || 0) +
                            (design.atendimentos || 0) +
                            (engAmbiental.atendimentos || 0) +
                            (engenhariaCivil.atendimentos || 0) +
                            (engControleAutom.atendimentos || 0) +
                            (engProducao.atendimentos || 0) +
                            (engSoftware.atendimentos || 0) +
                            (engEletrica.atendimentos || 0) +
                            (manuAero.atendimentos || 0) +
                            (redes.atendimentos || 0) +
                            (sistemaInformacao.atendimentos || 0) +
                            (sistemaInternet.atendimentos || 0);
                    totalPermanencias = (agronegocioPermanencia.permanencias || 0) +
                            (agronomiaPermanencia.permanencias || 0) +
                            (adsPermanencia.permanencias || 0) +
                            (arquiteturaPermanencia.permanencias || 0) +
                            (automacaoPermanencia.permanencias || 0) +
                            (designPermanencia.permanencias || 0) +
                            (engAmbientalPermanencia.permanencias || 0) +
                            (engenhariaCivilPermanencia.permanencias || 0) +
                            (engControleAutomPermanencia.permanencias || 0) +
                            (engProducaoPermanencia.permanencias || 0) +
                            (engSoftwarePermanencia.permanencias || 0) +
                            (engEletricaPermanencia.permanencias || 0) +
                            (manuAeroPermanencia.permanencias || 0) +
                            (redesPermanencia.permanencias || 0) +
                            (sistemaInformacaoPermanencia.permanencias || 0) +
                            (sistemaInternetPermanencia.permanencias || 0);
                    totalTCT = (agronegocioTCT.trancamentoscancelamentostransferencias || 0) + 
                            (agronomiaTCT.trancamentoscancelamentostransferencias || 0) + 
                            (adsTCT.trancamentoscancelamentostransferencias || 0) +
                            (arquiteturaTCT.trancamentoscancelamentostransferencias || 0) +
                            (automacaoTCT.trancamentoscancelamentostransferencias || 0) +
                            (designTCT.trancamentoscancelamentostransferencias || 0) +
                            (engAmbientalTCT.trancamentoscancelamentostransferencias || 0) +
                            (engenhariaCivilTCT.trancamentoscancelamentostransferencias || 0) +
                            (engControleAutomTCT.trancamentoscancelamentostransferencias || 0) +
                            (engProducaoTCT.trancamentoscancelamentostransferencias || 0) +
                            (engSoftwareTCT.trancamentoscancelamentostransferencias || 0) +
                            (engEletricaTCT.trancamentoscancelamentostransferencias || 0) +
                            (manuAeroTCT.trancamentoscancelamentostransferencias || 0) +
                            (redesTCT.trancamentoscancelamentostransferencias || 0) +
                            (sistemaInformacaoTCT.trancamentoscancelamentostransferencias || 0) +
                            (sistemaInternetTCT.trancamentoscancelamentostransferencias || 0);                    
                    break;
                }
                case "CHSA":
                {
                    var administracao  = objectFindByKey(relatorio.atendimentos, 'curso', 'Administração');
                    var artesVisuais  = objectFindByKey(relatorio.atendimentos, 'curso', 'Artes Visuais');
                    var cienciasContabeis = objectFindByKey(relatorio.atendimentos, 'curso', 'Ciências Contábeis');
                    var comercioExterior = objectFindByKey(relatorio.atendimentos, 'curso', 'Comercio Exterior');
                    var direito = objectFindByKey(relatorio.atendimentos, 'curso', 'Direito');
                    var gastronomia  = objectFindByKey(relatorio.atendimentos, 'curso', 'Gastronomia');
                    var gestaoComercial = objectFindByKey(relatorio.atendimentos, 'curso', 'Gestão Comercial');
                    var gestaoRecursosHumanos = objectFindByKey(relatorio.atendimentos, 'curso', 'Gestão de Recursos Humanos');
                    var jornalismo = objectFindByKey(relatorio.atendimentos, 'curso', 'Jornalismo');
                    var logistica = objectFindByKey(relatorio.atendimentos, 'curso', 'Logística');
                    var moda = objectFindByKey(relatorio.atendimentos, 'curso', 'Moda');
                    var musica = objectFindByKey(relatorio.atendimentos, 'curso', 'Música');
                    var pedagogia = objectFindByKey(relatorio.atendimentos, 'curso', 'Pedagogia');
                    var pilotagem = objectFindByKey(relatorio.atendimentos, 'curso', 'Pilotagem Prof. de aeronaves');
                    var publicidadePropaganda = objectFindByKey(relatorio.atendimentos, 'curso', 'Publicidade e Propaganda');
                    var servicoSocial = objectFindByKey(relatorio.atendimentos, 'curso', 'Serviço Social');
                    var teologia = objectFindByKey(relatorio.atendimentos, 'curso', 'Teologia');
                    
                    var administracaoPermanencia  = objectFindByKey(relatorio.permanencias, 'curso', 'Administração');
                    var artesVisuaisPermanencia  = objectFindByKey(relatorio.permanencias, 'curso', 'Artes Visuais');
                    var cienciasContabeisPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Ciências Contábeis');
                    var comercioExteriorPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Comercio Exterior');
                    var direitoPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Direito');
                    var gastronomiaPermanencia  = objectFindByKey(relatorio.permanencias, 'curso', 'Gastronomia');
                    var gestaoComercialPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Gestão Comercial');
                    var gestaoRecursosHumanosPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Gestão de Recursos Humanos');
                    var jornalismoPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Jornalismo');
                    var logisticaPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Logística');
                    var modaPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Moda');
                    var musicaPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Música');
                    var pedagogiaPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Pedagogia');
                    var pilotagemPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Pilotagem Prof. de aeronaves');
                    var publicidadePropagandaPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Publicidade e Propaganda');
                    var servicoSocialPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Serviço Social');
                    var teologiaPermanencia = objectFindByKey(relatorio.permanencias, 'curso', 'Teologia');
                    
                    var administracaoTCT  = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Administração');
                    var artesVisuaisTCT  = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Artes Visuais');
                    var cienciasContabeisTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Ciências Contábeis');
                    var comercioExteriorTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Comercio Exterior');
                    var direitoTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Direito');
                    var gastronomiaTCT  = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Gastronomia');
                    var gestaoComercialTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Gestão Comercial');
                    var gestaoRecursosHumanosTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Gestão de Recursos Humanos');
                    var jornalismoTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Jornalismo');
                    var logisticaTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Logística');
                    var modaTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Moda');
                    var musicaTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Música');
                    var pedagogiaTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Pedagogia');
                    var pilotagemTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Pilotagem Prof. de aeronaves');
                    var publicidadePropagandaTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Publicidade e Propaganda');
                    var servicoSocialTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Serviço Social');
                    var teologiaTCT = objectFindByKey(relatorio.trancamentosCancelamentosTransferencias, 'curso', 'Teologia');
                    
                    htmlTCorpo = '       <tr>' +
                            '           <td>Administração</td>' +
                            '           <td>' + (administracao.atendimentos || 0) + '</td>' +
                            '           <td>' + (administracaoTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((administracaoTCT.trancamentoscancelamentostransferencias * 100) / administracao.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (administracaoPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((administracaoPermanencia.permanencias * 100) / administracao.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>' +
                            '       <tr>' +
                            '           <td>Artes Visuais</td>' +
                            '           <td>' + (artesVisuais.atendimentos || 0) + '</td>' +
                            '           <td>' + (artesVisuaisTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((artesVisuaisTCT.trancamentoscancelamentostransferencias * 100) / artesVisuais.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (artesVisuaisPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((artesVisuaisPermanencia.permanencias * 100) / artesVisuais.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>' +
                            '       <tr>' +
                            '           <td>Ciências Contábeis</td>' +
                            '           <td>' + (cienciasContabeis.atendimentos || 0) + '</td>' +
                            '           <td>' + (cienciasContabeisTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((cienciasContabeisTCT.trancamentoscancelamentostransferencias * 100) / cienciasContabeis.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (cienciasContabeisPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((cienciasContabeisPermanencia.permanencias * 100) / cienciasContabeis.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>' +
                            '       <tr>' +
                            '           <td>Comercio Exterior</td>' +
                            '           <td>' + (comercioExterior.atendimentos || 0) + '</td>' +
                            '           <td>' + (comercioExteriorTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((comercioExteriorTCT.trancamentoscancelamentostransferencias * 100) / comercioExterior.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (comercioExteriorPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((comercioExteriorPermanencia.permanencias * 100) / comercioExterior.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>' +
                            '       <tr>' +
                            '           <td>Direito</td>' +
                            '           <td>' + (direito.atendimentos || 0) + '</td>' +
                            '           <td>' + (direitoTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((direitoTCT.trancamentoscancelamentostransferencias * 100) / direito.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (direitoPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((direitoPermanencia.permanencias * 100) / direito.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>' +
                            '       <tr>' +
                            '           <td>Gastronomia</td>' +
                            '           <td>' + (gastronomia.atendimentos || 0) + '</td>' +
                            '           <td>' + (gastronomiaTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((gastronomiaTCT.trancamentoscancelamentostransferencias * 100) / gastronomia.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (gastronomiaPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((gastronomiaPermanencia.permanencias * 100) / gastronomia.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>' +
                            '       <tr>' +
                            '           <td>Gestão Comercial</td>' +
                            '           <td>' + (gestaoComercial.atendimentos || 0) + '</td>' +
                            '           <td>' + (gestaoComercialTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((gestaoComercialTCT.trancamentoscancelamentostransferencias * 100) / gestaoComercial.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (gestaoComercialPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((gestaoComercialPermanencia.permanencias * 100) / gestaoComercial.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>' +
                            '       <tr>' +
                            '           <td>Gestão de Recursos Humanos</td>' +
                            '           <td>' + (gestaoRecursosHumanos.atendimentos || 0) + '</td>' +
                            '           <td>' + (gestaoRecursosHumanosTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((gestaoRecursosHumanosTCT.trancamentoscancelamentostransferencias * 100) / gestaoRecursosHumanos.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (gestaoRecursosHumanosPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((gestaoRecursosHumanosPermanencia.permanencias * 100) / gestaoRecursosHumanos.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>' +
                            '       <tr>' +
                            '           <td>Jornalismo</td>' +
                            '           <td>' + (jornalismo.atendimentos || 0) + '</td>' +
                            '           <td>' + (jornalismoTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((jornalismoTCT.trancamentoscancelamentostransferencias * 100) / jornalismo.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (jornalismoPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((jornalismoPermanencia.permanencias * 100) / jornalismo.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>' +
                            '       <tr>' +
                            '           <td>Logística</td>' +
                            '           <td>' + (logistica.atendimentos || 0) + '</td>' +
                            '           <td>' + (logisticaTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((logisticaTCT.trancamentoscancelamentostransferencias * 100) / logistica.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (logisticaPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((logisticaPermanencia.permanencias * 100) / logistica.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>' +
                            '       <tr>' +
                            '           <td>Moda</td>' +
                            '           <td>' + (moda.atendimentos || 0) + '</td>' +
                            '           <td>' + (modaTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((modaTCT.trancamentoscancelamentostransferencias * 100) / moda.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (modaPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((modaPermanencia.permanencias * 100) / moda.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>' +
                            '       <tr>' +
                            '           <td>Música</td>' +
                            '           <td>' + (musica.atendimentos || 0) + '</td>' +
                            '           <td>' + (musicaTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((musicaTCT.trancamentoscancelamentostransferencias * 100) / musica.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (musicaPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((musicaPermanencia.permanencias * 100) / musica.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>' +
                            '       <tr>' +
                            '           <td>Pedagogia</td>' +
                            '           <td>' + (pedagogia.atendimentos || 0) + '</td>' +
                            '           <td>' + (pedagogiaTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((pedagogiaTCT.trancamentoscancelamentostransferencias * 100) / pedagogia.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (pedagogiaPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((pedagogiaPermanencia.permanencias * 100) / pedagogia.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>'+
                            '       <tr>' +
                            '           <td>Pilotagem Prof. de aeronaves</td>' +
                            '           <td>' + (pilotagem.atendimentos || 0) + '</td>' +
                            '           <td>' + (pilotagemTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((pilotagemTCT.trancamentoscancelamentostransferencias * 100) / pilotagem.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (pilotagemPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((pilotagemPermanencia.permanencias * 100) / pilotagem.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>'+
                            '       <tr>' +
                            '           <td>Publicidade e Propaganda</td>' +
                            '           <td>' + (publicidadePropaganda.atendimentos || 0) + '</td>' +
                            '           <td>' + (publicidadePropagandaTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((publicidadePropagandaTCT.trancamentoscancelamentostransferencias * 100) / publicidadePropaganda.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (publicidadePropagandaPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((publicidadePropagandaPermanencia.permanencias * 100) / publicidadePropaganda.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>'+
                            '       <tr>' +
                            '           <td>Serviço Social</td>' +
                            '           <td>' + (servicoSocial.atendimentos || 0) + '</td>' +
                            '           <td>' + (servicoSocialTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((servicoSocialTCT.trancamentoscancelamentostransferencias * 100) / servicoSocial.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (servicoSocialPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((servicoSocialPermanencia.permanencias * 100) / servicoSocial.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>'+
                            '           <td>Teologia</td>' +
                            '           <td>' + (teologia.atendimentos || 0) + '</td>' +
                            '           <td>' + (teologiaTCT.trancamentoscancelamentostransferencias || 0) + '</td>' +
                            '           <td>' + (((teologiaTCT.trancamentoscancelamentostransferencias * 100) / teologia.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '           <td>' + (teologiaPermanencia.permanencias || 0) + '</td>' +
                            '           <td>' + (((teologiaPermanencia.permanencias * 100) / teologia.atendimentos) || 0).toFixed(2) + '%</td>' +
                            '       </tr>';
                    
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
                                        ['Administração', administracao.atendimentos || 0],
                                        ['Artes Visuais', artesVisuais.atendimentos || 0],
                                        ['Ciências Contábeis', cienciasContabeis.atendimentos || 0],
                                        ['Comercio Exterior', comercioExterior.atendimentos || 0],
                                        ['Direito', direito.atendimentos || 0],
                                        ['Gastronomia', gastronomia.atendimentos || 0],
                                        ['Gestão Comercial', gestaoComercial.atendimentos || 0],
                                        ['Gestão de Recursos Humanos', gestaoRecursosHumanos.atendimentos || 0],
                                        ['Jornalismo', jornalismo.atendimentos || 0],
                                        ['Logística', logistica.atendimentos || 0],
                                        ['Moda', moda.atendimentos || 0],
                                        ['Música', musica.atendimentos || 0],
                                        ['Pedagogia', pedagogia.atendimentos || 0],
                                        ['Pilotagem Prof. de aeronaves', pilotagem.atendimentos || 0],
                                        ['Publicidade e Propaganda', publicidadePropaganda.atendimentos || 0],
                                        ['Serviço Social', servicoSocial.atendimentos || 0],
                                        ['Teologia', teologia.atendimentos || 0]
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
                                                name: "Administração",
                                                y: administracaoTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Artes Visuais",
                                                y: artesVisuaisTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Ciências Contábeis",
                                                y: cienciasContabeisTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Comercio Exterior",
                                                y: comercioExteriorTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Direito",
                                                y: direitoTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Gastronomia",
                                                y: gastronomiaTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Gestão Comercial",
                                                y: gestaoComercialTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Gestão de Recursos Humanos",
                                                y: gestaoRecursosHumanosTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Jornalismo",
                                                y: jornalismoTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Logística",
                                                y: logisticaTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Moda",
                                                y: modaTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Música",
                                                y: musicaTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Pedagogia",
                                                y: pedagogiaTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Pilotagem Prof. de aeronaves",
                                                y: pilotagemTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Publicidade e Propaganda",
                                                y: publicidadePropagandaTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Serviço Social",
                                                y: servicoSocialTCT.trancamentoscancelamentostransferencias || 0
                                            }, {
                                                name: "Teologia",
                                                y: teologiaTCT.trancamentoscancelamentostransferencias || 0
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
                                                name: "Administração",
                                                y: administracaoPermanencia.permanencias || 0
                                            }, {
                                                name: "Artes Visuais",
                                                y: artesVisuaisPermanencia.permanencias || 0
                                            }, {
                                                name: "Ciências Contábeis",
                                                y: cienciasContabeisPermanencia.permanencias || 0
                                            }, {
                                                name: "Comercio Exterior",
                                                y: comercioExteriorPermanencia.permanencias || 0
                                            }, {
                                                name: "Direito",
                                                y: direitoPermanencia.permanencias || 0
                                            }, {
                                                name: "Gastronomia",
                                                y: gastronomiaPermanencia.permanencias || 0
                                            }, {
                                                name: "Gestão Comercial",
                                                y: gestaoComercialPermanencia.permanencias || 0
                                            }, {
                                                name: "Gestão de Recursos Humanos",
                                                y: gestaoRecursosHumanosPermanencia.permanencias || 0
                                            }, {
                                                name: "Jornalismo",
                                                y: jornalismoPermanencia.permanencias || 0
                                            }, {
                                                name: "Logística",
                                                y: logisticaPermanencia.permanencias || 0
                                            }, {
                                                name: "Moda",
                                                y: modaPermanencia.permanencias || 0
                                            }, {
                                                name: "Música",
                                                y: musicaPermanencia.permanencias || 0
                                            }, {
                                                name: "Pedagogia",
                                                y: pedagogiaPermanencia.permanencias || 0
                                            }, {
                                                name: "Pilotagem Prof. de aeronaves",
                                                y: pilotagemPermanencia.permanencias || 0
                                            }, {
                                                name: "Publicidade e Propaganda",
                                                y: publicidadePropagandaPermanencia.permanencias || 0
                                            }, {
                                                name: "Serviço Social",
                                                y: servicoSocialPermanencia.permanencias || 0
                                            }, {
                                                name: "Teologia",
                                                y: teologiaPermanencia.permanencias || 0
                                            }]
                                    }]
                            });
                        });
                    });

                    total = (administracao.atendimentos || 0) + 
                            (artesVisuais.atendimentos || 0) + 
                            (cienciasContabeis.atendimentos || 0) +
                            (comercioExterior.atendimentos || 0) +
                            (direito.atendimentos || 0) +
                            (gastronomia.atendimentos || 0) +
                            (gestaoComercial.atendimentos || 0) +
                            (gestaoRecursosHumanos.atendimentos || 0) +
                            (jornalismo.atendimentos || 0) +
                            (logistica.atendimentos || 0) +
                            (moda.atendimentos || 0) +
                            (musica.atendimentos || 0) +
                            (pedagogia.atendimentos || 0) +
                            (pilotagem.atendimentos || 0) +
                            (publicidadePropaganda.atendimentos || 0) +
                            (servicoSocial.atendimentos || 0) + 
                            (teologia.atendimentos || 0);                    
                    totalPermanencias = (administracaoPermanencia.permanencias || 0) + 
                            (artesVisuaisPermanencia.permanencias || 0) + 
                            (cienciasContabeisPermanencia.permanencias || 0) +
                            (comercioExteriorPermanencia.permanencias || 0) +
                            (direitoPermanencia.permanencias || 0) +
                            (gastronomiaPermanencia.permanencias || 0) +
                            (gestaoComercialPermanencia.permanencias || 0) +
                            (gestaoRecursosHumanosPermanencia.permanencias || 0) +
                            (jornalismoPermanencia.permanencias || 0) +
                            (logisticaPermanencia.permanencias || 0) +
                            (modaPermanencia.permanencias || 0) +
                            (musicaPermanencia.permanencias || 0) +
                            (pedagogiaPermanencia.permanencias || 0) +
                            (pilotagemPermanencia.permanencias || 0) +
                            (publicidadePropagandaPermanencia.permanencias || 0) +
                            (servicoSocialPermanencia.permanencias || 0) + 
                            (teologiaPermanencia.permanencias || 0);
                    totalTCT = (administracaoTCT.trancamentoscancelamentostransferencias || 0) + 
                            (artesVisuaisTCT.trancamentoscancelamentostransferencias || 0) + 
                            (cienciasContabeisTCT.trancamentoscancelamentostransferencias || 0) +
                            (comercioExteriorTCT.trancamentoscancelamentostransferencias || 0) +
                            (direitoTCT.trancamentoscancelamentostransferencias || 0) +
                            (gastronomiaTCT.trancamentoscancelamentostransferencias || 0) +
                            (gestaoComercialTCT.trancamentoscancelamentostransferencias || 0) +
                            (gestaoRecursosHumanosTCT.trancamentoscancelamentostransferencias || 0) +
                            (jornalismoTCT.trancamentoscancelamentostransferencias || 0) +
                            (logisticaTCT.trancamentoscancelamentostransferencias || 0) +
                            (modaTCT.trancamentoscancelamentostransferencias || 0) +
                            (musicaTCT.trancamentoscancelamentostransferencias || 0) +
                            (pedagogiaTCT.trancamentoscancelamentostransferencias || 0) +
                            (pilotagemTCT.trancamentoscancelamentostransferencias || 0) +
                            (publicidadePropagandaTCT.trancamentoscancelamentostransferencias || 0) +
                            (servicoSocialTCT.trancamentoscancelamentostransferencias || 0) + 
                            (teologiaTCT.trancamentoscancelamentostransferencias || 0); 
                    break;
                }
            }

            var htmlTFinal = '   </tbody>' +
                    '   <tfoot>' +
                    '       <tr>' +
                    '           <td><b>TOTAL</b></td>' +
                    '           <td><b>' + (total || 0) + '</b></td>' +
                    '           <td><b>'+ (totalTCT || 0) +'</b></td>' +
                    '           <td><b>'+ (((totalTCT * 100) / total) || 0).toFixed(2) +'%</b></td>' +
                    '           <td><b>' + (totalPermanencias || 0) + '</b></td>' +
                    '           <td><b>'+ (((totalPermanencias * 100) / total) || 0).toFixed(2) +'%</b></td>' +
                    '       </tr>' +
                    '   </tfoot>' +
                    '</table>';
            document.getElementById('tabela').innerHTML = htmlTCab + htmlTCorpo + htmlTFinal;
        }

        function criarHTMLTabelaRelatorioResumoMotivo(relatorio) {
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

            for (var contador = 0; contador < relatorio.motivos.length; contador++) {
                switch (relatorio.motivos[contador].motivo) {
                    case "Aprendizagem" :
                    {
                        qtdeAprendizagemResumoMotivo = relatorio.motivos[contador].atendimentos;
                        break;
                    }
                    case "Gravidez" :
                    {
                        qtdeGravidezResumoMotivo = relatorio.motivos[contador].atendimentos;
                        break;
                    }
                    case "Notas baixas" :
                    {
                        qtdeNotasBaixasResumoMotivo = relatorio.motivos[contador].atendimentos;
                        break;
                    }
                    case "Outros" :
                    {
                        qtdeOutrosResumoMotivo = relatorio.motivos[contador].atendimentos;
                        break;
                    }
                    case "Distância" :
                    {
                        qtdeDistanciaResumoMotivo = relatorio.motivos[contador].atendimentos;
                        break;
                    }
                    case "Doença" :
                    {
                        qtdeDoencaResumoMotivo = relatorio.motivos[contador].atendimentos;
                        break;
                    }
                    case "Financeiro" :
                    {
                        qtdeFinanceiroResumoMotivo = relatorio.motivos[contador].atendimentos;
                        break;
                    }
                    case "Mudança de Cidade" :
                    {
                        qtdeMudancaDeCidadeResumoMotivo = relatorio.motivos[contador].atendimentos;
                        break;
                    }
                    case "Não Identificação com o Curso" :
                    {
                        qtdeNaoIndentificacaoComOCursoResumoMotivo = relatorio.motivos[contador].atendimentos;
                        break;
                    }
                    case "Trabalho" :
                    {
                        qtdeTrabalhoResumoMotivo = relatorio.motivos[contador].atendimentos;
                        break;
                    }
                    case "Transferência para outra IES" :
                    {
                        qtdeTransferenciaResumoMotivo = relatorio.motivos[contador].atendimentos;
                        break;
                    }
                    case "Frequência baixa" :
                    {
                        qtdeFrequenciaResumoMotivo = relatorio.motivos[contador].atendimentos;
                        break;
                    }
                }
            }

            var total = qtdeAprendizagemResumoMotivo +
                    qtdeGravidezResumoMotivo +
                    qtdeNotasBaixasResumoMotivo +
                    qtdeOutrosResumoMotivo +
                    qtdeDistanciaResumoMotivo +
                    qtdeDoencaResumoMotivo +
                    qtdeFinanceiroResumoMotivo +
                    qtdeMudancaDeCidadeResumoMotivo +
                    qtdeNaoIndentificacaoComOCursoResumoMotivo +
                    qtdeTrabalhoResumoMotivo +
                    qtdeTransferenciaResumoMotivo +
                    qtdeFrequenciaResumoMotivo;

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
                    '        <td style="text-align: center">' + qtdeAprendizagemResumoMotivo + '</td>' +
                    '    </tr>' +
                    '    <tr>' +
                    '        <td>DISTÂNCIA (distância entre Insituição de Ensino e casa)</td>' +
                    '        <td style="text-align: center">' + qtdeDistanciaResumoMotivo + '</td>' +
                    '    </tr>' +
                    '    <tr>' +
                    '        <td>DOENÇA (pessoal ou familiar)</td>' +
                    '        <td style="text-align: center">' + qtdeDoencaResumoMotivo + '</td>' +
                    '    </tr>' +
                    '    <tr>' +
                    '        <td>FINANCEIRO (FIES, CREDIN, PROUNE E PROMUBE)</td>' +
                    '        <td style="text-align: center">' + qtdeFinanceiroResumoMotivo + '</td>' +
                    '    </tr>' +
                    '    <tr>' +
                    '        <td>FREQUÊNCIA (igual ou maior que 5 faltas)</td>' +
                    '        <td style="text-align: center">' + qtdeFrequenciaResumoMotivo + '</td>' +
                    '    </tr>' +
                    '    <tr>' +
                    '        <td>GRAVIDEZ (afastamento dos estudos para gestação)</td>' +
                    '        <td style="text-align: center">' + qtdeGravidezResumoMotivo + '</td>' +
                    '    </tr>' +
                    '    <tr>' +
                    '        <td>MUDANÇA DE CIDADE (por trabalho ou pessoal)</td>' +
                    '        <td style="text-align: center">' + qtdeMudancaDeCidadeResumoMotivo + '</td>' +
                    '    </tr>' +
                    '    <tr>' +
                    '        <td>NÃO IDENTIFICAÇÃO COM O CURSO </td>' +
                    '        <td style="text-align: center">' + qtdeNaoIndentificacaoComOCursoResumoMotivo + '</td>' +
                    '    </tr>' +
                    '    <tr>' +
                    '        <td>NOTAS BAIXAS (abaixo da média 6,0) </td>' +
                    '        <td style="text-align: center">' + qtdeNotasBaixasResumoMotivo + '</td>' +
                    '    </tr>' +
                    '    <tr>' +
                    '        <td>OUTROS (familiares ou pessoais) - mencionar motivo </td>' +
                    '        <td style="text-align: center">' + qtdeOutrosResumoMotivo + '</td>' +
                    '    </tr>' +
                    '    <tr>' +
                    '        <td>TRABALHO (dificuldade em conciliar estudos com o trabalho) </td>' +
                    '        <td style="text-align: center">' + qtdeTrabalhoResumoMotivo + '</td>' +
                    '    </tr>' +
                    '    <tr>' +
                    '        <td>TRANSFERÊNCIA PARA OUTRA IES (privada ou pública)</td>' +
                    '        <td style="text-align: center">' + qtdeTransferenciaResumoMotivo + '</td>' +
                    '    </tr>' +
                    '</tbody>' +
                    '<tfoot>' +
                    '    <tr>' +
                    '        <td colspan="2" style="text-align: center"><b>TOTAL</b></td>' +
                    '        <td style="text-align: center"><b>' + total + '</b></td>' +
                    '    </tr>' +
                    '</tfoot>' +
                    '</table>';
            document.getElementById('tabela').innerHTML = html;

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
        }

        function criarHTMLTabelaRelatorioMotivoPorCurso(relatorio) {
            var qtdeAprendizagem = 0;
            var qtdeGravidez = 0;
            var qtdeNotasBaixas = 0;
            var qtdeOutros = 0;
            var qtdeDistancia = 0;
            var qtdeDoenca = 0;
            var qtdeFinanceiro = 0;
            var qtdeMudancaDeCidade = 0;
            var qtdeNaoIndentificacaoComOCurso = 0;
            var qtdeTrabalho = 0;
            var qtdeTransferencia = 0;
            var qtdeFrequencia = 0;
            
            for (var contador = 0; contador < relatorio.centroMotivos.length; contador++) {
                switch (relatorio.centroMotivos[contador].motivo) {
                    case "Aprendizagem" :
                    {
                        qtdeAprendizagem = relatorio.centroMotivos[contador].atendimentos;
                        break;
                    }
                    case "Gravidez" :
                    {
                        qtdeGravidez = relatorio.centroMotivos[contador].atendimentos;
                        break;
                    }
                    case "Notas baixas" :
                    {
                        qtdeNotasBaixas = relatorio.centroMotivos[contador].atendimentos;
                        break;
                    }
                    case "Outros" :
                    {
                        qtdeOutros = relatorio.centroMotivos[contador].atendimentos;
                        break;
                    }
                    case "Distância" :
                    {
                        qtdeDistancia = relatorio.centroMotivos[contador].atendimentos;
                        break;
                    }
                    case "Doença" :
                    {
                        qtdeDoenca = relatorio.centroMotivos[contador].atendimentos;
                        break;
                    }
                    case "Financeiro" :
                    {
                        qtdeFinanceiro = relatorio.centroMotivos[contador].atendimentos;
                        break;
                    }
                    case "Mudança de Cidade" :
                    {
                        qtdeMudancaDeCidade = relatorio.centroMotivos[contador].atendimentos;
                        break;
                    }
                    case "Não Identificação com o Curso" :
                    {
                        qtdeNaoIndentificacaoComOCurso = relatorio.centroMotivos[contador].atendimentos;
                        break;
                    }
                    case "Trabalho" :
                    {
                        qtdeTrabalho = relatorio.centroMotivos[contador].atendimentos;
                        break;
                    }
                    case "Transferência para outra IES" :
                    {
                        qtdeTransferencia = relatorio.centroMotivos[contador].atendimentos;
                        break;
                    }
                    case "Frequência baixa" :
                    {
                        qtdeFrequencia = relatorio.centroMotivos[contador].atendimentos;
                        break;
                    }
                }
            }

            var total = qtdeAprendizagem +
                    qtdeGravidez +
                    qtdeNotasBaixas +
                    qtdeOutros +
                    qtdeDistancia +
                    qtdeDoenca +
                    qtdeFinanceiro +
                    qtdeMudancaDeCidade +
                    qtdeNaoIndentificacaoComOCurso +
                    qtdeTrabalho +
                    qtdeTransferencia +
                    qtdeFrequencia;

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
                    '        <td style="text-align: center">' + qtdeAprendizagem + '</td>' +
                    '    </tr>' +
                    '    <tr>' +
                    '        <td>DISTÂNCIA (distância entre Insituição de Ensino e casa)</td>' +
                    '        <td style="text-align: center">' + qtdeDistancia + '</td>' +
                    '    </tr>' +
                    '    <tr>' +
                    '        <td>DOENÇA (pessoal ou familiar)</td>' +
                    '        <td style="text-align: center">' + qtdeDoenca + '</td>' +
                    '    </tr>' +
                    '    <tr>' +
                    '        <td>FINANCEIRO (FIES, CREDIN, PROUNE E PROMUBE)</td>' +
                    '        <td style="text-align: center">' + qtdeFinanceiro + '</td>' +
                    '    </tr>' +
                    '    <tr>' +
                    '        <td>FREQUÊNCIA (igual ou maior que 5 faltas)</td>' +
                    '        <td style="text-align: center">' + qtdeFrequencia + '</td>' +
                    '    </tr>' +
                    '    <tr>' +
                    '        <td>GRAVIDEZ (afastamento dos estudos para gestação)</td>' +
                    '        <td style="text-align: center">' + qtdeGravidez + '</td>' +
                    '    </tr>' +
                    '    <tr>' +
                    '        <td>MUDANÇA DE CIDADE (por trabalho ou pessoal)</td>' +
                    '        <td style="text-align: center">' + qtdeMudancaDeCidade + '</td>' +
                    '    </tr>' +
                    '    <tr>' +
                    '        <td>NÃO IDENTIFICAÇÃO COM O CURSO </td>' +
                    '        <td style="text-align: center">' + qtdeNaoIndentificacaoComOCurso + '</td>' +
                    '    </tr>' +
                    '    <tr>' +
                    '        <td>NOTAS BAIXAS (abaixo da média 6,0) </td>' +
                    '        <td style="text-align: center">' + qtdeNotasBaixas + '</td>' +
                    '    </tr>' +
                    '    <tr>' +
                    '        <td>OUTROS (familiares ou pessoais) - mencionar motivo </td>' +
                    '        <td style="text-align: center">' + qtdeOutros + '</td>' +
                    '    </tr>' +
                    '    <tr>' +
                    '        <td>TRABALHO (dificuldade em conciliar estudos com o trabalho) </td>' +
                    '        <td style="text-align: center">' + qtdeTrabalho + '</td>' +
                    '    </tr>' +
                    '    <tr>' +
                    '        <td>TRANSFERÊNCIA PARA OUTRA IES (privada ou pública)</td>' +
                    '        <td style="text-align: center">' + qtdeTransferencia + '</td>' +
                    '    </tr>' +
                    '</tbody>' +
                    '<tfoot>' +
                    '    <tr>' +
                    '        <td colspan="2" style="text-align: center"><b>TOTAL</b></td>' +
                    '        <td style="text-align: center"><b>' + total + '</b></td>' +
                    '    </tr>' +
                    '</tfoot>' +
                    '</table>';
            document.getElementById('tabela').innerHTML = html;

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
                                name: "Brands",
                                colorByPoint: true,
                                data: [{
                                        name: "Aprendizagem",
                                        y: qtdeAprendizagem
                                    }, {
                                        name: "Distância",
                                        y: qtdeDistancia
                                    },
                                    {
                                        name: "Doença",
                                        y: qtdeDoenca
                                    },
                                    {
                                        name: "Financeiro",
                                        y: qtdeFinanceiro
                                    },
                                    {
                                        name: "Frequência",
                                        y: qtdeFrequencia
                                    },
                                    {
                                        name: "Gravidez",
                                        y: qtdeGravidez
                                    },
                                    {
                                        name: "Mudança de cidade",
                                        y: qtdeMudancaDeCidade
                                    },
                                    {
                                        name: "Não indentificação com o curso",
                                        y: qtdeNaoIndentificacaoComOCurso
                                    },
                                    {
                                        name: "Notas baixas",
                                        y: qtdeNotasBaixas
                                    },
                                    {
                                        name: "Outros",
                                        y: qtdeOutros
                                    },
                                    {
                                        name: "Trabalho",
                                        y: qtdeTrabalho
                                    }, {
                                        name: "Transferencia para outra instituição",
                                        y: qtdeTransferencia
                                    }]
                            }]
                    });
                });
            });
        }

        function objectFindByKey(array, key, value) {
            for (var i = 0; i < array.length; i++) {
                if (array[i][key] === value) {
                    return array[i];
                }
            }
            return 0;
        }
    }

    function onError() {
        growl.error("<b>Erro ao carregar relatório</b>");
    }
}