function checkOverlap(startTime, endTime, bookings) {
  const start = new Date(startTime);
  const end = new Date(endTime);

  for (let i = 0; i < bookings.length; i++) {
    if (start < bookings[i].endTime && end > bookings[i].startTime) {
      return true;
    }
  }

  return false;
}

module.exports = checkOverlap;
