angular.module('aMail', [
  'ngRoute',
  'aMail.controllers',
  'aMail.directives',
//  'aMail.filters',
  'aMail.services'
])
.config(emailRouteConfig);

function emailRouteConfig($routeProvider) {
	$routeProvider.
	when('/', {
		templateUrl: 'templates/list-messages.html',
		controllerAs: 'listMessagesCtrl',
		controller: ListMessagesCtrl
	})
	.when('/draft', {
		templateUrl: 'templates/list-draft-messages.html',
		controllerAs: 'listDraftMessagesCtrl',
		controller: ListDraftMessagesCtrl
	})
	.when('/list-user-messages/:id', {
		templateUrl: 'templates/list-user-messages.html',
		controllerAs: 'listUserMessagesCtrl',
		controller: ListUserMessagesCtrl
	})
	.when('/users', {
		templateUrl: 'templates/list-users.html',
		controllerAs: 'listUsersCtrl',
		controller: ListUsersCtrl
	})
	.when('/view-draft-message/:id', {
		templateUrl: 'templates/view-draft-message.html',
		controllerAs: 'viewDraftMessageCtrl',
		controller: ViewDraftMessageCtrl
	})
	.when('/view-message/:id', {
		templateUrl: 'templates/view-message.html',
		controllerAs: 'viewMessageCtrl',
		controller: ViewMessageCtrl
	})
	.otherwise({
		redirectTo: '/'
	});
};
