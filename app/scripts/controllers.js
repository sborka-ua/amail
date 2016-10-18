angular.module('aMail.controllers', [])
  .controller('ShowAvatarCtrl', ShowAvatarCtrl)
;

function ContactsCtrl(contactsFactory) {
	this.contacts = contacts;
}

function ShowAvatarCtrl(contactsFactory) {
	this.showAvatar = function(sender) {
		var contact = contacts.filter(function(item) {
			return item.email == sender;
		})[0];
		return contact.avatar;
	};
/*
	this.showAvatar = function(sender) {
		for (var i = 0; i < contacts.length; i++) {
			if (contacts[i].email != sender) continue;
			return contacts[i].avatar;
		}
	};
*/
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
