angular.module('aMail.directives', [])
  .directive('messagesCount', messagesCount)
;

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

