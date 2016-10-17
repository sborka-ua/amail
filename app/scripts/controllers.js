angular.module('aMail.controllers', []);

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
