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
    });
}