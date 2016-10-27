angular.module('aMail.controllers', []);

var ListMessagesCtrl,
	ListUsersCtrl,
	ViewMessageCtrl;

// вывести список писем, добавить к каждому письму email и имя пользователя
ListMessagesCtrl = function(httpGetService,
							messagesCacheFactory,
							usersCacheFactory,
							menuActiveClassService
){
	var messagesCache = messagesCacheFactory;
	var usersCache = usersCacheFactory;
	var vm = this;

	vm.messages = [];

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
}

// вывести список пользователей
ListUsersCtrl = function(httpGetService,
						 usersCacheFactory,
						 menuActiveClassService
){
	var usersCache = usersCacheFactory;
	var vm = this;
	
	vm.users = [];

	if(!usersCache.get(0)) {
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

	menuActiveClassService.addClass('active', '.main-menu', '.contacts');
}

// показать содержимое письма с конкретным id
ViewMessageCtrl = function($routeParams,
						   httpGetService,
						   messagesCacheFactory,
						   usersCacheFactory,
						   menuActiveClassService
){
	var messagesCache = messagesCacheFactory;
	var usersCache = usersCacheFactory;

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
		this.message = messagesCache.get(index);
	}
	// если письмо с таким индексом не существует (когда в адресную строку вбить ссылку с несуществующим id письма)
	else {
		alert('ERROR! message #'+ (+$routeParams.id) + ' not found');

		this.message = {
			name: '',
			email: 'error',
			title: 'Ошибка !!! message #'+ (+$routeParams.id) + ' not found',
			body: 'Ошибка !!! message #'+ (+$routeParams.id) + ' not found'
		};
	}

	menuActiveClassService.removeClass('active', '.main-menu');
}
