describe('main controller', function () {
    let $controller;
    let $scope;
    let mainCtrl;

    beforeEach(function () {
        module('app');
        
        inject(function (_$controller_, $rootScope) {
            $controller = _$controller_;
            $scope = $rootScope.$new();
            mainCtrl = $controller('MainController', { $scope: $scope });
        });
    });

    it('should be defined', function () {
        expect($controller).toBeDefined();
    });

    describe('init function', function () {
        it('should set greeting', function () {
            expect(mainCtrl.greeting).toEqual('Welcome');
        });
    });
});