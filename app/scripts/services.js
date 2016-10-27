angular.module('aMail.services', [])
  .service('httpGetService', httpGetService)
  .service('menuActiveClassService', menuActiveClassService)
  .factory('messagesCacheFactory', messagesCacheFactory)
  .factory('usersCacheFactory', usersCacheFactory)
;

// $http.get запрос к json-файлу для кеширования в $cacheFactory. принимает: url, cache, responseFunc, rejectObj
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
		} // httpGet ends
	}
}

// добавить-удалить класс 'add' элементам 'li' меню 'menu'
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

// кеш списка писем
function messagesCacheFactory($cacheFactory) {
	return $cacheFactory('messages-сache');
}

// кеш списка пользователей
function usersCacheFactory($cacheFactory) {
	return $cacheFactory('users-сache');
}
