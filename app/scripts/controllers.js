angular.module('aMail.controllers', [])
//  .controller('AvaCtrl', AvaCtrl)
;

// вывести список писем
function ListMessagesCtrl(messagesFactory, menuActiveClassService) {
	this.messages = messages;

	menuActiveClassService.addClass('active', '.main-menu', '.inbox');
}

// вывести список пользователей
function ListUsersCtrl(usersFactory, menuActiveClassService) {
	this.users = users;

	menuActiveClassService.addClass('active', '.main-menu', '.contacts');
}

// показать содержимое письма с конкретным id
function ViewMessageCtrl($routeParams, menuActiveClassService) {
	this.message = messages[$routeParams.id];

	menuActiveClassService.removeClass('active', '.main-menu');
}

/**
function AvaCtrl() {
	this.users = [];

		this.users.push('https://randomuser.me/api/portraits/thumb/men/7.jpg');
		this.users.push('https://randomuser.me/api/portraits/thumb/men/71.jpg');
		this.users.push('https://randomuser.me/api/portraits/thumb/men/86.jpg');
		this.users.push('https://randomuser.me/api/portraits/thumb/women/6.jpg');
		this.users.push('https://randomuser.me/api/portraits/thumb/women/12.jpg');
		this.users.push('https://randomuser.me/api/portraits/thumb/women/21.jpg');
		this.users.push('https://randomuser.me/api/portraits/thumb/women/64.jpg');
		this.users.push('https://randomuser.me/api/portraits/thumb/women/82.jpg');
}

 * men: 86, 71, 7
 * women: 6, 12, 64, 82, 21
 */
