import _ from 'lodash';

const floatToString = (numberic: any, decimals: any) => {
	let amount = numberic.toFixed(decimals).toString();
	amount = amount.replace('.', '.');
	if (amount.match('^[.' + '.' + ']d+')) return `0${amount}`;
	return amount;
};

const addCommas = (moneyString: any) => {
	return moneyString.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + ',');
};

export const formatVND = (input: any) => {
	let cents = input;
	let result = '';
	let value = '';
	let pattern = /\{\{\s*(\w+)\s*\}\}/;
	let _tempExceptions = [undefined, 'undefined', NaN, 'NaN', null, 'null', ''];
	let formatString = '{{amount}}';

	if (typeof cents === 'string') {
		cents = cents.replace(',', '');
	}
	//convert to Number
	cents = Number(cents);
	value = addCommas(floatToString(cents, 0));
	result = formatString.replace(pattern, value);
	if (_tempExceptions.includes(result)) result = '-';
	return result;
};

export function formatNumberToK(number: number) {
	if (number < 1000) {
		return number;
	} else if (number < 1000000) {
		return Math.floor(number / 1000) + 'K';
	} else {
		return Math.floor(number / 1000000) + 'M';
	}
}
