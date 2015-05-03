AppModule.config(function($routeProvider, $locationProvider) {

    $routeProvider
     .when('/PerfilAcesso/novo', {
        templateUrl: 'view/PerfilAcesso.html',
        controller: 'PerfilAcessoFormController'
    }).when('/PerfilAcesso/edit/:id', {
        templateUrl: 'view/PerfilAcesso.html',
        controller: 'PerfilAcessoFormController'
    }).when('/PerfilAcesso/lista', {
        templateUrl: 'view/ListaPerfilAcesso.html',
        controller: 'PerfilAcessoFormController'
    }).when('/', {
        templateUrl: 'view/Home.html'
    }).when('/Usuario/novo', {
        templateUrl: 'view/usuario/cadastroUsuario.html',
        controller: 'cadastroUsuarioController'      
    }).when('/Usuario/lista',{
        templateUrl: 'view/usuario/ListaUsuario.html',
        controller: 'UsuarioList'
    }).when('/Usuario/listaTeste',{
        templateUrl: 'view/usuario/listUsuario.html',
        controller: 'UsuarioList'
    });

    //verificar se é possível separar as rotas em módulos

    $locationProvider.html5Mode(false);
});