const today = new Date();
const birthday = new Date("December 17, 1995 03:24:00"); // DISCOURAGED: may not work in all runtimes
const birthday2 = new Date("1995-12-17T03:24:00"); // This is ISO8601-compliant and will work reliably
const birthday3 = new Date(1995, 11, 17); // the month is 0-indexed
const birthday4 = new Date(1995, 11, 17, 3, 24, 0);
const birthday5 = new Date(628021800000); // passing epoch timestamp
// const now = new Date.now

console.log(today) // 2022-12-19T21:19:32.504Z

console.log(birthday)
console.log(birthday2)
console.log(birthday3)
console.log(birthday4)
console.log(birthday5)


console.log(today.toString()); // Tue May 12 2020 18:50:21 GMT-0500 (Central Daylight Time)
console.log(today.toDateString()); // Tue May 12 2020
console.log(today.toTimeString()); // 18:50:21 GMT-0500 (Central Daylight Time)
console.log(today.toISOString()); // 2020-05-12T23:50:21.817Z
console.log(today.toUTCString()); // Tue, 12 May 2020 23:50:21 GMT
console.log(today.toJSON()); // 2020-05-12T23:50:21.817Z
console.log(today.toLocaleString()); // 5/12/2020, 6:50:21 PM
console.log(today.toLocaleDateString()); // 5/12/2020
console.log(today.toLocaleTimeString()); // 6:50:21 PM

console.log('getMonth()', today.getMonth()) // Returns a value from 0 to 11. The index starts at 0
console.log('getDate()', today.getDate())
console.log('getFullYear()', today.getFullYear())


const asyncFunc = async() => {console.log("Hello")}
// const test = asyncFunc() 
console.log('test', asyncFunc())
