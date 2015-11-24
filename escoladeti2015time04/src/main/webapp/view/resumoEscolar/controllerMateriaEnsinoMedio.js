AppModule.controller("controllerFormMateria", controllerFormMateria);

AppModule.controller("controllerListaMaterias", controllerListaMaterias);

AppModule.controller("controllerAlualizarMateria", controllerAlualizarMateria);

AppModule.controller("controllerInformacoesMateria", controllerInformacoesMateria);


function controllerFormMateria($scope) {

    $scope.curso = {
        opcoes: [
            {id: 1, nome: 'ADMINISTRAÇÃO'},
            {id: 2, nome: 'AGRONEGÓCIO'},
            {id: 3, nome: 'AGRONOMIA'},
            {id: 4, nome: 'ANÁLISE E DESENVOLVIMENTO DE SISTEMAS'},
            {id: 5, nome: 'ARQUITETURA E URBANISMO'},
            {id: 6, nome: 'ARTES VISUAIS'},
            {id: 7, nome: 'AUTOMAÇÃO INDUSTRIAL'},
            {id: 8, nome: 'BIOMEDICINA'},
            {id: 9, nome: 'CIÊNCIAS BIOLÓGICAS'},
            {id: 10, nome: 'CIÊNCIAS CONTÁBEIS'},
            {id: 11, nome: 'COMÉRCIO EXTERIOR'},
            {id: 12, nome: 'DESIGN DE INTERIORES'},
            {id: 13, nome: 'DIREITO'},
            {id: 14, nome: 'EDUCAÇÃO FÍSICA'},
            {id: 15, nome: 'ENGENHARIA AMBIENTAL e SANITÁRIA'},
            {id: 16, nome: 'ENGENHARIA CIVIL'},
            {id: 17, nome: 'ENGENHARIA DE CONTROLE DE AUTOMAÇÃO'},
            {id: 18, nome: 'ENGENHARIA DE PRODUÇÃO'},
            {id: 19, nome: 'ENGENHARIA DE SOFTWARE'},
            {id: 20, nome: 'ENGENHARIA ELÉTRICA'},
            {id: 21, nome: 'ENGENHARIA MECÂNIA'},
            {id: 22, nome: 'ENGENHARIA QUÍMICA '},
            {id: 23, nome: 'ESTÉTICA E COSMÉTICA'},
            {id: 24, nome: 'FARMÁCIA'},
            {id: 25, nome: 'FISIOTERAPIA'},
            {id: 26, nome: 'FONOAUDIOLOGIA'},
            {id: 27, nome: 'GASTRONOMIA'},
            {id: 28, nome: 'GESTÃO COMERCIAL(VAREJO)'},
            {id: 29, nome: 'GESTÃO de PRODUÇÃO INDUSTRIAL '},
            {id: 30, nome: 'GESTÃO DE RECURSOS HUMANOS'},
            {id: 31, nome: 'JORNALISMO'},
            {id: 32, nome: 'LOGÍSTICA'},
            {id: 33, nome: 'MANUTENÇÃO DE AERONAVES'},
            {id: 34, nome: 'MEDICINA'},
            {id: 35, nome: 'MEDICINA VETERINÁRIA'},
            {id: 36, nome: 'MODA'},
            {id: 38, nome: 'MÚSICA'},
            {id: 39, nome: 'NUTRIÇÃO'},
            {id: 40, nome: 'ODONTOLOGIA'},
            {id: 41, nome: 'PEDAGOGIA'},
            {id: 42, nome: 'PILOTAGEM PROFISSIONAL DE AERONAVES'},
            {id: 43, nome: 'PROCESSOS GERENCIAIS '},
            {id: 44, nome: 'PSICOLOGIA'},
            {id: 45, nome: 'PUBLICIDADE E PROPAGANDA'},
            {id: 46, nome: 'REDES DE COMPUTADORES'},
            {id: 47, nome: 'SERVIÇO SOCIAL'},
            {id: 48, nome: 'SISTEMAS PARA INTERNET'},
            {id: 49, nome: 'TEOLOGIA'}
        ]

    };

    $scope.salvar = function () {
        alert("oi")
    };

    $scope.cursosDaMateria = [];

    $scope.passarTodos = function () {

        $scope.curso.opcoes.forEach(function (value) {
            $scope.cursosDaMateria.push(value);
        });

        $scope.curso.opcoes = [];
    };

    $scope.passarSelecionado = function () {
        $scope.cursosSelecionados.forEach(function (idCursoSelecionado) {
            $scope.curso.opcoes.forEach(function (curso, index) {
                if (curso.id === parseInt(idCursoSelecionado)) {
                    $scope.cursosDaMateria.push(curso);

                    $scope.curso.opcoes.splice(index, 1);
                }
            });

        });
        $scope.cursosSelecionados = [];
    };

    $scope.voltarSelecionado = function () {
        $scope.cursosSelecionados.forEach(function (idCursoSelecionado) {
            $scope.cursosDaMateria.forEach(function (curso, index) {
                if (curso.id === parseInt(idCursoSelecionado)) {
                    $scope.curso.opcoes.push(curso);

                    $scope.cursosDaMateria.splice(index, 1);
                }
            });
        });
        $scope.cursosSelecionados = [];
    };


    $scope.voltarTodos = function () {

        $scope.cursosDaMateria.forEach(function (value) {
            $scope.curso.opcoes.push(value);
        });

        $scope.cursosDaMateria = [];
    };


//    function removerElemento(array, elementoASerRemovido) {
//        array.forEach(function (elemento, posicao) {
//            if (elemento === elementoASerRemovido) {
//                array.splice(posicao, 1);
//            }
//        });
//    }

}

