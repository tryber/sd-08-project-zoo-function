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

const { animals, employees, prices } = require('./data');
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
  };
  const objAssociate = {
    managers,
    responsibleFor,
  };
  const result = Object.assign(person, objAssociate);
  employees.push(result);
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
  // seu código aqui
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
