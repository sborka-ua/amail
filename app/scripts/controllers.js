angular.module('aMail.controllers', []);

/**
 * ListMessagesCtrl - вывести список писем, добавить к каждому письму email и имя пользователя
 *
 * ListUsersCtrl - вывести список пользователей
 *
 * ViewMessageCtrl - показать содержимое письма с конкретным id
 *
 * ListUserMessagesCtrl - вывести список писем пользователя с конкретным id
 */

function ListMessagesCtrl(httpGetService,
						  messagesCacheFactory,
						  usersCacheFactory,
						  liveSearchService,
						  menuActiveClassService,
						  scrollTopService
){
	var messagesCache = messagesCacheFactory;
	var usersCache = usersCacheFactory;
	var vm = this;

	vm.messages = [];
	vm.liveSearchService = liveSearchService;

	// обнулить поле живого поиска
	vm.liveSearchService.searchText = '';
	vm.liveSearchService.placeholder = 'поиск писем';

	// добавить пользователей из users.json в кеш-фабрику,
	// добавить письма из messages.json в кеш-фабрику и в массив vm.messages
	if(!usersCache.get(0)) {

		// users.json
		var usersResponseFunc = function(value, index) {
			usersCache.put(index, value);
		};

		httpGetService.httpGet('users.json',
							   usersCache,
							   usersResponseFunc,
							   httpGetService.usersRejectObj
		);

		// messages.json
		var messagesResponseFunc = function(value, index) {
			messagesCache.put(index, value);

			var userId = messagesCache.get(index).userId;

			messagesCache.get(index).name = usersCache.get(userId - 1).name;
			messagesCache.get(index).email = usersCache.get(userId - 1).email;

			vm.messages.push(messagesCache.get(index));
		};

		httpGetService.httpGet('messages.json',
							   messagesCache,
							   messagesResponseFunc,
							   httpGetService.messagesRejectObj
		);
	}

	// переопределяется объект, возвращаемый кеш-фабрикой messagesCache, добавляются свойства name и email, поэтому response нужно дублировать в блоке else и в messagesResponseFunc
	else {
		for (var index = 0; index < messagesCache.info().size; index++) {
			var userId = messagesCache.get(index).userId;

			messagesCache.get(index).name = usersCache.get(userId - 1).name;
			messagesCache.get(index).email = usersCache.get(userId - 1).email;

			vm.messages.push(messagesCache.get(index));
		}
	}

	menuActiveClassService.addClass('active', '.main-menu', '.inbox');

	scrollTopService();
}

function ListUsersCtrl(httpGetService,
					   usersCacheFactory,
					   liveSearchService,
					   menuActiveClassService,
					   scrollTopService
){
	var usersCache = usersCacheFactory;
	var vm = this;

	vm.users = [];
	vm.liveSearchService = liveSearchService;

	// обнулить поле живого поиска
	vm.liveSearchService.searchText = '';
	vm.liveSearchService.placeholder = 'поиск контактов';

	// добавить пользователей из users.json в кеш-фабрику и в массив vm.users
	// users.json
	if(!usersCache.get(0)) {

		// users.json
		var usersResponseFunc = function(value, index) {
			usersCache.put(index, value);
		};

		httpGetService.httpGet('users.json',
							   usersCache,
							   usersResponseFunc,
							   httpGetService.usersRejectObj
		);
	}

	for (var index = 0; index < usersCache.info().size; index++) {
		vm.users.push(usersCache.get(index));
	}

	menuActiveClassService.addClass('active', '.main-menu', '.users');
	
	scrollTopService();
}

