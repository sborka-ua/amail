angular.module('aMail', [
  'ngRoute',
  'aMail.controllers',
  'aMail.directives',
//  'aMail.filters',
  'aMail.services'
])

.config(emailRouteConfig)
.run(httpGetRun)
;

/**
 * httpGetService - $http.get запросы к json-файлам для кеширования в $cacheFactory
 */

function emailRouteConfig($routeProvider) {
	$routeProvider.
	when('/', {
		templateUrl: 'templates/list-messages.html',
		controllerAs: 'listMessagesCtrl',
		controller: ListMessagesCtrl
	})
	.when('/draft', {
		templateUrl: 'templates/list-draft-messages.html',
		controllerAs: 'listDraftMessagesCtrl',
		controller: ListDraftMessagesCtrl
	})
	.when('/list-user-messages/:id', {
		templateUrl: 'templates/list-user-messages.html',
		controllerAs: 'listUserMessagesCtrl',
		controller: ListUserMessagesCtrl
	})
	.when('/users', {
		templateUrl: 'templates/list-users.html',
		controllerAs: 'listUsersCtrl',
		controller: ListUsersCtrl
	})
	.when('/view-draft-message/:id', {
		templateUrl: 'templates/view-draft-message.html',
		controllerAs: 'viewDraftMessageCtrl',
		controller: ViewDraftMessageCtrl
	})
	.when('/view-message/:id', {
		templateUrl: 'templates/view-message.html',
		controllerAs: 'viewMessageCtrl',
		controller: ViewMessageCtrl
	})
	.otherwise({
		redirectTo: '/'
	});
};

function httpGetRun($http,
					initCountFactory,
					messagesCacheFactory,
					usersCacheFactory
			  
){
	var vm = this;
	vm.initCount = initCountFactory;
	vm.messagesCache = messagesCacheFactory;
	vm.usersCache = usersCacheFactory;

	$http.get('messages.json').then(
		function(response) {
			angular.forEach(response.data, function(value, index) {
				vm.initCount.messages[index] = value;
				vm.messagesCache.put(index, index);
			});

			vm.initCount.messagesCount = vm.messagesCache.info().size;
		},

		function(reject) {
			alert('Ошибка загрузки данных из messages.json, status: '+ reject.status +', data: '+ reject.data);

			vm.initCount.messages[0] = {
				userId: 'error',
				id: '',
				title: 'Ошибка! Письма не найдены.',
				body: ''
			};
		}
	);

	$http.get('users.json').then(
		function(response) {
			angular.forEach(response.data, function(value, index) {
				vm.initCount.users[index] = value;
				vm.usersCache.put(index, index);
			});

			vm.initCount.usersCount = vm.usersCache.info().size;
		},

		function(reject) {
			alert('Ошибка загрузки данных из users.json, status: '+ reject.status +', data: '+ reject.data);

			vm.initCount.users[0] = {
				username: 'error',
				address: '',
				email: '',
				name: 'Ошибка! Пользователь не найден.'
			};
		}
	);
}
