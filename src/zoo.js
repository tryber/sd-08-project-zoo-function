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
  // seu código aqui
  return animals.filter(({ id }) => ids.includes(id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return animals.find(current =>
  current.name === animal).residents.every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (typeof employeeName !== 'string' || employeeName.length === 0) return {};
  return data.employees.find(element => element.firstName === employeeName) ||
  data.employees.find(element => element.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return ({ ...personalInfo, ...associatedWith });
}

function isManager(id) {
  // seu código aqui
  return data.employees.some(element => element.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  // seu código aqui
  const newObject = {};
  if (typeof species !== 'string' || species.length === 0) {
    animals.forEach(element => (newObject[element.name] = element.residents.length));
    return newObject;
  }
  return animals.find(({ name }) => name === species).residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (typeof entrants === 'undefined') return 0;
  return Object.entries(entrants).reduce((accumulator, [key, value]) =>
  accumulator + (data.prices[key] * value), 0);
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
