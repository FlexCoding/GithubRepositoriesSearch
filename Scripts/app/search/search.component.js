(function(){
    var category = {
        template: `<div class="input-group mb-2">
                    <input type="text" class="form-control" placeholder="Search repository" ng-model="$ctrl.searchInput" ng-keypress="$ctrl.onKeyPress($event)">
                    <div class="input-group-append">
                        <button class="btn btn-secondary" type="button" ng-click="$ctrl.search()">
                        <i class="fa fa-search"></i>
                        </button>
                    </div>
                </div>`,
        controller: ['$rootScope', '$scope', function($rootScope, $scope){
            var ctrl = this;
            ctrl.search = function(){
                var args = ctrl.searchInput;
                $rootScope.$emit('searchButtonClicked', args);
            }
            ctrl.onKeyPress = function(event){
                if (event.which === 13)
                    ctrl.search();
            }
        }]
    };

    angular
    .module("app.search")
    .component("icSearch", category);
})();

