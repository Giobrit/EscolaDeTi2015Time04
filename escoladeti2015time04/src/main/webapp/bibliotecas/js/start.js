AppModule = angular.module("Cadastros",['ngRoute','angularUtils.directives.dirPagination','angular-growl']);

AppModule.config(function (growlProvider){
    growlProvider.globalTimeToLive({success: 4000, error: 4000, warning: 4000, info: 4000});
    growlProvider.globalPosition('top-right');
    growlProvider.globalDisableCountDown(true);
});
