angular.module('aMail', [
  'ngResource',
  'ngRoute',
  'aMail.controllers',
  'aMail.directives',
  'aMail.filters',
  'aMail.services'
]).
config(emailRouteConfig)
;

function emailRouteConfig($routeProvider) {
	$routeProvider.
	when('/', {
		templateUrl: 'templates/list-messages.html',
		controllerAs: 'listMessagesCtrl',
		controller: ListMessagesCtrl
	}).
	when('/contacts', {
		templateUrl: 'templates/list-users.html',
		controllerAs: 'listUsersCtrl',
		controller: ListUsersCtrl
	}).
	when('/view-message/:id', {
		templateUrl: 'templates/view-message.html',
		controllerAs: 'viewMessageCtrl',
		controller: ViewMessageCtrl
	}).
	otherwise({
		redirectTo: '/'
	});
};
