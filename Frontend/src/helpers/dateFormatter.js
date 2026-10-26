export const formatDate = (date) => {
  return date?.toString().slice(0, 10);
};

// The day picked in the date picker, at the current local time. Sent as a full
// timestamp so the server does not move the receipt to the previous day.
export const withCurrentTime = (day) => {
  const now = new Date();
  const d = day?.toDate ? day.toDate() : new Date(day ?? now);
  if (isNaN(d.getTime())) return now;
  d.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), 0);
  return d;
};
