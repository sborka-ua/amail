angular.module('aMail.controllers', []);

/**
 * ListDraftMessagesCtrl - выводит список писем, удаленных в корзину
 *
 * ListMessagesCtrl - выводит список входящих писем, добавить к каждому письму email и user.name
 *
 * ListUsersCtrl - выводит список юзеров
 *
 * ViewDraftMessageCtrl - показывает содержимое удаленного в корзину письма с конкретным id
 *
 * ViewMessageCtrl - показывает содержимое входящего письма с конкретным id
 *
 * ListUserMessagesCtrl - выводит список писем от пользователя с конкретным id
 */

function ListDraftMessagesCtrl(initCountFactory,
							   draftCacheFactory,
							   liveSearchService,
							   menuActiveClassService,
							   scrollTopService
){
	var vm = this;
	vm.initCount = initCountFactory;
	vm.draftCache = draftCacheFactory;
	vm.liveSearchService = liveSearchService;
	vm.messages = [];

	// обнулить поле живого поиска
	vm.liveSearchService.searchText = '';
	vm.liveSearchService.placeholder = 'поиск писем';

	for (var index = 0; index < vm.initCount.messagesCount; index++) {

		if (!vm.draftCache.get(index)) continue;

		vm.messages.push(vm.draftCache.get(index));
	}

	menuActiveClassService.addClass('active', '.main-menu', '.draft');

	scrollTopService();
}

function ListMessagesCtrl(initCountFactory,
						  messagesCacheFactory,
						  usersCacheFactory,
						  liveSearchService,
						  menuActiveClassService,
						  scrollTopService
){
	var vm = this;
	vm.initCount = initCountFactory;
	vm.messagesCache = messagesCacheFactory;
	vm.usersCache = usersCacheFactory;
	vm.liveSearchService = liveSearchService;
	vm.messages = [];

	// обнулить поле живого поиска
	vm.liveSearchService.searchText = '';
	vm.liveSearchService.placeholder = 'поиск писем';

	for (var index = 0; index < vm.initCount.messagesCount; index++) {

		if (!vm.messagesCache.get(index)) continue;

		var userId = vm.messagesCache.get(index).userId;

		vm.messagesCache.get(index).name = vm.usersCache.get(userId - 1).name;
		vm.messagesCache.get(index).email = vm.usersCache.get(userId - 1).email;

		vm.messages.push(vm.messagesCache.get(index));
	}

	menuActiveClassService.addClass('active', '.main-menu', '.inbox');

	scrollTopService();
}

function ListUsersCtrl(initCountFactory,
					   usersCacheFactory,
					   liveSearchService,
					   menuActiveClassService,
					   scrollTopService
){
	var vm = this;
	vm.initCount = initCountFactory;
	vm.usersCache = usersCacheFactory;
	vm.liveSearchService = liveSearchService;
	vm.users = [];

	// обнулить поле живого поиска
	vm.liveSearchService.searchText = '';
	vm.liveSearchService.placeholder = 'поиск контактов';

	for (var index = 0; index < vm.initCount.usersCount; index++) {

		if (!vm.usersCache.get(index)) continue;

		vm.users.push(vm.usersCache.get(index));
	}

	menuActiveClassService.addClass('active', '.main-menu', '.users');
	
	scrollTopService();
}

function ViewDraftMessageCtrl($routeParams,
							  $location,
							  draftCacheFactory,
							  liveSearchService,
							  menuActiveClassService
){
	var vm = this;
	vm.draftCache = draftCacheFactory;
	vm.liveSearchService = liveSearchService;

	// обнулить поле живого поиска
	vm.liveSearchService.searchText = '';
	vm.liveSearchService.placeholder = '';

	// индекс $routeParams.id - 1, чтобы id писем совпадали с /view-message/:id
	var index = (+$routeParams.id - 1);

	if(vm.draftCache.get(index)) {
		vm.message = vm.draftCache.get(index);
		vm.notFound = false;
	}
	// если письмо с таким индексом не существует (когда в адресную строку вбить ссылку с несуществующим id письма)
	else {
		vm.notFound = true;

		if(!isNaN(index)) {
			vm.notFoundText = 'В корзине нет письма № '+ (index + 1) +'!';
		}
		else {
			vm.notFoundText = 'В корзине нет такого письма!';
		}
	}

	menuActiveClassService.removeClass('active', '.main-menu');
}

function ViewMessageCtrl($routeParams,
						 $location,
						 initCountFactory,
						 messagesCacheFactory,
						 usersCacheFactory,
						 liveSearchService,
						 menuActiveClassService
){
	var vm = this;
	vm.initCount = initCountFactory;
	vm.messagesCache = messagesCacheFactory;
	vm.usersCache = usersCacheFactory;
	vm.liveSearchService = liveSearchService;

	// обнулить поле живого поиска
	vm.liveSearchService.searchText = '';
	vm.liveSearchService.placeholder = '';

	for (var index = 0; index < vm.initCount.messagesCount; index++) {

		if (!vm.messagesCache.get(index)) continue;

		var userId = vm.messagesCache.get(index).userId;

		vm.messagesCache.get(index).name = vm.usersCache.get(userId - 1).name;
		vm.messagesCache.get(index).email = vm.usersCache.get(userId - 1).email;
	}

	// индекс $routeParams.id - 1, чтобы id писем совпадали с /view-message/:id
	var index = (+$routeParams.id - 1);

	if(vm.messagesCache.get(index)) {
		vm.message = vm.messagesCache.get(index);
		vm.notFound = false;
	}
	// если письмо с таким индексом не существует (когда в адресную строку вбить ссылку с несуществующим id письма)
	else {
		vm.notFound = true;

		if(!isNaN(index)) {
			vm.notFoundText = 'Во входящих нет письма № '+ (index + 1) +'!';
		}
		else {
			vm.notFoundText = 'Во входящих нет такого письма!';
		}
	}

	menuActiveClassService.removeClass('active', '.main-menu');
}

function ListUserMessagesCtrl($routeParams,
							  $location,
							  initCountFactory,
							  messagesCacheFactory,
							  usersCacheFactory,
							  liveSearchService,
							  menuActiveClassService,
							  scrollTopService
){
	var vm = this;
	vm.initCount = initCountFactory;
	vm.messagesCache = messagesCacheFactory;
	vm.usersCache = usersCacheFactory;
	vm.liveSearchService = liveSearchService;
	vm.userMessages = [];

	// обнулить поле живого поиска
	vm.liveSearchService.searchText = '';
	vm.liveSearchService.placeholder = 'поиск писем';

	for (var index = 0; index < vm.initCount.messagesCount; index++) {

		if (!vm.messagesCache.get(index)) continue;

		var userId = vm.messagesCache.get(index).userId;

		vm.messagesCache.get(index).name = vm.usersCache.get(userId - 1).name;
		vm.messagesCache.get(index).email = vm.usersCache.get(userId - 1).email;

		if ($location.path() == '/list-user-messages/'+ userId) {
			vm.userMessages.push(vm.messagesCache.get(index));
		}
	}

	menuActiveClassService.removeClass('active', '.main-menu');

	// если страница с юзерами была прокручена, то кликнув по юзеру прокрутка останется на том же месте. прокручиваем страницу вверх
	window.scrollTo(0,0);

	scrollTopService();
}
