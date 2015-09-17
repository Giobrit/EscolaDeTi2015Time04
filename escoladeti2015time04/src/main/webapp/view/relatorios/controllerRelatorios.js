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
                '      <td>' + ((qtdeTrancamentosCancelamentosTransferenciasCBS * 100) / qtdeAtendimentoCBS) + '%</td>' +
                '      <td>' + qtdePermanenciasCBS + '</td>' +
                '      <td>' + ((qtdePermanenciasCBS * 100) / qtdeAtendimentoCBS) + '%</td>' +
                '   </tr>' +
                '   <tr>' +
                '      <td>CETA - Exatas</td>' +
                '      <td>' + qtdeAtendimentoCETA + '</td>' +
                '      <td>' + qtdeTrancamentosCancelamentosTransferenciasCETA + '</td>' +
                '      <td>' + ((qtdeTrancamentosCancelamentosTransferenciasCETA * 100) / qtdeAtendimentoCETA) + '%</td>' +
                '      <td>' + qtdePermanenciasCETA + '</td>' +
                '      <td>' + ((qtdePermanenciasCETA * 100) / qtdeAtendimentoCETA) + '%</td>' +
                '   </tr>' +
                '   <tr>' +
                '      <td>CHSA - Humanas</td>' +
                '      <td>' + qtdeAtendimentoCHSA + '</td>' +
                '      <td>' + qtdeTrancamentosCancelamentosTransferenciasCHSA + '</td>' +
                '      <td>' + ((qtdeTrancamentosCancelamentosTransferenciasCHSA * 100) / qtdeAtendimentoCHSA) + '%</td>' +
                '      <td>' + qtdePermanenciasCHSA + '</td>' +
                '      <td>' + ((qtdePermanenciasCHSA * 100) / qtdeAtendimentoCHSA) + '%</td>' +
                '   </tr>' +
                '</tbody>';
        var htmlTagFoot = '<tfoot>' +
                '   <tr>' +
                '      <td><b>TOTAL</b></td>' +
                '      <td><b>' + totalAtendimentos + '</b></td>' +
                '      <td><b>' + totalTrancamentosCancelamentosTransferencias + '</b></td>' +
                '      <td><b>' + ((totalTrancamentosCancelamentosTransferencias * 100) / totalAtendimentos) + '%</b></td>' +
                '      <td><b>' + totalPermanencias + '</b></td>' +
                '      <td><b>' + ((totalPermanencias * 100) / totalAtendimentos) + '%</b></td>' +
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
        console.log($scope.centroSelecionado.descricao);
        switch ($scope.tipoSelecionado.id) {
            case 1 ://Relatório geral
            {
                $http.get("/relatorio/porcentro/relatorioCentroCursoAtendimentos/" + $scope.centroSelecionado.descricao).success(onSuccess).error(onError);
                function onSuccess() {
                    $scope.graficoRelatorioGeral(); //Grafico em colunas
                }
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
                            '   </thead>' +
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

    function onError() {
        growl.error("<b>Erro ao carregar relatório</b>");
    }
}