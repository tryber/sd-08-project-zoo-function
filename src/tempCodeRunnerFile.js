const { animals, prices } = require('./data');
const data = require('./data');

function newSchedule() {
  Object.entries(data.hours).reduce((accumulator, [key,value]) => {
    const { open, close } = value;
    accumulator[key] = close - open > 0 ? `Open from ${open}am until ${close % 12}pm` : 'CLOSED';
    return accumulator;
  }, {});
}

function schedule(dayName) {
  // seu código aqui
  const fetchCalendar = newSchedule();
  if (!dayName) {
    return {[dayName]: fetchCalendar[dayName]};
  }
  return newSchedule();
};

console.log(newSchedule());

console.log(newSchedule(schedule()));
