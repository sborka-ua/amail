angular.module('aMail.services', [])
  .factory('draftCountFactory', draftCountFactory)
  .service('httpGetService', httpGetService)
  .factory('initCountFactory', initCountFactory)
  .service('liveSearchService', liveSearchService)
  .service('menuActiveClassService', menuActiveClassService)
  .factory('messagesCacheFactory', messagesCacheFactory)
  .service('scrollTopService', scrollTopService)
  .service('sidebarShowHideService', sidebarShowHideService)
  .factory('usersCacheFactory', usersCacheFactory)
;

/**
 * draftCountFactory - кеш-фабрика хранит письма, удаленные в корзину и
 *	показывает в sidebar счетчик удаленных писем
 *
 * httpGetService($http) - $http.get запросы к json-файлам для кеширования в $cacheFactory
 * 	принимает: url, cache, responseFunc, rejectObj
 *
 * initCountFactory - хранит письма и юзеров из json-файлов для правильного показа
 *	списка писем в html-шаблонах после удалений писем в корзину,
 *	также отдельно хранит начальное количество писем и юзеров
 *
 * liveSearchService - в searchText получает текст из строки поиска,
 *	содержимое placeholder меняется в зависимости от выбранного пункта меню
 *
 * menuActiveClassService - добавляет-удаляет класс 'add' элементам 'li' меню 'menu'
 *
 * messagesCacheFactory($cacheFactory) - кеш-фабрика хранит список писем для счетчика
 *
 * scrollTopService - плавно прокручивает старницу вверх
 *
 * sidebarShowHideService - показывает/скрывает меню '.sidebar' на смартфонах
 *
 * usersCacheFactory($cacheFactory) - кеш-фабрика хранит список юзеров для счетчика
 */

function draftCountFactory($cacheFactory) {
	return $cacheFactory('draft-count-сache');
}

function httpGetService($http) {
	return {
		messagesRejectObj: {
			userId: 'error',
			id: '',
			title: 'Ошибка !!! messages not found',
			body: ''
		},

		usersRejectObj: {
			username: 'error',
			address: '',
			email: '',
			name: 'Ошибка !!! users not found'
		},

		httpGet: function(url, cache, responseFunc, rejectObj) {
			return $http.get(url).then(
				function(response) {
					angular.forEach(response.data, function(value, index) {
						responseFunc(value, index);
					});
				},

				function(reject) {
					alert('Пользователь не найден. status: '+ reject.status +', data: '+ reject.data);

					cache[0] = rejectObj;
				}
			);
		}
	}
}

function initCountFactory() {
	return {
		usersCount: 10,
		messagesCount: 100,
		users: {},
		messages: {}
	}
}

function liveSearchService() {
	return {
		searchText: '',
		placeholder: 'живой поиск'
	}
}

function menuActiveClassService() {
	var addClass, removeClass;

	// find(li): здесь li - не набор тегов LI, а конкретный тег, имеющий свой класс.
	// при вызове в контролере, вместо этого li нужно указать его класс
	addClass = function(add, menu, li) {
		removeClass(add, menu);
		angular.element(document.querySelector(menu)).find(li).addClass(add);
	}

	// find('li'): здесь 'li' - массив всех тегов LI в меню
	removeClass = function(add, menu) {
		angular.element(document.querySelector(menu)).find('li').removeClass(add);
	}

	return {
		addClass: addClass,
		removeClass: removeClass
	}
}

function messagesCacheFactory($cacheFactory) {
	return $cacheFactory('messages-сache');
}

function scrollTopService() {
	return function() {
		$(document).on('scroll', function() {
			($(document).scrollTop() > 200)
				? $('#scrollTop').fadeIn('slow') : $('#scrollTop').fadeOut('slow');
		});

		$('#scrollTop').on('mouseover', function() {
			$('#scrollTop a').css({'background': 'none repeat scroll 0% 0% rgb(230, 230, 230)', 'border': '1px solid rgb(190, 190, 190)'});
		});

		$('#scrollTop').on('mouseout', function() {
			$('#scrollTop a').css({'background': 'none repeat scroll 0% 0% rgb(240, 240, 240)', 'border': '1px solid rgb(200, 200, 200)'});
		});

		$('#scrollTop').on('click', function(event) {
			event.preventDefault();
			$('html, body').animate({scrollTop: 0}, 400);
		});
	};
}

function sidebarShowHideService() {
	return function(){
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
	};
}

function usersCacheFactory($cacheFactory) {
	return $cacheFactory('users-сache');
}
