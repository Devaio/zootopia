angular.module('Zoo')
  .controller('dashCtrl', dashCtrl)

dashCtrl.$inject = ["Auth", "$location", "Exhibits"];

function dashCtrl (Auth, $location, Exhibits) {
  var dash = this;
  dash.Auth = Auth;
  Auth.checkAuth()
    .then(function(returnData){
      console.log(returnData)
      
      if(!returnData.data){
        // kick them out
        $location.url('/login'); // take them to angular login route
      }
      else{
        
        // User is logged in, set them in the service and fetch exhibit data
        
        Auth.user = returnData.data // store in Auth service so we can access it anywhere we inject Auth
        Exhibits.get()
          .then(function(returnData){
            dash.exhibits = returnData.data
        })
      }
      
    })
  
  dash.needCleaning = function(exhibit){
//     console.log(exhibit.cleaningSchedule);
    
    var day = (new Date()).getDay();
    
    switch(day) {
      case 1:
        return exhibit.cleaningSchedule.mon
        break
      case 2:
        return exhibit.cleaningSchedule.tue
        break
      case 3:
        return exhibit.cleaningSchedule.wed
        break
      case 4:
        return exhibit.cleaningSchedule.thu
        break
      case 5:
        return exhibit.cleaningSchedule.fri
        break
      default :
        return false
       
    }
    
  }
  
  
}