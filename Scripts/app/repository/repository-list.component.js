(function(){
    var repositoryList = {
        template: `<div class='d-flex flex-wrap justify-content-around'>
                        <div style="flex: 1 0 30%" class="m-2" ng-repeat="repository in $ctrl.repositories">
                            <ic-repository obj="::repository">    
                            </ic-repository>
                        </div>
                        <div class="d-flex justify-content-around w-100">
                            <button ng-hide="$ctrl.hideLoadButton" class="btn btn-primary mt-4" ng-click="$ctrl.load(true)">Load More</button>
                        </div>
                    </div>`,
        controller: ['$rootScope', 'repositoryService', function($rootScope, repositoryService){
            var ctrl = this;
            ctrl.repositories = [];
            ctrl.search = "";
            ctrl.page = 1;
            ctrl.hideLoadButton;
            ctrl.hideLoadButton = true;

            ctrl.load = function (loadMore) {
                repositoryService.getRepositories(ctrl.search, ctrl.page)
                    .then(function (response) {
                        if(loadMore)
                            ctrl.repositories.push.apply(ctrl.repositories, response.items);
                        else
                            ctrl.repositories = response.items;
                        ctrl.checkIfHideButton(response.total_count);
                        ctrl.page++;
                    })
                    .catch(function (error) {
                    });
            }

            ctrl.checkIfHideButton = function (repositoryCount) {
                ctrl.hideLoadButton = (30 * ctrl.page) >= repositoryCount;
            }

            $rootScope.$on('searchButtonClicked', function (event, args) {
                ctrl.search = args;
                ctrl.page = 1;
                ctrl.load(false); 
            });
        }]
    };

    angular
    .module("app.repository")
    .component("icRepositoryList", repositoryList);
})();
