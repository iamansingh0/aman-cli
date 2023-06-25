const getTime = (timeZoneOffsetSeconds, unixSeconds) => {
	let date = new Date((unixSeconds + timeZoneOffsetSeconds) * 1000);
	let timeZoneOffsetHours = Math.floor(timeZoneOffsetSeconds / 3600);
	let timeZoneOffsetMinutes = Math.floor((timeZoneOffsetSeconds % 3600) / 60);
	let formate = new Intl.DateTimeFormat('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		timeZone: 'UTC'
	});

    let [
        { value: hour },
        ,
        { value: minute },
        ,
        { value: second },
        ,
        { value: dayPeriod },
      ] = formate.formatToParts(date);
      
      let dateFinal = `${hour}:${minute}:${second} ${dayPeriod}`;
      return dateFinal;
};

module.exports = {
	getTime: getTime
};