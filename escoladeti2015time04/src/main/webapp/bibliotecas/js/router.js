(function () {
    var idUsuario;
    var listaRotas;

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

    function validacaoLogin($q, $cookies, $http, $location, $timeout, growl) {
        var deferred = $q.defer();


        var cookie = $cookies.get('login');

//            console.log(cookie);
        if (!idUsuario) {
            idUsuario = cookie;
            carregaPermissao($http);
        } else if (cookie !== idUsuario) {
//            alert("irfuhre");
            $cookies.remove('login');
            location.reload();
        }

        deferred.resolve();
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


//            console.log(contemRota($location.path()));
//
            if (!contemRota($location.path(), $timeout)) {
                growl.warning("Acesso Negado");
                $location.path("/404");
            }
        }


        return deferred.promise;
    }

    function sairDoSistema($cookies) {
        $cookies.remove('login');//('login');
        location.reload();
    }



    function carregaPermissao(http) {
        if (!listaRotas) {
            return http.get("usuario/permissoes/listaRotas/" + idUsuario).then(onSuccess);
        }

        function onSuccess(data) {
            listaRotas = data.data;
        }
    }

    function contemRota(item, timeout) {
//        console.log(item);
        item = item.replace(/0/gi,'');
        item = item.replace(/1/gi,'');
        item = item.replace(/2/gi,'');
        item = item.replace(/3/gi,'');
        item = item.replace(/4/gi,'');
        item = item.replace(/5/gi,'');
        item = item.replace(/6/gi,'');
        item = item.replace(/7/gi,'');
        item = item.replace(/8/gi,'');
        item = item.replace(/9/gi,'');
//        console.log(item);
        if (!listaRotas) {
            return timeout(validar, 500);
        } else {
            return validar();
        }

        function validar() {
            if (!listaRotas) {
                return false;
            } else if (buscarEmArray(listaRotas, item, 'rota', ':id','') !== -1) {
                return true;
            } else {
                return false;
            }
        }
    }

}());
