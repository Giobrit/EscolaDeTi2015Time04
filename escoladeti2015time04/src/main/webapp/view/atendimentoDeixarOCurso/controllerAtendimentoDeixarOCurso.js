AppModule.controller("controllerFormAtendimentoDeixarOCurso",controllerFormAtendimentoDeixarOCurso);

function controllerFormAtendimentoDeixarOCurso($scope, $http, $routeParams, $location){
    
    $scope.init = function(){
        limparTela();
        
        idEditando = $routeParams.id;
        
        if(idEditando){
            $scope.editando = true;
            $scope.editar(idEditando);
        }
    };
    
    $scope.limparTela = function (){
        $scope.atendimentoDeixarOCurso = {};
        $scope.editando = false;
    };
    
    $scope.salvar = function () {        
        if ($scope.editando) {
            $http.put("/atendimento/deixarOCurso", $scope.atendimentoDeixarOCurso).success(onSuccess).error(onError);
        } else {
            $http.post("/atendimento/deixarOCurso", $scope.atendimentoDeixarOCurso).success(onSuccess).error(onError);
        }

        function onSuccess() {
//            alert(JSON.stringify($scope.atendimentoDeixarOCurso));
            $location.path("/atendimento/deixarOCurso/list");
            alert("Atendimento salvo com sucesso");
        }
    };
    
    $scope.editar = function (id){
        $http.get("/atendimento/deixarOCurso/"+ id).success(onSuccess).error(onError());
        
        function onSuccess(data){            
            $scope.atendimentoDeixarOCurso = data;
        }
    };
    
    function onError(data) {
        alert(JSON.stringify(data));
    };
}