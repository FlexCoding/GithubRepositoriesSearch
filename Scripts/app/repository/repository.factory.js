(function(){

    var repositoryService = ["$http", function($http) {
 
     var service = {
         getRepositories: getRepositories
     }
 
     return service;
 
     function getRepositories(searchString, page){
     
         var request = {
             url: "https://api.github.com/search/repositories?q=" + searchString + "&page=" + page
         }
 
         return $http(request)
         .then(function(response){
             return angular.fromJson(response).data;
         })
         .catch(function(error){
             console.log(error);
         });
         
     };
 
    }]
 
     angular
     .module("app.repository")
     .factory("repositoryService", repositoryService);
 
 })();