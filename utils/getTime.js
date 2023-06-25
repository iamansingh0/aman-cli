const getTime = (timeZoneOffsetSeconds, unixSeconds) => {
	let date = new Date((unixSeconds + timeZoneOffsetSeconds) * 1000);
	let timeZoneOffsetHours = Math.floor(timeZoneOffsetSeconds / 3600);
	let timeZoneOffsetMinutes = Math.floor((timeZoneOffsetSeconds % 3600) / 60);

	let formattedOffset = `GMT${timeZoneOffsetHours >= 0 ? '+' : '-'}${Math.abs(
		timeZoneOffsetHours
	)}:${Math.abs(timeZoneOffsetMinutes).toString().padStart(2, '0')}`;
	let formate = new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		timeZone: 'UTC'
	});

    let [
        { value: month },
        ,
        { value: day },
        ,
        { value: year },
        ,
        { value: hour },
        ,
        { value: minute },
        ,
        { value: second },
        ,
        { value: dayPeriod },
      ] = formate.formatToParts(date);
      
      let dateFinal = `${year}-${month}-${day} ${hour}:${minute}:${second} ${dayPeriod} ${formattedOffset}`;
      console.log(`${dateFinal}`);
};

module.exports = {
	getTime: getTime
};