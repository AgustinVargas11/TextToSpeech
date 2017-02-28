(function () {
    'use strict';

    angular
        .module('app')
        .directive('ngOnEnter', onEnter);

    function onEnter() {

        return {
            restrict: 'A',
            link: link
        };

        function link(scope, element, attrs) {
            element.bind('keydown keypress', function (e) {
                if (e.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngOnEnter);
                    });

                    e.preventDefault();
                }
            });
        }
    }

})();