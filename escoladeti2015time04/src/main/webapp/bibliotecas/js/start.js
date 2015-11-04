AppModule = angular.module("Cadastros", ['ngRoute', 'angularUtils.directives.dirPagination', 'angular-growl', '720kb.datepicker', 'mgcrea.ngStrap', 'ngAnimate', 'ngSanitize', 'acute.select', 'ngCookies', 'ngAnimate', 'ngTouch','mainMenu','angularjs-dropdown-multiselect','toggle-switch']);

AppModule.config(function (growlProvider, $typeaheadProvider) {
    growlProvider.globalTimeToLive({success: 4000, error: 4000, warning: 4000, info: 4000});
    growlProvider.globalPosition('top-right');
    growlProvider.globalDisableCountDown(true);

    angular.extend($typeaheadProvider.defaults, {
        minLength: 1,
        limit: 8
    });
});