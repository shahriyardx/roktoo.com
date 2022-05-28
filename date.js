const theDate = new Date("2022-05-29").setHours(0, 0, 0, 0);
const today = new Date().setHours(0, 0, 0, 0);

console.log(theDate >= today);
