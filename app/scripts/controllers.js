angular.module('aMail.controllers', []);

function DetailCtrl($routeParams) {
	this.message = messages[$routeParams.id];
}

function ListCtrl(messagesFactory) {
	this.messages = messages;
}

function MessagesCountCtrl(messagesFactory) {
	this.messagesLength = messages.length;
}

