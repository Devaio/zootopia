angular.module('Zoo')
  .factory('Exhibits', Exhibits);
   
Exhibits.$inject = ["$http", "Upload"];           
           
function Exhibits ($http, Upload) {
  
  
 return {
   
   get : function(){
     return $http.get('/api/exhibits')
   },
   getOne : function(id){
     return $http.get('/api/exhibits/' + id)
   },
   update : function(exhibitObj){
//      return $http.post('/api/exhibits/' + exhibitObj._id, exhibitObj)
     
     return Upload.upload({
       url : '/api/exhibits/' + exhibitObj._id,
       method : 'POST',
       data : {
         files : exhibitObj.photo,
         data  : exhibitObj
       }
     })
   }
 }
}