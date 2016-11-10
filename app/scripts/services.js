angular.module('aMail.services', [])
  .factory('draftCacheFactory', draftCacheFactory)
  .service('initCountService', initCountService)
  .service('liveSearchService', liveSearchService)
  .service('menuActiveClassService', menuActiveClassService)
  .factory('messagesCacheFactory', messagesCacheFactory)
  .factory('usersCacheFactory', usersCacheFactory)
;

/**
 * draftCacheFactory - кеш-фабрика хранит список писем, удаленных в корзину
 *
 * initCountService - получает от app.run(httpGetRun) начальное количество
 *	писем и юзеров и не меняет эти значения
 *
 * liveSearchService - хранит в searchText текст из строки поиска,
 *	содержимое placeholder меняется в зависимости от выбранного пункта меню
 *
 * menuActiveClassService - добавляет/удаляет класс 'add' у элементов 'li' меню 'menu'
 *
 * messagesCacheFactory($cacheFactory) - кеш-фабрика хранит список входящих писем
 *
 * usersCacheFactory($cacheFactory) - кеш-фабрика хранит список юзеров
 */

function draftCacheFactory($cacheFactory) {
	return $cacheFactory('draft-count-сache');
}

function initCountService() {
	this.messagesCount = 0;
	this.usersCount = 0;
}

function liveSearchService() {
	this.searchText = '';
	this.placeholder = 'живой поиск';
}

function menuActiveClassService() {

	// find(li): здесь li - не набор тегов LI, а конкретный тег, имеющий свой класс.
	// при вызове в контролере, вместо этого li нужно указать его класс
	this.addClass = function(add, menu, li) {
		this.removeClass(add, menu);
		angular.element(document.querySelector(menu)).find(li).addClass(add);
	};

	// find('li'): здесь 'li' - массив всех тегов LI в меню
	this.removeClass = function(add, menu) {
		angular.element(document.querySelector(menu)).find('li').removeClass(add);
	};
}

function messagesCacheFactory($cacheFactory) {
	return $cacheFactory('messages-сache');
}

function usersCacheFactory($cacheFactory) {
	return $cacheFactory('users-сache');
}
