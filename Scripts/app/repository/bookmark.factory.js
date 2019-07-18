(function () {

    var bookmarkService = ["$http", function ($http) {

        var self = this;
        self.repositories = {};

       

        var service = {
            bookmarkRepository: bookmarkRepository,
            unBookmarkRepository: unBookmarkRepository,
            getBookmarkRepositories: getBookmarkRepositories,
            isBookmark: isBookmark
        }

        return service;

        function bookmarkRepository(repository) {

            self.repositories[("" + repository.id)] = repository;

            var request = {
                url: "/api/bookmark",
                method: "POST",
                data: repository
            }

            return $http(request)
                .then(function (response) {
                    return true;
                })
                .catch(function (error) {
                    console.log(error);
                });

        };

        function unBookmarkRepository(repository) {

            delete self.repositories[("" + repository.id)];

            var request = {
                url: "/api/bookmark/" + repository.id,
                method: "DELETE",
                data: repository
            }

            return $http(request)
                .then(function (response) {
                    return true;
                })
                .catch(function (error) {
                    console.log(error);
                });

        };

        function getBookmarkRepositories() {

            var request = {
                url: "/api/bookmark"
            }

            return $http(request)
                .then(function (response) {
                    if (response != null && response != undefined) {
                        var responseData = angular.fromJson(response).data;
                        self.repositories = responseData;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

        };

        function isBookmark(repository) {
            return ("" + repository.id) in self.repositories;
        }

    }]

    angular
        .module("app.repository")
        .factory("bookmarkService", bookmarkService);

})();