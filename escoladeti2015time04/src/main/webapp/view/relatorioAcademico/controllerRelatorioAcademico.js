AppModule.controller("controllerRelatorioAcademico", controllerRelatorioAcademico);

function controllerRelatorioAcademico($scope, $http, $routeParams, $location, growl, $timeout) {

$scope.carregarAluno = function (ra) {
        if (ra.length !== 8) {
            setAtributosAluno({});
            return;
        }

        $http.get("/lyceumClient/aluno/" + ra).success(onSuccess).error($scope.onError);

        function onSuccess(data) {
            setAtributosAluno(data);
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
}