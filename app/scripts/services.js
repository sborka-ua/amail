angular.module('aMail.services', [])
  .service('menuActiveClassService', menuActiveClassService)
  .factory('messagesFactory', messagesFactory)
  .factory('usersFactory', usersFactory)
;

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

// Some fake emails
function messagesFactory() {
	return messages = [
	  {
		id: 0,
		sender: 'jean@somecompany.com',
		subject: 'Hi there, old friend Hi there, old friend Hi there, old friend Hi there, old friend Hi there, old friend Hi there, old friend ',
		date: 'Dec 7, 2013 12:32:00',
		recipients: ['greg@somecompany.com', 'maria@somecompany.com', 'bill@somecompany.com'],
		message: 'Hey, we should get together for lunch sometime and catch up.'
		+'There are many things we should collaborate on this year.'
	  },
	  {
		id: 1,
		sender: 'maria@somecompany.com',
		subject: 'Where did you leave my laptop?',
		date: 'Dec 7, 2013 8:15:12',
		recipients: ['bill@somecompany.com'],
		message: 'I thought you were going to put it in my desk drawer.'
		+'But it does not seem to be there.'
	  },
	  {
	id: 2,
		sender: 'bill@somecompany.com',
		subject: 'Lost python',
		date: 'Dec 6, 2013 20:35:02',
		recipients: ['greg@somecompany.com', 'jean@somecompany.com'],
		message: "Nobody panic, but my pet python is missing from her cage."
		+"She doesn't move too fast, so just call me if you see her."
	  }
	];
}

// Some fake contacts
function usersFactory() {
	return users = [
	  {
		id: 0,
		name: 'Leanne Graham',
		username: 'Bret',
		email: 'Sincere@april.biz',
		address: {
		  city: "Gwenborough"
	    }
	  },
	  {
		id: 1,
		name: 'Ervin Howell',
		username: 'Antonette',
		email: 'Shanna@melissa.tv',
		address: {
		  city: "Wisokyburgh"
	    }
	  },
	  {
		id: 2,
		name: 'Clementine Bauch',
		username: 'Samantha',
		email: 'Nathan@yesenia.net',
		address: {
		  city: "McKenziehaven"
	    }
	  },
	  {
		id: 3,
		name: 'Patricia Lebsack',
		username: 'Karianne',
		email: 'Julianne.OConner@kory.org',
		address: {
		  city: "South Elvis"
	    }
	  }
	];
}
