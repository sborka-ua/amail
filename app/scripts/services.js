angular.module('aMail.services', [])
  .factory('contactsFactory', contactsFactory)
  .factory('messagesFactory', messagesFactory)
;

// Some fake contacts
function contactsFactory() {
	return contacts = [
	  {
		id: 0,
		name: 'Jean',
		surname: 'Air',
		email: 'jean@somecompany.com',
		avatar: '/images/jean.jpg',
		age: '25'
	  },
	  {
		id: 1,
		name: 'Greg',
		surname: 'Hopkins',
		email: 'greg@somecompany.com',
		avatar: '/images/greg.jpg',
		age: '20'
	  },
	  {
		id: 2,
		name: 'Maria',
		surname: 'Jackson',
		email: 'maria@somecompany.com',
		avatar: '/images/maria.jpg',
		age: '21'
	  },
	  {
		id: 3,
		name: 'Bill',
		surname: 'Smith',
		email: 'bill@somecompany.com',
		avatar: '/images/bill.jpg',
		age: '24'
	  }
	];
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

