angular.module('aMail.filters', [])
  .filter('arrayToStringComaSeparated', arrayToStringComaSeparated)
  .filter('stringLengthLimit', stringLengthLimit)
;

// Coma separated recipients from messages.recipients array
function arrayToStringComaSeparated() {
	return function(arr) {
		if (arr.length)
			return '<'+ arr.join('>, <') +'>';
	}
}

function stringLengthLimit() {
	return function(string) {
		return (string.length < 45) ? string : (string.substring(0, 36) +' ...'+ string.substring(string.length - 8, string.length));
	}
}

