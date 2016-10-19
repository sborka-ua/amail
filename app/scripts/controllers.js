angular.module('aMail.controllers', [])
  .controller('ShowAvatarAndNameCtrl', ShowAvatarAndNameCtrl)
;

function ContactsCtrl(contactsFactory) {
	this.contacts = contacts;
}

function DetailCtrl($routeParams) {
	this.message = messages[$routeParams.id];
}

function ListCtrl(messagesFactory) {
	this.messages = messages;
	
}

function MessagesCountCtrl(messagesFactory) {
	this.messagesLength = messages.length;
}

function ShowAvatarAndNameCtrl(contactsFactory) {
	this.showAvatar = function (sender) {
		var contact = contacts.filter(function(item) {
			return item.email == sender;
		})[0];
		return contact.avatar;
	};

	this.showNameAndSurname = function (sender) {
		var contact = contacts.filter(function(item) {
			return item.email == sender;
		})[0];
		return contact.name +' '+ contact.surname;
	};
}
