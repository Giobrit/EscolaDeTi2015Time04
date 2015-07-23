(function () {
    AppModule.config(function ($routeProvider, $locationProvider) {

        adicionarRota($routeProvider, '/login', 'view/login/login.html', 'controllerTelaLogin');
        adicionarRota($routeProvider, '/', 'view/Home.html');
        //Rotas PerfilAcesso
        adicionarRota($routeProvider, '/PerfilAcesso/form', 'view/perfilAcesso/formPerfilAcesso.html', 'controllerFormPerfilAcesso');
        adicionarRota($routeProvider, '/PerfilAcesso/list', 'view/perfilAcesso/listPerfilAcesso.html', 'controllerListPerfilAcesso');
        adicionarRota($routeProvider, '/PerfilAcesso/edit/:id', 'view/PerfilAcesso.html', 'PerfilAcessoFormController');
        //Rotas PerfilUsuario
        adicionarRota($routeProvider, '/PerfilUsuario/form', 'view/perfilAcesso/formPerfilUsuario.html', 'controllerFormPerfilUsuario');
        //Rotas Usuario
        adicionarRota($routeProvider, '/Usuario/form', 'view/usuario/cadastroUsuario.html', 'controllerFormUsuario');
        adicionarRota($routeProvider, '/Usuario/form/:id', 'view/usuario/cadastroUsuario.html', 'controllerFormUsuario');
        adicionarRota($routeProvider, '/Usuario/list', 'view/usuario/ListagemUsuario.html', 'controllerListUsuario');
        //Rotas Atendimento Deixar O Curso
        adicionarRota($routeProvider, '/AtendimentoDeixarOCurso/form', 'view/atendimentoDeixarOCurso/formAtendimentoDeixarOCurso.html', 'controllerFormAtendimentoDeixarOCurso');
        adicionarRota($routeProvider, '/AtendimentoDeixarOCurso/form/:id', 'view/atendimentoDeixarOCurso/formAtendimentoDeixarOCurso.html', 'controllerFormAtendimentoDeixarOCurso');
        adicionarRota($routeProvider, '/AtendimentoDeixarOCurso/list', 'view/atendimentoDeixarOCurso/ListAtendimentoDeixarOCurso.html', 'controllerListAtendimentoDeixarOCurso');
        //Rotas

//        }).when('/Usuario/login', {
//            templateUrl: 'view/login/login.html',
//            controller: ''
//        }).when('/Usuario/form/alterarSenha/:id', {
//            templateUrl: 'view/usuario/alterarSenhaUsuario.html',
//            controller: 'controllerFormUsuario'
//        }).when('/AtendimentoDeixarOCurso/Objetivo/form', {
//            templateUrl: 'view/atendimentoDeixarOCurso/objetivo/cadastroObjetivo.html',
//            controller: 'controllerFormObjetivoDeixarOCurso'
//        }).when('/AtendimentoDeixarOCurso/Objetivo/form/:id', {
//            templateUrl: 'view/atendimentoDeixarOCurso/objetivo/cadastroObjetivo.html',
//            controller: 'controllerFormObjetivoDeixarOCurso'
//        }).when('/AtendimentoDeixarOCurso/Objetivo/list', {
//            templateUrl: 'view/atendimentoDeixarOCurso/objetivo/listagemObjetivo.html',
//            controller: 'controllerListObjetivoDeixarOCurso'
//        }).when('/AtendimentoDeixarOCurso/Motivo/form', {
//            templateUrl: 'view/atendimentoDeixarOCurso/motivo/cadastroMotivo.html',
//            controller: 'controllerFormMotivoAtendimentoDeixarOCurso'
//        }).when('/AtendimentoDeixarOCurso/Motivo/list', {
//            templateUrl: 'view/atendimentoDeixarOCurso/motivo/listagemMotivo.html',
//            controller: 'controllerListMotivoAtendimentoDeixarOCurso'
//        }).when('/AtendimentoDeixarOCurso/Motivo/form/:id', {
//            templateUrl: 'view/atendimentoDeixarOCurso/motivo/cadastroMotivo.html',
//            controller: 'controllerFormMotivoAtendimentoDeixarOCurso'
//        }).when('/AtendimentoPreventivo/Motivo/form', {
//            templateUrl: 'view/atendimentoPreventivo/motivo/cadastroMotivo.html',
//            controller: 'controllerFormMotivoAtendimentoPreventivo'
//        }).when('/AtendimentoPreventivo/Motivo/form/:id', {
//            templateUrl: 'view/atendimentoPreventivo/motivo/cadastroMotivo.html',
//            controller: 'controllerFormMotivoAtendimentoPreventivo'
//        }).when('/AtendimentoPreventivo/Motivo/list', {
//            templateUrl: 'view/atendimentoPreventivo/motivo/listagemMotivo.html',
//            controller: 'controllerListMotivoAtendimentoPreventivo'
//        });

        //verificar se é possível separar as rotas em módulos

        $locationProvider.html5Mode(false);

    });

    function adicionarRota(routeProvider, rota, urlTemplate, controllerName) {
        routeProvider.when(rota, {
            templateUrl: urlTemplate,
            controller: controllerName,
            resolve: {
                login: validacaoLogin
            }
        });
    }

    function validacaoLogin($q, $cookies, $location, growl) {
        var now = new Date();
        $cookies.put('login', 'o cabra tah logado', {
            expires: new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 1)
        });
        var deferred = $q.defer();
        var cookie = $cookies.get('login');
//    var cookie = $cookies.remove('login');//('login');

//        console.log(cookie);
        if (!cookie) {
            deferred.resolve();
            $location.path("/login");
        } else {
            var now = new Date();
            $cookies.put('login', 'o_cabra_tah_logado', {
                expires: new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 30)
            });
            if (!validarPermissoes(deferred)) {
                growl.warning("Acesso Negado");
                $location.path("/");
            }
        }

        return deferred.promise;
    }

    function validarPermissoes(deferred) {
        deferred.resolve();

        return true;
    }
}());