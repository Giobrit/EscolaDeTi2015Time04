AppModule.config(function ($routeProvider, $locationProvider) {

    $routeProvider.when('/PerfilAcesso/form', {
        templateUrl: 'view/perfilAcesso/formPerfilAcesso.html',
        controller: 'controllerFormPerfilAcesso'
    }).when('/PerfilAcesso/list', {
        templateUrl: 'view/perfilAcesso/listPerfilAcesso.html',
        controller: 'controllerListPerfilAcesso'
    }).when('/PerfilAcesso/formPerfilUsuario', {
        templateUrl: 'view/perfilAcesso/formPerfilUsuario.html',
        controller: 'controllerFormPerfilUsuario'
    }).when('/PerfilAcesso/edit/:id', {
        templateUrl: 'view/PerfilAcesso.html',
        controller: 'PerfilAcessoFormController'
    }).when('/PerfilAcesso/lista', {
        templateUrl: 'view/ListaPerfilAcesso.html',
        controller: 'PerfilAcessoFormController'
    }).when('/Usuario/form', {
        templateUrl: 'view/usuario/cadastroUsuario.html',
        controller: 'controllerFormUsuario'
    }).when('/Usuario/form/:id', {
        templateUrl: 'view/usuario/cadastroUsuario.html',
        controller: 'controllerFormUsuario'
    }).when('/Usuario/list', {
        templateUrl: 'view/usuario/ListagemUsuario.html',
        controller: 'controllerListUsuario'
    }).when('/AtendimentoDeixarOCurso/list', {
        templateUrl: 'view/atendimentoDeixarOCurso/ListAtendimentoDeixarOCurso.html',
        controller: ''    
    }).when('/Usuario/login', {
        templateUrl: 'view/login/login.html',
        controller: ''
    }).when('/Usuario/form/alterarSenha/:id', {
        templateUrl: 'view/usuario/alterarSenhaUsuario.html',
        controller: 'controllerFormUsuario'
    }).when('/AtendimentoDeixarOCurso/form', {
        templateUrl: 'view/atendimentoDeixarOCurso/cadastroAtendimentoDeixarOCurso.html',
        controller: 'controllerFormAtendimentoDeixarOCurso'
    }).when('/AtendimentoDeixarOCurso/Objetivo/form', {
        templateUrl: 'view/atendimentoDeixarOCurso/objetivo/cadastroObjetivo.html',
        controller: 'controllerFormObjetivoDeixarOCurso'
    }).when('/AtendimentoDeixarOCurso/Objetivo/form/:id', {
        templateUrl: 'view/atendimentoDeixarOCurso/objetivo/cadastroObjetivo.html',
        controller: 'controllerFormObjetivoDeixarOCurso'
    }).when('/AtendimentoDeixarOCurso/Objetivo/list', {
        templateUrl: 'view/atendimentoDeixarOCurso/objetivo/listagemObjetivo.html',
        controller: 'controllerListObjetivoDeixarOCurso'
    }).when('/AtendimentoDeixarOCurso/Motivo/form', {
        templateUrl: 'view/atendimentoDeixarOCurso/motivo/cadastroMotivo.html',
        controller: 'controllerFormMotivoAtendimentoDeixarOCurso'
    }).when('/AtendimentoDeixarOCurso/Motivo/list', {
        templateUrl: 'view/atendimentoDeixarOCurso/motivo/listagemMotivo.html',
        controller: 'controllerListMotivoAtendimentoDeixarOCurso'
    }).when('/AtendimentoDeixarOCurso/Motivo/form/:id', {
        templateUrl: 'view/atendimentoDeixarOCurso/motivo/cadastroMotivo.html',
        controller: 'controllerFormMotivoAtendimentoDeixarOCurso'
    }).when('/AtendimentoDeixarOCurso/form', {
        templateUrl: 'view/atendimentoDeixarOCurso/formAtendimentoDeixarOCurso.html',
        controller: 'controllerFormAtendimentoDeixarOCurso'
    }).when('/AtendimentoDeixarOCurso/form/:id', {
        templateUrl: 'view/atendimentoDeixarOCurso/formAtendimentoDeixarOCurso.html',
        controller: 'controllerFormAtendimentoDeixarOCurso'
    }).otherwise('/', {
        templateUrl: 'view/Home.html'
    });

    //verificar se é possível separar as rotas em módulos

    $locationProvider.html5Mode(false);
});
