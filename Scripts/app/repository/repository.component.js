 (function(){
    var repository = {
        template: `
                    <div class="card">
                    <img class="card-img-top" ng-src="{{::$ctrl.data.owner.avatar_url}}" alt="Repository Owner Avatar">
                    <div class="card-body">
                        <h5 class="card-title" style="min-height: 2.4em; word-break: break-word;">
                            {{::$ctrl.data.name}}
                        </h5>
                        <button ng-class="{'btn btn-primary': $ctrl.isBookamrk == false , 'btn btn-secondary': $ctrl.isBookamrk == true}"
                            ng-click="$ctrl.toggleBookmark()">
                                {{!$ctrl.isBookamrk ? 'Bookmark' : 'Unbookmark'}}
                        </button>
                    </div>
                    </div>`,
        bindings: { obj: '<' },
        controller: ['$scope', 'bookmarkService', function ($scope, bookmarkService){
            var ctrl = this;
            ctrl.data = {};
            ctrl.isBookamrk = false;
            ctrl.$onInit = function () {
                ctrl.data = ctrl.obj;
                ctrl.isBookamrk = bookmarkService.isBookmark(ctrl.data);
            }
            ctrl.toggleBookmark = function () {

                if (!ctrl.isBookamrk) {
                    bookmarkService.bookmarkRepository(ctrl.data)
                        .then(function (response) {
                        })
                        .catch(function (error) {
                        });
                } else {
                    bookmarkService.unBookmarkRepository(ctrl.data)
                        .then(function (response) {
                        })
                        .catch(function (error) {
                        });
                }
                ctrl.isBookamrk = !ctrl.isBookamrk;

                bookmarkService.getBookmarkRepositories()
                    .then(function (response) {
                        console.log("all bookmarks");
                        console.log(response);
                    })
                    .catch(function (error) {
                    }); 
                
            }

        }]
    };

    angular
    .module("app.repository")
    .component("icRepository", repository);
})();

