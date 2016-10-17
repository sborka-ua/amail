angular.module('aMail.filters', [])
  .filter('ageCompletion', ageCompletion)
  .filter('arrayToStringComaSeparated', arrayToStringComaSeparated)
  .filter('stringLengthLimit', stringLengthLimit)
;

// фильтр возраста: 1: ' год' | 2,3,4: ' года' | 5,6,7,8,9,0: ' лет'
function ageCompletion() {
	return function(age) {
		var last = +age[age.length - 1];

		if (last == 1)	return age +' год';

		if (last == 2 || last == 3 || last == 4)	return age +' года';

		return age +' лет';
	}
}

// разделяем запятой с пробелом всех получателей письма из массива messages.recipients
function arrayToStringComaSeparated() {
	return function(arr) {
		if (arr.length)
			return '<'+ arr.join('>, <') +'>';
	}
}

// вырезаем середину строки и вставляем троеточие, если длина строки > 44 символов
function stringLengthLimit() {
	return function(string) {
		return (string.length < 45) ? string : (string.substring(0, 15) +' ...'+ string.substring(string.length - 28, string.length));
	}
}
