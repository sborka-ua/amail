angular.module('aMail.directives', [])
  .directive('liveSearch', liveSearch)
  .directive('messagesCount', messagesCount)
  .directive('navbarToggle', navbarToggle)
  .directive('usersCount', usersCount)
;

/**
 * liveSearch - запускает фильтр сообщений / юзеров при вводе текста в поле поиска
 *
 * messagesCount - получает список писем из файла messages.json и кеширует
 *
 * navbarToggle - кнопка, при клике показывает/скрывает меню '.sidebar' на смартфонах
 *
 * usersCount - получает список юзеров из файла users.json и кеширует
 */

function liveSearch() {
	var directive = {
		restrict: 'E',
		replace: true,
		scope: {},
		templateUrl: 'templates/live-search.html',
		controllerAs: 'liveSearchCtrl',
		controller: function (liveSearchService,
							  $location,
							  $routeParams
		){
			var vm = this;
			vm.liveSearchService = liveSearchService;

			vm.ifViewingMessage = function() {
				if ($location.path() == '/view-message/'+ $routeParams.id) {
					vm.liveSearchService.placeholder = 'поиск отключен';
					return true;
				}
			}

			vm.reset = function() {
				vm.liveSearchService.searchText = '';
			}
		}
	};
	return directive;
}

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
		}
	};
	return directive;
}

function navbarToggle() {
	var directive = {
		restrict: 'E',
		replace: true,
		scope: {},
		templateUrl: 'templates/navbar-toggle.html',
		controllerAs: 'navbarToggleCtrl',
		controller: function (sidebarShowHideService) {
			sidebarShowHideService();
		}
	};
	return directive;
}

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
		}
	};
	return directive;
}
