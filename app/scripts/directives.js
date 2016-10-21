angular.module('aMail.directives', [])
  .directive('usersCount', usersCount)
  .directive('messagesCount', messagesCount)
;

// Count contacts
function usersCount() {
	var directive = {
		restrict: 'A',
		scope: {},
		template: '{{usersCountCtrl.length}}',
		controllerAs: 'usersCountCtrl',
		controller: function(usersFactory) {
			this.length = users.length;
		}
	};
	return directive;
}

// Count messages
function messagesCount() {
	var directive = {
		restrict: 'A',
		scope: {},
		template: '{{messagesCountCtrl.length}}',
		controllerAs: 'messagesCountCtrl',
		controller: function(messagesFactory) {
			this.length = messages.length;
		}
	};
	return directive;
}

