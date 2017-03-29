(function () {
    'use strict';

    angular
        .module('app')
        .directive('zDepth', zDepth);

    zDepth.$inject = ['$compile', '$log'];

    function zDepth($compile, $log) {
        return {
            restrict: 'A',
            link: link
        };

        function link(scope, element, attrs) {
            const zVal = attrs.zDepth;

            if (zVal > 5) {
                 $log.warn('z-depth only accepts values from 1 to 5 - received value of ' + zVal + 'on element [' + element[0].localName + '].');
              return;
            }

            angular.element(element).addClass('z-depth-' + zVal);
            $compile(element.contents()[0])(scope);
        }
    }

})();