function controllerAlualizarMateria($scope) {

    $scope.materias = {
        opcoes: [
            {id: 1, nome: 'BIOLOGIA'},
            {id: 2, nome: 'EDUCAÇÃO ARTISTICA'},
            {id: 3, nome: 'FILOSOFIA'},
            {id: 4, nome: 'FÍSICA'},
            {id: 5, nome: 'GEOGRAFIA'},
            {id: 6, nome: 'HISTÓRIA'},
            {id: 7, nome: 'INGLÊS'},
            {id: 8, nome: 'MATEMATICA'},
            {id: 9, nome: 'PORTUGUÊS'},
            {id: 10, nome: 'QUÍMICA'},
            {id: 11, nome: 'SOCIOLOGIA'}
        ]

    };

    $scope.curso = {};
    $scope.cursos = [
        "Biomedicina",
        "Ciências Biológicas",
        "Educação Física",
        "Enfermagem",
        "Estética e Cosmética",
        "Farmácia",
        "Fisioterapia",
        "Fonoaudiologia",
        "Medicina",
        "Nutrição",
        "Odontologia",
        "Psicologia",
        "Veterinária",
        "Agronegócio",
        "Agronomia",
        "Superior de Tecnologia em Análise e Desenvolvimento de Sistemas",
        "Arquitetura e Urbanismo",
        "Automação Industrial",
        "Design de Interiores",
        "Eng.Amb.e Sanitária",
        "Engenharia Civil",
        "Eng.Controle e Autom.",
        "Engenharia de Produção",
        "Engenharia de Software",
        "Engenharia Elétrica",
        "Manutenção de Aeronaves",
        "Redes de Computadores",
        "Sistemas de Informação"
                , "Superior de Tecnologia de Sistemas para Internet"
                , "Administração"
                , "Artes Visuais"
                , "Ciências Contábeis"
                , "Comercio Exterior"
                , "Direito"
                , "Gastronomia"
                , "Gestão Comercial"
                , "Gestão de Recursos Humanos"
                , "Jornalismo"
                , "Logística"
                , "Moda"
                , "Música"
                , "Pedagogia"
                , "Pilotagem Prof. de aeronaves"
                , "Publicidade e Propaganda"
                , "Serviço Social"
                , "Teologia"
    ];

    $scope.salvar = function () {
        alert("oi");
    };

    $scope.materiasDoCurso = [];

    $scope.passarTodos = function () {

        $scope.materias.opcoes.forEach(function (value) {
            $scope.materiasDoCurso.push(value);
        });

        $scope.materias.opcoes = [];
    };

    $scope.passarSelecionado = function () {
        $scope.materiasSelecionadas.forEach(function (idCursoSelecionado) {
            $scope.materias.opcoes.forEach(function (materia, index) {
                if (materia.id === parseInt(idCursoSelecionado)) {
                    $scope.materiasDoCurso.push(materia);

                    $scope.materias.opcoes.splice(index, 1);
                }
            });

        });
        $scope.cursosSelecionados = [];
    };

    $scope.voltarSelecionado = function () {
        $scope.materiasSelecionadas.forEach(function (idCursoSelecionado) {
            $scope.materiasDoCurso.forEach(function (materias, index) {
                if (materias.id === parseInt(idCursoSelecionado)) {
                    $scope.materias.opcoes.push(materias);

                    $scope.materiasDoCurso.splice(index, 1);
                }
            });
        });
        $scope.materiasSelecionadas = [];
    };


    $scope.voltarTodos = function () {

        $scope.materiasDoCurso.forEach(function (value) {
            $scope.materias.opcoes.push(value);
        });

        $scope.materiasDoCurso = [];
    };

}

