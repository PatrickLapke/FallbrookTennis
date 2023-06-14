function checkOverlap(startTime, endTime, bookings) {
  for (let i = 0; i < bookings.length; i++) {
    if (
      (startTime > new Date(bookings[i].startTime) &&
        startTime < new Date(bookings[i].endTime)) ||
      (endTime > new Date(bookings[i].startTime) &&
        endTime <= new Date(bookings[i].endTime))
    ) {
      return true;
    }
  }

  return false;
}

module.exports = checkOverlap;
