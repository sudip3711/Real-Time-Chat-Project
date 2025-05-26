// export function timeAgo(date) {
//     const now = new Date();
//   const past = new Date(date);
//   const secondsAgo = Math.floor((now - past) / 1000);

//   if (secondsAgo < 60) return `${secondsAgo} seconds ago`;
//   const minutesAgo = Math.floor(secondsAgo / 60);
//   if (minutesAgo < 60) return `${minutesAgo} minutes ago`;
//   const hoursAgo = Math.floor(minutesAgo / 60);
//   if (hoursAgo < 24) return `${hoursAgo} hours ago`;
//   const daysAgo = Math.floor(hoursAgo / 24);
//   if (daysAgo < 30) return `${daysAgo} days ago`;
//   const monthsAgo = Math.floor(daysAgo / 30);
//   if (monthsAgo < 12) return `${monthsAgo} months ago`;
//   const yearsAgo = Math.floor(monthsAgo / 12);
//   return `${yearsAgo} years ago`;
// }

// // Example usage:
// console.log(timeAgo("2024-01-29T14:30:00Z")); // Example timestamp




export function timeAgo(date) {
  const pastUTC = new Date(date);

  // Convert to IST by adding 5 hours 30 minutes (19800 seconds)
  const pastIST = new Date(pastUTC.getTime() + 5.5 * 60 * 60 * 1000);

  const now = new Date(); // Your local system time
  const secondsAgo = Math.floor((now - pastIST) / 1000);

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
