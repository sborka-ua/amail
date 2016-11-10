angular.module('aMail.directives', [])
  .directive('draftCount', draftCount)
  .directive('deleteMessage', deleteMessage)
  .directive('footerGithub', footerGithub)
  .directive('headerGithub', headerGithub)
  .directive('liveSearch', liveSearch)
  .directive('messagesCount', messagesCount)
  .directive('navbarToggle', navbarToggle)
  .directive('sidebar', sidebar)
  .directive('scrollTop', scrollTop)
  .directive('usersCount', usersCount)
;

/**
 * draftCount - получает от draftCacheFactory список удаленных писем и выводит в sidebar
 *
 * deleteMessage - удаляет письмо в корзину
 *
 * footerGithub, headerGithub - выводят блоки GitHub в хедере и футере
 *
 * liveSearch - выводит форму с полем для поиска писем/юзеров
 *
 * messagesCount - получает от messagesCacheFactory количество писем и выводит в sidebar
 *
 * navbarToggle - кнопка, при клике плавно показывает/прячет sidebar на смартфонах
 *
 * scrollTop - кнопка, при клике плавно прокручивает страницу вверх
 *
 * sidebar - выводит sidebar меню
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

function footerGithub() {
	var directive = {
		restrict: 'E',
		replace: true,
		scope: {},
		templateUrl: 'templates/footer-github.html',
		controllerAs: 'footerGithubCtrl',
		controller: function(){}
	};
	return directive;
}

function headerGithub() {
	var directive = {
		restrict: 'E',
		replace: true,
		scope: {},
		templateUrl: 'templates/header-github.html',
		controllerAs: 'headerGithubCtrl',
		controller: function(){}
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
		controller: function($location,
							 $routeParams,
							 liveSearchService
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
		controller: function() {
			// ToggleClass 'active' with .sidebar-nav
			$('.navbar-toggle').on('click', function (event) {
				event.preventDefault();
				$('.sidebar-nav').toggleClass('active');
				$(this).toggleClass('active');
			});

			// Hide responsive navbar on clicking outside
			$(document).mouseup(function (event) {
				var target = event.target;

				 // if click target isn't the container and isn't the .navbar-toggle button ...
				if ($('.sidebar-nav').hasClass('active')
					&& (!$('.sidebar-nav').is(target)
						&& $('.sidebar-nav').has(target).length === 0
						&& !$('.navbar-toggle').is(target)
						&& $('.navbar-toggle').has(target).length === 0

						// ... or it's a tag (a, span or i) inside the container's li
						|| $('.sidebar-nav .main-menu li').find('a, span, i').is(target)
						)
					)
				{
					event.stopPropagation();
					$('.navbar-toggle').click();
				}
			});
		}
	};
	return directive;
}

function scrollTop() {
	var directive = {
		restrict: 'E',
		replace: true,
		scope: {},
		template: '<div id="scrollTop"><a title="Наверх">^ Наверх ^</a></div>',
		controllerAs: 'scrollTopCtrl',
		controller: function() {
			$(document).on('scroll', function() {
				($(document).scrollTop() > 50)
					? $('#scrollTop').fadeIn('slow') : $('#scrollTop').fadeOut('slow');
			});

			$('#scrollTop').on('mouseover', function() {
				$('#scrollTop a').css({'background': 'none repeat scroll 0px 0px rgb(230, 230, 230)', 'border': '1px solid rgb(190, 190, 190)'});
			});

			$('#scrollTop').on('mouseout', function() {
				$('#scrollTop a').css({'background': 'none repeat scroll 0px 0px rgb(240, 240, 240)', 'border': '1px solid rgb(200, 200, 200)'});
			});

			$('#scrollTop').on('click', function(event) {
				event.preventDefault();
				$('html, body').animate({scrollTop: 0}, 400);
			});
		}
	};
	return directive;
}

function sidebar() {
	var directive = {
		restrict: 'E',
		replace: true,
		scope: {},
		templateUrl: 'templates/sidebar.html',
		controllerAs: 'sidebarCtrl',
		controller: function(){}
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
