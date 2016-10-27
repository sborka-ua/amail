// angular.module('aMail.filters', [])
//  .filter('stringLengthLimit', stringLengthLimit)
//  .filter('ageCompletion', ageCompletion)
//  .filter('arrayToStringComaSeparated', arrayToStringComaSeparated)
;

/* // вырезаем середину строки и вставляем троеточие, если длина строки > 44 символов
function stringLengthLimit() {
	return function(str) {
		var length = str.length;
		return (length < 50) ? str : (str.substring(0, 25) +' ... '+ str.substring(length - 18, length));
	}
}
*/

/* // фильтр возраста: 1: ' год' | 2,3,4: ' года' | 5,6,7,8,9,0: ' лет'
function ageCompletion() {
	return function(age) {
		var last = +age[age.length - 1];

		if (last == 1) {
			return age +' год';
		}

		if (last == 2 || last == 3 || last == 4) {
			return age +' года';
		}

		return age +' лет';
	}
}
*/

/* // собрать в 1 строку все элементы массива, поставив между ними разделитель ', '
function arrayToStringComaSeparated() {
	return function(arr) {
		if (arr.length) {
			return arr.join(', ');
		}
	}
}
*/
