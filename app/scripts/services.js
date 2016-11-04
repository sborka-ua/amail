angular.module('aMail.services', [])
  .service('httpGetService', httpGetService)
  .service('liveSearchService', liveSearchService)
  .service('menuActiveClassService', menuActiveClassService)
  .factory('messagesCacheFactory', messagesCacheFactory)
  .service('scrollTopService', scrollTopService)
  .service('sidebarShowHideService', sidebarShowHideService)
  .factory('usersCacheFactory', usersCacheFactory)
;

/**
 * httpGetService($http) - $http.get запрос к json-файлу для кеширования в $cacheFactory
 * 	принимает: url, cache, responseFunc, rejectObj
 *
 * liveSearchService - в searchText получает текст из строки поиска,
 * содержимое placeholder меняется в зависимости от выбранного пункта меню
 *
 * menuActiveClassService - добавить-удалить класс 'add' элементам 'li' меню 'menu'
 *
 * messagesCacheFactory($cacheFactory) - кеш-фабрика списка писем
 *
 * scrollTopService - плавно прокручивает старницу вверх
 *
 * sidebarShowHideService - показывает/скрывает меню '.sidebar' на смартфонах
 *
 * usersCacheFactory($cacheFactory) - кеш-фабрика списка юзеров
 */

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
					alert('ERROR! users not found. status: '+ reject.status +', data: '+ reject.data);

					cache.put(0, rejectObj);
				}
			);
		}
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
