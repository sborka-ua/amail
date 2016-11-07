angular.module('aMail.directives', [])
  .directive('draftCount', draftCount)
  .directive('deleteMessage', deleteMessage)
  .directive('liveSearch', liveSearch)
  .directive('messagesCount', messagesCount)
  .directive('navbarToggle', navbarToggle)
  .directive('usersCount', usersCount)
;

/**
 * draftCount - получает от draftCountFactory список писем, удаленных в корзину
 *
 * deleteMessage - удаляет письмо в корзину
 *
 * liveSearch - запускает фильтр писем/юзеров при вводе текста в поле поиска
 *
 * messagesCount - получает список писем из messages.json,
 *	передает этот список в initCountFactory.messages,
 *	кеширует количество писем в messagesCacheFactory
 *
 * navbarToggle - кнопка, при клике показывает/скрывает меню sidebar на смартфонах
 *
 * usersCount - получает список писем из users.json,
 *	передает этот список в initCountFactory.users,
 *	кеширует количество писем в usersCacheFactory
 */

function draftCount() {
	var directive = {
		restrict: 'A',
		scope: {},
		template: '{{draftCountCtrl.draftCache.info().size}}',
		controllerAs: 'draftCountCtrl',
		controller: function(draftCountFactory) {

			this.draftCache = draftCountFactory;
		}
	};
	return directive;
}

function deleteMessage() {
	var directive = {
		restrict: 'A',
		scope: {},
		template: '<a ng-click="deleteMessageCtrl.del()" class="show-mes list-group-item"><span class="text-danger">удалить письмо</span></a>',
		controllerAs: 'deleteMessageCtrl',
		controller: function($location,
							 initCountFactory,
							 draftCountFactory,
							 messagesCacheFactory
		){
			this.del = function() {
				var index = $location.path().replace('/view-message/', '') - 1;

				draftCountFactory.put(index, initCountFactory.messages[index]);

				initCountFactory.messages[index] = null;

				// для обновления количества в кеш-фабрике
				messagesCacheFactory.remove(index);

				var deleted = angular.element(document.querySelector("#show-del-mes-button"));

				deleted.html('<span class="label label-default">письмо удалено в корзину</span>');

				deleted.css('cursor', 'default');
			};
		}
	};
	return directive;
}

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
				if ($location.path() == '/view-message/'+ $routeParams.id
					|| $location.path() == '/view-draft-message/'+ $routeParams.id
				){
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
		controller: function(messagesCacheFactory) {
			this.messagesCache = messagesCacheFactory;
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
		controller: function(usersCacheFactory) {
			this.usersCache = usersCacheFactory;
		}
	};
	return directive;
}
