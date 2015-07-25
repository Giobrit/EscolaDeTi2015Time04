(function () {
    AppModule.config(function ($routeProvider, $locationProvider) {

        //Rotas Avulsas
        $routeProvider.when('/Sair', {
            resolve: {
                sair: sairDoSistema
            }
        }).otherwise({
            redirectTo: '/404'
        });

        //Rotas 404
        adicionarRota($routeProvider, '/404', 'view/notFound/notFound.html');
        //Rotas Login
        adicionarRota($routeProvider, '/Login', 'view/login/login.html', 'controllerTelaLogin');
        adicionarRota($routeProvider, '/', 'view/Home.html');
        //Rotas Usuario
        adicionarRota($routeProvider, '/Usuario/form', 'view/usuario/cadastroUsuario.html', 'controllerFormUsuario');
        adicionarRota($routeProvider, '/Usuario/form/:id', 'view/usuario/cadastroUsuario.html', 'controllerFormUsuario');
        adicionarRota($routeProvider, '/Usuario/list', 'view/usuario/ListagemUsuario.html', 'controllerListUsuario');
        adicionarRota($routeProvider, '/Usuario/form/alterarSenha/:id', 'view/usuario/alterarSenhaUsuario.html', 'controllerFormUsuario');
        //Rotas PerfilAcesso
        adicionarRota($routeProvider, '/PerfilAcesso/form', 'view/perfilAcesso/formPerfilAcesso.html', 'controllerFormPerfilAcesso');
        adicionarRota($routeProvider, '/PerfilAcesso/form/:id', 'view/perfilAcesso/formPerfilAcesso.html', 'controllerFormPerfilAcesso');
        adicionarRota($routeProvider, '/PerfilAcesso/list', 'view/perfilAcesso/listPerfilAcesso.html', 'controllerListPerfilAcesso');
        //Rotas PerfilUsuario
        adicionarRota($routeProvider, '/PerfilUsuario/form/:id', 'view/perfilAcesso/formPerfilUsuario.html', 'controllerFormPerfilUsuario');
        //Rotas Atendimento Deixar O Curso
        adicionarRota($routeProvider, '/AtendimentoDeixarOCurso/form', 'view/atendimentoDeixarOCurso/formAtendimentoDeixarOCurso.html', 'controllerFormAtendimentoDeixarOCurso');
        adicionarRota($routeProvider, '/AtendimentoDeixarOCurso/form/:id', 'view/atendimentoDeixarOCurso/formAtendimentoDeixarOCurso.html', 'controllerFormAtendimentoDeixarOCurso');
        adicionarRota($routeProvider, '/AtendimentoDeixarOCurso/list', 'view/atendimentoDeixarOCurso/ListAtendimentoDeixarOCurso.html', 'controllerListAtendimentoDeixarOCurso');
        //Rotas Atendimento Deixar O Curso Objetivo
        adicionarRota($routeProvider, '/AtendimentoDeixarOCurso/Objetivo/form', 'view/atendimentoDeixarOCurso/objetivo/cadastroObjetivo.html', 'controllerFormObjetivoDeixarOCurso');
        adicionarRota($routeProvider, '/AtendimentoDeixarOCurso/Objetivo/form/:id', 'view/atendimentoDeixarOCurso/objetivo/cadastroObjetivo.html', 'controllerFormObjetivoDeixarOCurso');
        adicionarRota($routeProvider, '/AtendimentoDeixarOCurso/Objetivo/list', 'view/atendimentoDeixarOCurso/objetivo/listagemObjetivo.html', 'controllerListObjetivoDeixarOCurso');
        //Rotas Atendimento Preventivo
        adicionarRota($routeProvider, '/AtendimentoPreventivo/form', 'view/atendimentoPreventivo/cadastroAtendimentoPreventivo.html', 'controllerFormAtendimentoPreventivo');
        adicionarRota($routeProvider, '/AtendimentoPreventivo/form/:id', 'view/atendimentoPreventivo/cadastroAtendimentoPreventivo.html', 'controllerFormAtendimentoPreventivo');
        adicionarRota($routeProvider, '/AtendimentoPreventivo/list', 'view/atendimentoPreventivo/listagemAtendimentoPreventivo.html', 'controllerListAtendimentoPreventivo');
        //Rotas Atendimento Motivo
        adicionarRota($routeProvider, '/AtendimentoMotivo/form', 'view/atendimentoMotivo/cadastroMotivo.html', 'controllerFormMotivoAtendimento');
        adicionarRota($routeProvider, '/AtendimentoMotivo/form/:id', 'view/atendimentoMotivo/cadastroMotivo.html', 'controllerFormMotivoAtendimento');
        adicionarRota($routeProvider, '/AtendimentoMotivo/list', 'view/atendimentoMotivo/listagemMotivo.html', 'controllerListMotivoAtendimento');
        //Rotas 

//       }).when('/AtendimentoDeixarOCurso/Motivo/form', {
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
        var deferred = $q.defer();


        var cookie = $cookies.get('login');

//            console.log(cookie);
        if (!cookie) {
            deferred.resolve();
            $location.path("/Login");
        } else {
            var path = $location.path();
            if (path === "/Login") {
                deferred.resolve();
                $location.path("/");
                return deferred.promise;
            }
            var now = new Date();
            $cookies.put('login', cookie, {
                expires: new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 30)
            });
            if (!validarPermissoes(deferred)) {
                growl.warning("Acesso Negado");
                $location.path("/");
            }
        }


        return deferred.promise;
    }

    function sairDoSistema($cookies) {
        var cookie = $cookies.remove('login');//('login');
        location.reload();
    }

    function validarPermissoes(deferred) {
        deferred.resolve();

        return true;
    }
}());
