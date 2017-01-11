angular.module('Zoo')
  .controller('exhibitCtrl', exhibitCtrl);

exhibitCtrl.$inject = ["$routeParams", "Exhibits"];

function exhibitCtrl ($routeParams, Exhibits){
  var ex = this;
  
  Exhibits.getOne($routeParams.exhibitID)
    .then(function(returnData){
      ex.exhibit = returnData.data;
    });
  
  ex.updateExhibit = function(){
    Exhibits.update(ex.exhibit);
    
  }
  
}