function controllerInformacoesMateria($scope, $http) {
    $scope.controler = {};
    $scope.materias = {
        opcoes: [
            {id: 1, nome: 'BIOLOGIA'},
            {id: 2, nome: 'EDUCAÇÃO ARTISTICA'},
            {id: 3, nome: 'FILOSOFIA'},
            {id: 4, nome: 'FÍSICA'},
            {id: 5, nome: 'GEOGRAFIA'},
            {id: 6, nome: 'HISTÓRIA'},
            {id: 7, nome: 'INGLÊS'},
            {id: 8, nome: 'MATEMATICA'},
            {id: 9, nome: 'PORTUGUÊS'},
            {id: 10, nome: 'QUÍMICA'},
            {id: 11, nome: 'SOCIOLOGIA'}
        ]

    };

    $scope.materiasDoAluno = [];
    $scope.materiasNaoSelecionadas = $scope.materias;

    $scope.init = function () {
        adicionaNovaMateriaDoAluno();
    };

    function adicionaNovaMateriaDoAluno() {
        $scope.materiasDoAluno.push({
            materiaSelecionada: undefined,
            cargaHoraria: "",
            nota: ""
        });
    }

    $scope.alterarMateriaSelecionada = function (materiaDoAluno) {
        if (materiaDoAluno.materiaSelecionada && $scope.materiasDoAluno[$scope.materiasDoAluno.length - 1].materiaSelecionada) {
            adicionaNovaMateriaDoAluno();
        }
    };

    $scope.remover = function (materiaDoAluno) {
        if (!materiaDoAluno.materiaSelecionada) {
            return;
        }

        var index = $scope.materiasDoAluno.indexOf(materiaDoAluno);
        $scope.materiasDoAluno.splice(index, 1);

    };

    $scope.carregarAluno = function (ra) {

        if (ra.length !== 8) {
            $scope.nome = "";
            return;
        }

        $http.get("/lyceumClient/aluno/" + ra).success(onSuccess).error($scope.onError);

        function onSuccess(data) {
            $scope.nome = data.nome;
        }
    };


}

function controllerListaMaterias($scope) {

    $scope.paginaAtual = 1;
    $scope.numeroItensPorPagina = 5;

    $scope.alterarPagina = function () {
        $scope.listar();
    };

    $scope.materias = {
        opcoes: [
            {id: 1, nome: 'BIOLOGIA'},
            {id: 2, nome: 'EDUCAÇÃO ARTISTICA'},
            {id: 3, nome: 'FILOSOFIA'},
            {id: 4, nome: 'FÍSICA'},
            {id: 5, nome: 'GEOGRAFIA'},
            {id: 6, nome: 'HISTÓRIA'},
            {id: 7, nome: 'INGLÊS'},
            {id: 8, nome: 'MATEMATICA'},
            {id: 9, nome: 'PORTUGUÊS'},
            {id: 10, nome: 'QUÍMICA'},
            {id: 11, nome: 'SOCIOLOGIA'}
        ]

    };


}