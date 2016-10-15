angular.module('aMail.filters', [])
  .filter('arrayToStringComaSeparated', arrayToStringComaSeparated)
;

// Coma separated recipients from messages.recipients array
function arrayToStringComaSeparated() {
	return function(arr) {
		if (arr.length)
			return '<'+ arr.join('>, <') +'>';
	}
}
