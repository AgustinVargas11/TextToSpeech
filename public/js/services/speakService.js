(function (window) {
    'use strict';

    angular
        .module('app')
        .factory('SpeakService', speakService);

    speakService.$inject = ['$q', '$rootScope'];

    function speakService($q, $rootScope) {
        if (!window.SpeechSynthesisUtterance) {
          return {
            error: 'incompatible browser'
          };
        }
        const synth = window.speechSynthesis;
        let speechInstance = new SpeechSynthesisUtterance();

        speechInstance.onstart = function () {
            $rootScope.$broadcast('speech start');
        };

        speechInstance.onend = function () {
            $rootScope.$broadcast('speech done');
        };

        return {
            speak: speak,
            getVoices: getVoices,
            setOptions: setOptions
        };

        function speak() {
            synth.speak(speechInstance);
        }

        function getVoices() {
            return $q(function (resolve) {
                synth.onvoiceschanged = function () {
                    resolve(synth.getVoices());
                }
            });
        }

        function setOptions(optionsObj) {
            for (let option in optionsObj) {
                speechInstance[option] = optionsObj[option];
            }
        }
    }

})(this);
