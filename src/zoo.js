/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const { animals } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  const requiredSpecie = animals.find(anm => anm.name === animal);
  const residents = requiredSpecie.residents;
  const olderAnimals = residents.filter(currAnimal => currAnimal.age > age);
  return olderAnimals.length === residents.length;
}

function employeeByName(employeeName) {
  const foundEmployee = data.employees.find(({ firstName, lastName }) =>
    firstName === employeeName || lastName === employeeName);

  return employeeName ? foundEmployee : {};
}

function createEmployee(personalInfo, associatedWith) {
  return ({ ...personalInfo, ...associatedWith });
}

function isManager(id) {
  return data.employees.filter(employee =>
  employee.managers.includes(id)).length > 0;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (species) {
    const foundAnimal = animals.find(animal => animal.name === species);
    const amount = foundAnimal.residents.length;
    return amount;
  }

  return animals.reduce((acc, curr) => {
    acc[curr.name] = curr.residents.length; return acc;
  }, {});
}

const invalidEntry = entrants =>
  (!entrants) || (Object.keys(entrants).length === 0);

function entryCalculator(entrants) {
  if (invalidEntry(entrants)) return 0;
  const prices = data.prices;
  const total = Object.entries(entrants)
  .reduce((acc, [kindOfTicket, amount]) => acc + (prices[kindOfTicket] * amount), 0);

  return total;
}

function animalMap(options) {
  // seu código aqui
}

// const { hours } = data;
//   const allHours = Object.entries(hours);

// const returnschedule = (day) => {

// };
// const fullSchedule = () => {
//   const message = allHours.reduce((acc, [keyDay, value]) => {
//     keyDay === 'Monday'
//       ? (acc[keyDay] = "CLOSED")
//       : (acc[keyDay] = `Open from ${value.open}am until ${value.close - 12}pm`);
//     return acc;
//   }, {});
//   return message;
// };

function schedule(dayName) {
  // seu código aqui
  // if (!dayName) return fullSchedule();
  // const [ dayName ] = allHours[dayName];
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function employeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
