angular.module('Zoo')
  .controller('homeCtrl', homeCtrl);

homeCtrl.$inject = ['$http', 'Auth', '$location'];

function homeCtrl ($http, Auth, $location) {
  var home = this;
  home.greeting = "Welcome to the Zoo";
  home.Auth = Auth; // tie the Auth service to the home Ctrl object
  home.signup = function(){
    home.signupLoad = true;
    $http
      .post('/api/users', home.signupUser)
      .then(function(returnData){
        console.log('SIGNUP : ', returnData);
        home.signupLoad = false;
        if(returnData.data._id){
          Auth.user = returnData.data
          $location.url('/dash');// redirect to dashboard
        }
      });
  }
  
  home.login = function(){
    home.loginLoad = true;
    $http
      .post('/api/users/login', home.loginUser)
      .then(function(returnData){
        console.log('LOGIN : ', returnData);
        home.loginLoad = false;
        if(returnData.data._id){
          Auth.user = returnData.data
          $location.url('/dash');// redirect to dashboard
        }
      });
  }
  
  
}