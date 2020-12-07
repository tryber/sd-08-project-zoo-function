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

const { animals, employees, prices, hours } = require('./data');
const data = require('./data');

function animalsByIds(...args) {
  if (!args) return [];
  return animals.filter(animal => animal.id === args[0] || animal.id === args[1]);
}

function animalsOlderThan(...args) {
  return animals.find(animal => animal.name === args[0])
  .residents.every(animal => animal.age >= 7);
}

function employeeByName(args) {
  if (!args) return {};
  return employees.find(name => name.firstName === args || name.lastName === args);
}

function createEmployee(...args) {
  return Object.assign(args[0], args[1]);
}

function isManager(id) {
  return employees.some(manager => manager.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const person = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(person);
}

function animalCount(species) {
  if (species) return animals.find(animal => animal.name === species).residents.length;
  return animals.reduce((acc, animal) => {
    acc[animal.name] = animal.residents.length;
    return acc;
  }, {});
}

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) return 0;
  const values = Object.entries(entrants);
  const pricesValue = prices;
  return values.reduce((acc, [ticketType, final]) => acc + (pricesValue[ticketType] * final), 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  if (!dayName) {
    return {
      Tuesday: 'Open from 8am until 6pm',
      Wednesday: 'Open from 8am until 6pm',
      Thursday: 'Open from 10am until 8pm',
      Friday: 'Open from 10am until 8pm',
      Saturday: 'Open from 8am until 10pm',
      Sunday: 'Open from 8am until 8pm',
      Monday: 'CLOSED',
    };
  }
  if (dayName === 'Monday') {
    return { [dayName]: 'CLOSED' };
  }
  return { [dayName]: `Open from ${hours[dayName].open}am until ${hours[dayName].close % 12}pm` };
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
