export function timeAgoIST(date) {
  const past = new Date(date);
  const istDate = new Date(past.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));

  const secondsAgo = Math.floor((now - istDate) / 1000);
  if (secondsAgo < 60) return `${secondsAgo} seconds ago`;
  const minutesAgo = Math.floor(secondsAgo / 60);
  if (minutesAgo < 60) return `${minutesAgo} minutes ago`;
  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) return `${hoursAgo} hours ago`;
  const daysAgo = Math.floor(hoursAgo / 24);
  if (daysAgo < 30) return `${daysAgo} days ago`;
  const monthsAgo = Math.floor(daysAgo / 30);
  if (monthsAgo < 12) return `${monthsAgo} months ago`;
  const yearsAgo = Math.floor(monthsAgo / 12);
  return `${yearsAgo} years ago`;
}
