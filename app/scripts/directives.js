angular.module('aMail.directives', [])
  .directive('ngbkFocus', ngbkFocus)
  .directive('messagesCount', messagesCount)
  .directive('usersCount', usersCount)
;

// установить фокус на input-элементе
function ngbkFocus() {
	return {
		link: function(scope, element, attrs, controller) {
			element[0].focus();
		}
	};
}

// Получает список писем из файла messages и кеширует
function messagesCount() {
	var directive = {
		restrict: 'A',
		scope: {},
		template: '{{messagesCountCtrl.messagesCache.info().size}}',
		controllerAs: 'messagesCountCtrl',
		controller: function(messagesCacheFactory,
							 httpGetService
		){
			var vm = this;
			vm.messagesCache = messagesCacheFactory;

			if(!vm.messagesCache.get(0)) {
				var messagesResponseFunc = function(value, index) {
					vm.messagesCache.put(index, value);
				};

				httpGetService.httpGet('messages.json',
									   vm.messagesCache,
									   messagesResponseFunc,
									   httpGetService.messagesRejectObj
				);
			}
		} // controller ends
	};
	return directive;
}

// Получает список юзеров из файла users и кеширует
function usersCount() {
	var directive = {
		restrict: 'A',
		scope: {},
		template: '{{usersCountCtrl.usersCache.info().size}}',
		controllerAs: 'usersCountCtrl',
		controller: function(usersCacheFactory,
							 httpGetService
		){
			var vm = this;
			vm.usersCache = usersCacheFactory;

			if(!vm.usersCache.get(0)) {
				var usersResponseFunc = function(value, index) {
					vm.usersCache.put(index, value);
				};

				httpGetService.httpGet('users.json',
									   vm.usersCache,
									   usersResponseFunc,
									   httpGetService.usersRejectObj
				);
			}
		} // controller ends
	};
	return directive;
}
