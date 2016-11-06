angular.module('aMail.directives', [])
  .directive('draftCount', draftCount)
  .directive('deleteMessage', deleteMessage)
  .directive('liveSearch', liveSearch)
  .directive('messagesCount', messagesCount)
  .directive('navbarToggle', navbarToggle)
  .directive('usersCount', usersCount)
;

/**
 * draftCount - получает список писем, удаленных в корзину
 *
 * deleteMessage - удаляет письмо в корзину
 *
 * liveSearch - запускает фильтр писем / юзеров при вводе текста в поле поиска
 *
 * messagesCount - получает список писем из файла messages.json и кеширует
 *
 * navbarToggle - кнопка, при клике показывает/скрывает меню '.sidebar' на смартфонах
 *
 * usersCount - получает список юзеров из файла users.json и кеширует
 */

function draftCount() {
	var directive = {
		restrict: 'A',
		scope: {},
		template: '{{draftCountCtrl.draftCache.info().size}}',
		controllerAs: 'draftCountCtrl',
		controller: function(draftCountFactory) {

			this.draftCache = draftCountFactory;

// alert('1) this.draftCache.size = '+ this.draftCache.info().size);

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
							 messagesCacheFactory,
							 draftCountFactory
		){

			this.del = function() {
				var index = $location.path().replace('/view-message/', '') - 1;

// alert('5) index = '+ index);

				var temp = messagesCacheFactory.get(index);

// alert('6) temp.id = '+ temp.id);
// alert('7) temp.title = '+ temp.title);

				draftCountFactory.put(index, temp);

				messagesCacheFactory.remove(index);

// alert('9) draftCountFactory.'+ index +'.id = '+ draftCountFactory[index].id);

				var deleted = angular.element(document.querySelector("#show-del-mes-button"));
				
				deleted.html('<span class="label label-default">письмо удалено в корзину</span>');
				
				deleted.css('cursor', 'default');
			};
		} // controller ends
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
