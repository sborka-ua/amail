angular.module('aMail.directives', [])
  .directive('draftCount', draftCount)
  .directive('deleteMessage', deleteMessage)
  .directive('liveSearch', liveSearch)
  .directive('messagesCount', messagesCount)
  .directive('navbarToggle', navbarToggle)
  .directive('usersCount', usersCount)
;

/**
 * draftCount - получает от draftCacheFactory список писем, удаленных в корзину и
 *	выводит в sidebar
 *
 * deleteMessage - удаляет письмо в корзину
 *
 * liveSearch - запускает фильтр писем/юзеров при вводе текста в поле поиска
 *
 * messagesCount - получает от messagesCacheFactory количество писем и выводит в sidebar
 *
 * navbarToggle - кнопка, при клике показывает/скрывает sidebar на смартфонах
 *
 * usersCount - получает от usersCacheFactory количество юзеров и выводит в sidebar
 */

function draftCount() {
	var directive = {
		restrict: 'A',
		scope: {},
		template: '{{draftCountCtrl.draftCache.info().size}}',
		controllerAs: 'draftCountCtrl',
		controller: function(draftCacheFactory) {
			this.draftCache = draftCacheFactory;
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
							 draftCacheFactory,
							 messagesCacheFactory
		){
			var vm = this;
			vm.messagesCache = messagesCacheFactory;
			vm.draftCache = draftCacheFactory;

			vm.del = function() {
				var index = $location.path().replace('/view-message/', '') - 1;

				vm.draftCache.put(index, vm.messagesCache.get(index));

				vm.messagesCache.remove(index);

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