function ViewMessageCtrl($routeParams,
						 httpGetService,
						 messagesCacheFactory,
						 usersCacheFactory,
						 liveSearchService,
						 menuActiveClassService
){
	var messagesCache = messagesCacheFactory;
	var usersCache = usersCacheFactory;
	var vm = this;

	vm.liveSearchService = liveSearchService;

	// обнулить поле живого поиска
	vm.liveSearchService.searchText = '';
	vm.liveSearchService.placeholder = '';

	// добавить пользователей из users.json в кеш-фабрику,
	// добавить письма из messages.json в кеш-фабрику и в массив vm.messages
	if(!usersCache.get(0)) {

		// users.json
		var usersResponseFunc = function(value, index) {
			usersCache.put(index, value);
		};

		httpGetService.httpGet('users.json',
							   usersCache,
							   usersResponseFunc,
							   httpGetService.usersRejectObj
		);

		// messages.json
		var messagesResponseFunc = function(value, index) {
			messagesCache.put(index, value);

			var userId = messagesCache.get(index).userId;

			messagesCache.get(index).name = usersCache.get(userId - 1).name;
			messagesCache.get(index).email = usersCache.get(userId - 1).email;
		};

		httpGetService.httpGet('messages.json',
							   messagesCache,
							   messagesResponseFunc,
							   httpGetService.messagesRejectObj
		);
	}

	// переопределяется объект, возвращаемый кеш-фабрикой messagesCache, добавляются свойства name и email, поэтому response нужно дублировать в блоке else и в messagesResponseFunc
	else {
		for (var index = 0; index < messagesCache.info().size; index++) {
			var userId = messagesCache.get(index).userId;

			messagesCache.get(index).name = usersCache.get(userId - 1).name;
			messagesCache.get(index).email = usersCache.get(userId - 1).email;
		}
	}

	// индекс $routeParams.id - 1, чтобы id писем совпадали с /view-message/:id
	var index = (+$routeParams.id - 1);

	if(messagesCache.get(index)) {
		vm.message = messagesCache.get(index);
	}
	// если письмо с таким индексом не существует (когда в адресную строку вбить ссылку с несуществующим id письма)
	else {
		alert('ERROR! message #'+ $routeParams.id + ' not found');

		vm.message = {
			name: '',
			email: 'error',
			title: 'Ошибка !!! message #'+ $routeParams.id + ' not found',
			body: 'Ошибка !!! message #'+ $routeParams.id + ' not found'
		};
	}

	menuActiveClassService.removeClass('active', '.main-menu');
}

function ListUserMessagesCtrl($routeParams,
					  httpGetService,
					  messagesCacheFactory,
					  usersCacheFactory,
					  liveSearchService,
					  $location,
					  menuActiveClassService,
					  scrollTopService
){
	var messagesCache = messagesCacheFactory;
	var usersCache = usersCacheFactory;
	var vm = this;

	vm.userMessages = [];
	vm.liveSearchService = liveSearchService;

	// обнулить поле живого поиска
	vm.liveSearchService.searchText = '';
	vm.liveSearchService.placeholder = 'поиск писем';

	// добавить пользователей из users.json в кеш-фабрику,
	// добавить письма из messages.json в кеш-фабрику и в массив vm.messages
	if(!usersCache.get(0)) {

		// users.json
		var usersResponseFunc = function(value, index) {
			usersCache.put(index, value);
		};

		httpGetService.httpGet('users.json',
							   usersCache,
							   usersResponseFunc,
							   httpGetService.usersRejectObj
		);

		// messages.json
		var messagesResponseFunc = function(value, index) {
			messagesCache.put(index, value);

			var userId = messagesCache.get(index).userId;

			messagesCache.get(index).name = usersCache.get(userId - 1).name;
			messagesCache.get(index).email = usersCache.get(userId - 1).email;

			if ($location.path() == '/list-user-messages/'+ userId) {
				vm.userMessages.push(messagesCache.get(index));
			}
		};

		httpGetService.httpGet('messages.json',
							   messagesCache,
							   messagesResponseFunc,
							   httpGetService.messagesRejectObj
		);
	}

	// переопределяется объект, возвращаемый кеш-фабрикой messagesCache, добавляются свойства name и email, поэтому response нужно дублировать в блоке else и в messagesResponseFunc
	else {
		for (var index = 0; index < messagesCache.info().size; index++) {
			var userId = messagesCache.get(index).userId;

			messagesCache.get(index).name = usersCache.get(userId - 1).name;
			messagesCache.get(index).email = usersCache.get(userId - 1).email;

			if ($location.path() == '/list-user-messages/'+ userId) {
				vm.userMessages.push(messagesCache.get(index));
			}
		}
	}

	menuActiveClassService.removeClass('active', '.main-menu');

	// если страница с юзерами была прокручена, то кликнув по юзеру откроются все его письма.
	// роутер обновляет только часть страницы и прокрутка останется на том же месте.
	// поэтому принудительно поднимаем страницу вверх
	window.scrollTo(0,0);

	scrollTopService();
}
