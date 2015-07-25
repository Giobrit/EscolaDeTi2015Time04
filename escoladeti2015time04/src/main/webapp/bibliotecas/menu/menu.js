/*global angular navigator*/

(function withAngular(angular) {

    'use strict';

    angular.module('mainMenu', [])
            .directive('menu', ['$window', '$compile', '$locale', '$filter', '$interpolate', function manageDirective($window, $compile, $locale, $filter, $interpolate) {
                    return {
                        'restrict': 'E',
                        'replace': true,
                        'template': '<h3>Hello World!!</h3>',
                        'scope': {
                        },
                        'link': function linkingFunction($scope, element, attr) {

                        }
                    };
                }]);
}(angular));
