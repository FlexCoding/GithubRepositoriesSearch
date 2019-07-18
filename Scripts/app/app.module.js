(function(){
    angular
        .module("app", ['app.repository', 'app.search'])
        .run(['bookmarkService', function (bookmarkService) {
            bookmarkService.getBookmarkRepositories()
                .then(function (response) {
                })
                .catch(function (error) {
                }); 
        }]);
})();