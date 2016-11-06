angular.module('aMail.controllers', []);

/**
 * ListDraftMessagesCtrl - вывести список писем, удаленных в корзину
 *
 * ListMessagesCtrl - вывести список писем, добавить к каждому письму
 * 	email и имя пользователя
 *
 * ListUsersCtrl - вывести список пользователей
 *
 * ViewDraftMessageCtrl - показать содержимое удаленного в корзину письма с конкретным id
 *
 * ViewMessageCtrl - показать содержимое письма с конкретным id
 *
 * ListUserMessagesCtrl - вывести список писем пользователя с конкретным id
 */

function ListDraftMessagesCtrl(initMessagesCountFactory,
							   draftCountFactory,
							   liveSearchService,
							   menuActiveClassService,
							   scrollTopService
){
	var vm = this;
	vm.messages = [];

	vm.draftCache = draftCountFactory;
	vm.liveSearchService = liveSearchService;

	// обнулить поле живого поиска
	vm.liveSearchService.searchText = '';
	vm.liveSearchService.placeholder = 'поиск писем';

	for (var index = 0; index < initMessagesCountFactory.messagesCount; index++) {

		if (!vm.draftCache.get(index)) continue;

		vm.messages.push(vm.draftCache.get(index));
	}

	menuActiveClassService.addClass('active', '.main-menu', '.draft');

	scrollTopService();
}

function ListMessagesCtrl(httpGetService,
						  initMessagesCountFactory,
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
		for (var index = 0; index < initMessagesCountFactory.messagesCount; index++) {

			if (!messagesCache.get(index)) continue;

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

		if (!usersCache.get(index)) continue;

		vm.users.push(usersCache.get(index));
	}

	menuActiveClassService.addClass('active', '.main-menu', '.users');
	
	scrollTopService();
}

function ViewDraftMessageCtrl($routeParams,
							  $location,
							  draftCountFactory,
							  liveSearchService,
							  menuActiveClassService
){
	var vm = this;

	vm.liveSearchService = liveSearchService;

	// обнулить поле живого поиска
	vm.liveSearchService.searchText = '';
	vm.liveSearchService.placeholder = '';

	var index = (+$routeParams.id - 1);

	if(draftCountFactory.get(index)) {
		vm.message = draftCountFactory.get(index);
	}
	// если письмо с таким индексом не существует (когда в адресную строку вбить ссылку с несуществующим id письма)
	else {
		alert('Ошибка! письмо #'+ $routeParams.id + ' не найдено. переходим на главную страницу');

		$location.path('/');
	}

	menuActiveClassService.removeClass('active', '.main-menu');
}

function ViewMessageCtrl($routeParams,
						 $location,
						 initMessagesCountFactory,
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
		for (var index = 0; index < initMessagesCountFactory.messagesCount; index++) {

			if (!messagesCache.get(index)) continue;

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
		alert('Ошибка! письмо #'+ $routeParams.id + ' не найдено. переходим на главную страницу');

		$location.path('/');
	}

	menuActiveClassService.removeClass('active', '.main-menu');
}

function ListUserMessagesCtrl($routeParams,
							  $location,
							  initMessagesCountFactory,
							  httpGetService,
							  messagesCacheFactory,
							  usersCacheFactory,
							  liveSearchService,
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
		for (var index = 0; index < initMessagesCountFactory.messagesCount; index++) {

			if (!messagesCache.get(index)) continue;

			var userId = messagesCache.get(index).userId;

			messagesCache.get(index).name = usersCache.get(userId - 1).name;
			messagesCache.get(index).email = usersCache.get(userId - 1).email;

			if ($location.path() == '/list-user-messages/'+ userId) {
				vm.userMessages.push(messagesCache.get(index));
			}
		}
	}

	// если во входящих нет писем этого пользователя (например, все были удалены в корзину) тогда переходим на главную страницу
	if (!vm.userMessages.length) {
		alert('Во входящих нет писем этого пользователя. Переходим на главную страницу');

		$location.path('/');
	}

	menuActiveClassService.removeClass('active', '.main-menu');

	// если страница с юзерами была прокручена, то кликнув по юзеру откроются все его письма.
	// роутер обновляет только часть страницы и прокрутка останется на том же месте.
	// поэтому принудительно поднимаем страницу вверх
	window.scrollTo(0,0);

	scrollTopService();
}
