(function () {
  'use strict';

  angular
    .module('app')
    .controller('MainController', mainController);

  mainController.$inject = ['$scope', '$log', '$timeout', 'SpeakService'];

  function mainController($scope, $log, $timeout, SpeakService) {

    const vm = this;

    init('Welcome', function () {
      $log.info('Ready...');
      // spinner exit was too abrupt
      $timeout(function () {
        vm.loading = false;
      }, 300);
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
      vm.greeting = greeting || 'Hello';
      vm.speak = speak;
      vm.setName = setName;
      vm.setVoice = setVoice;
      vm.resetOptions = resetOptions;

      if (SpeakService.error) {
        vm.loading = false;
        vm.error = 'Internet Explorer does not support the speech API. Please use a different browser.';
        return;
      }

      vm.setOptions = SpeakService.setOptions;

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

    function speak(delay) {
      SpeakService.setOptions(vm.options);
      $timeout(SpeakService.speak, delay);
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
