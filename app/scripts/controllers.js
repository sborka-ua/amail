angular.module('aMail.controllers', []);

/**
 * ListDraftMessagesCtrl - вывести список писем, удаленных в корзину
 *
 * ListMessagesCtrl - вывести список писем, добавить к каждому письму email и user.name
 *
 * ListUsersCtrl - вывести список юзеров
 *
 * ViewDraftMessageCtrl - показать содержимое удаленного в корзину письма с конкретным id
 *
 * ViewMessageCtrl - показать содержимое входящего письма с конкретным id
 *
 * ListUserMessagesCtrl - вывести список писем от пользователя с конкретным id
 */

function ListDraftMessagesCtrl(initCountFactory,
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

	for (var index = 0; index < initCountFactory.messagesCount; index++) {

		if (!vm.draftCache.get(index)) continue;

		vm.messages.push(vm.draftCache.get(index));
	}

	menuActiveClassService.addClass('active', '.main-menu', '.draft');

	scrollTopService();
}

function ListMessagesCtrl(initCountFactory,
						  liveSearchService,
						  menuActiveClassService,
						  scrollTopService
){
	var vm = this;
	vm.initCount = initCountFactory;

	vm.messages = [];
	vm.liveSearchService = liveSearchService;

	// обнулить поле живого поиска
	vm.liveSearchService.searchText = '';
	vm.liveSearchService.placeholder = 'поиск писем';

	for (var index = 0; index < initCountFactory.messagesCount; index++) {

		if (!vm.initCount.messages[index]) continue;

		var userId = vm.initCount.messages[index].userId;

		vm.initCount.messages[index].name = vm.initCount.users[userId - 1].name;
		vm.initCount.messages[index].email = vm.initCount.users[userId - 1].email;

		vm.messages.push(vm.initCount.messages[index]);
	}

	menuActiveClassService.addClass('active', '.main-menu', '.inbox');

	scrollTopService();
}

function ListUsersCtrl(initCountFactory,
					   liveSearchService,
					   menuActiveClassService,
					   scrollTopService
){
	var vm = this;
	vm.initCount = initCountFactory;

	vm.users = [];
	vm.liveSearchService = liveSearchService;

	// обнулить поле живого поиска
	vm.liveSearchService.searchText = '';
	vm.liveSearchService.placeholder = 'поиск контактов';

	for (var index = 0; index < initCountFactory.usersCount; index++) {

		if (!vm.initCount.users[index]) continue;

		vm.users.push(vm.initCount.users[index]);
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
		alert('письмо #'+ $routeParams.id + ' не найдено. Переходим на главную страницу');

		$location.path('/');
	}

	menuActiveClassService.removeClass('active', '.main-menu');
}

function ViewMessageCtrl($routeParams,
						 $location,
						 initCountFactory,
						 liveSearchService,
						 menuActiveClassService
){
	var vm = this;
	vm.initCount = initCountFactory;

	vm.liveSearchService = liveSearchService;

	// обнулить поле живого поиска
	vm.liveSearchService.searchText = '';
	vm.liveSearchService.placeholder = '';

	for (var index = 0; index < initCountFactory.messagesCount; index++) {

		if (!vm.initCount.messages[index]) continue;

		var userId = vm.initCount.messages[index].userId;

		vm.initCount.messages[index].name = vm.initCount.users[userId - 1].name;
		vm.initCount.messages[index].email = vm.initCount.users[userId - 1].email;
	}

	// индекс $routeParams.id - 1, чтобы id писем совпадали с /view-message/:id
	var index = (+$routeParams.id - 1);

	if(vm.initCount.messages[index]) {
		vm.message = vm.initCount.messages[index];
	}
	// если письмо с таким индексом не существует (когда в адресную строку вбить ссылку с несуществующим id письма)
	else {
		alert('письмо #'+ $routeParams.id + ' не найдено. Переходим на главную страницу');

		$location.path('/');
	}

	menuActiveClassService.removeClass('active', '.main-menu');
}

function ListUserMessagesCtrl($routeParams,
							  $location,
							  initCountFactory,
							  liveSearchService,
							  menuActiveClassService,
							  scrollTopService
){
	var vm = this;
	vm.initCount = initCountFactory;

	vm.userMessages = [];
	vm.liveSearchService = liveSearchService;

	// обнулить поле живого поиска
	vm.liveSearchService.searchText = '';
	vm.liveSearchService.placeholder = 'поиск писем';

	for (var index = 0; index < initCountFactory.messagesCount; index++) {

		if (!vm.initCount.messages[index]) continue;

		var userId = vm.initCount.messages[index].userId;

		vm.initCount.messages[index].name = vm.initCount.users[userId - 1].name;
		vm.initCount.messages[index].email = vm.initCount.users[userId - 1].email;

		if ($location.path() == '/list-user-messages/'+ userId) {
			vm.userMessages.push(vm.initCount.messages[index]);
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
