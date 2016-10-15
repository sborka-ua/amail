angular.module('aMail', ['ngRoute' /* , 'aMail.controllers' */ ])
  .config(emailRouteConfig)
  .filter('arrayToStringComaSeparated', arrayToStringComaSeparated)
  .factory('messagesFactory', messagesFactory)
  .directive('messagesCount', messagesCount)
;

function arrayToStringComaSeparated() {
	return function(arr, scope) {
		if (arr.length)
			return '<'+ arr.join('>, <') +'>';
	}
}

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

// Counting messages
function messagesCount() {
	var directive = {
		restrict: 'A',
		scope: {},
		bindToController: true,
		template: '{{messagesCountCtrl.messagesLength}}',
		controllerAs: 'messagesCountCtrl',
		controller: MessagesCountCtrl
	};
	return directive;
}

// Some fake emails
function messagesFactory() {
	return messages = [
	  {
	id: 0,
	sender: 'jean@somecompany.com',
	subject: 'Hi there, old friend',
	date: 'Dec 7, 2013 12:32:00',
	recipients: ['greg@somecompany.com', 'maria@somecompany.com', 'bill@somecompany.com'],
	message: 'Hey, we should get together for lunch sometime and catch up.'
	+'There are many things we should collaborate on this year.'
	  },
	  {
	id: 1,
	sender: 'maria@somecompany.com',
	subject: 'Where did you leave my laptop?',
	date: 'Dec 7, 2013 8:15:12',
	recipients: ['bill@somecompany.com'],
	message: 'I thought you were going to put it in my desk drawer.'
	+'But it does not seem to be there.'
	  },
	  {
	id: 2,
	sender: 'bill@somecompany.com',
	subject: 'Lost python',
	date: 'Dec 6, 2013 20:35:02',
	recipients: ['greg@somecompany.com', 'jean@somecompany.com'],
	message: "Nobody panic, but my pet python is missing from her cage."
	+"She doesn't move too fast, so just call me if you see her."
	  }
	];
}

function DetailCtrl($routeParams) {
	this.message = messages[$routeParams.id];
}

function MessagesCountCtrl(messagesFactory) {
	this.messagesLength = messages.length;
}

function ListCtrl(messagesFactory) {
	this.messages = messages;
}
