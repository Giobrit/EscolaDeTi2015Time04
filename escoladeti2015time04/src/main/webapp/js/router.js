AppModule.config(function ($routeProvider, $locationProvider) {

    $routeProvider.when('/PerfilAcesso/form', {
        templateUrl: 'view/PerfilAcesso.html',
        controller: 'PerfilAcessoFormController'
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
        templateUrl: 'view/usuario/ListUsuario.html',
        controller: 'controllerListUsuario'
    }).when('/Usuario/login', {
        templateUrl: 'view/login/login.html',
        controller: ''
    }).when('/Usuario/form/alterarSenha/:id', {
        templateUrl: 'view/usuario/alterarSenhaUsuario.html',
        controller: 'controllerFormUsuario'
    }).otherwise('/', {
        templateUrl: 'view/Home.html'
    });
    
    //verificar se é possível separar as rotas em módulos

    $locationProvider.html5Mode(false);
});
