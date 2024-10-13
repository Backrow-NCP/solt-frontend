const planTime = (timeString) => {
	const date = new Date(timeString);
	
	return date.toLocaleTimeString('ko-KR', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: true,
	});
}

export default planTime;