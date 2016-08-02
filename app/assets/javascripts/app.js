// Angular app.
(function() {
  var app = angular.module('wars',[]);
  app.controller('EmailController', ['$http', function($http) {
    this.emailAddress ='';
    this.postEmail = function postEmail() {
      console.log('EmailController emailAddress: ' + this.emailAddress);
      postNewEmailAddress($http, this.emailAddress);
      this.emailAddress ='';
      $.modal.close(); 
    };

    function postNewEmailAddress($http, emailAddress) {
      $http({
        url: 'https://email-elephant.herokuapp.com/emails',
        method: "POST",
        data: JSON.stringify({email: {address: emailAddress, api_key: 'ea7cbe8fd41512f3'}}),
        headers: {'Content-Type': 'application/json'}}
      ).then(function successCallback(response) {
        console.log('successCallback' + response);
      }, function errorCallback(response) {
        console.log('errorCallback' + response);
      });
    }
  }]);
})();