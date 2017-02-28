(function () {
    'use strict';

    angular
        .module('app')
        .controller('MainController', mainController);

    mainController.$inject = ['$scope', '$log', 'SpeakService'];

    function mainController($scope, $log, SpeakService) {

        const vm = this;

        init('Welcome', function () {
            $log.info('Ready...');
        });

        $scope.$on('speech start', function () {
            $scope.$apply(vm.buttonState = true)
        });

        $scope.$on('speech done', function () {
            $scope.$apply(vm.buttonState = false);
        });

        function init(greeting, callback) {
            vm.person = {};
            vm.options = {};
            vm.greeting = greeting;
            vm.speak = speak;
            vm.setName = setName;
            vm.setVoice = setVoice;
            vm.setOptions = setOptions;
            vm.resetOptions = resetOptions;

            SpeakService.getVoices()
                .then(function (voices) {
                    vm.voices = voices;
                    resetOptions();
                });

            if (typeof callback === 'function') {
                callback();
            }
        }

        function setName(name, formObj) {
            if (!name) {
                return formObj.nameInput.$setValidity("valid", false);
            }
            vm.person.name = name;
        }

        function speak() {
            setOptions(vm.options);
            SpeakService.speak();
        }

        function setOptions(options) {
            SpeakService.setOptions(options);
        }

        function setVoice(voice) {
            vm.options.voice = voice;
        }

        function resetOptions() {
            vm.options = {
                volume: 1,
                text: '',
                rate: 1,
                pitch: 1
            };
        }
    }
})();