var MyObject = {

    // This is private because it is not being return
     dateDiffInDays : (date1, date2) => {
    // round to the nearest whole number
    	return Math.round((date2-date1)/(1000*60*60*24));
	},
	diffMonths  : (date1,date2) => {
		return moment(date1).startOf("month").diff(moment(date2).startOf("month"),"month")
	},
	 range : (start, stop, step = 1, circularFill = false, map = (value) => value) => {
		if (typeof stop === 'undefined') {
			stop = start;
			start = 0;
		}

		if (step > 0 && start >= stop) {
			step = -step;
		}

		if (step < 0 && start <= stop) {
			return [];
		}
		
		let index = start;
		const result = [];
		
		if (circularFill) {
			const size = start + stop;
			for (index; step > 0 ? index < size : index > size; index += step) {
				result.push(map(index % stop));
			}
			return result;
		}
		
		for (index; step > 0 ? index < stop : index > stop; index += step) {
			result.push(map(index));
		}

		return result;
	}
};

module.exports = MyObject;

