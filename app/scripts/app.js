angular.module('aMail', ['ngRoute', 'aMail.controllers', 'aMail.directives', 'aMail.filters', 'aMail.services'])
  .config(emailRouteConfig)
;

function emailRouteConfig($routeProvider) {
	$routeProvider
	.when('/', {
		controller: ListCtrl,
		controllerAs: 'listCtrl',
		templateUrl: 'templates/list.html'
	})
	.when('/view/:id', {
		controller: DetailCtrl,
		controllerAs: 'detailCtrl',
		templateUrl: 'templates/detail.html'
	})
	.otherwise({
		redirectTo: '/'
	});
};

