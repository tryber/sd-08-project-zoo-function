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

const { animals, employees } = require('./data');

const animalsByIds = (...args) => {
  return animals.filter(({ id }) => args.some(value => value === id));
};

const animalsOlderThan = (animal, age) =>
  animals.some(e => e.residents.every(value => e.name === animal && value.age > age));

const employeeByName = employeeName => {
  if (!employeeName) return {};
  return employees.find(v => v.firstName === employeeName || v.lastName === employeeName);
};

const createEmployee = (info, awith) => ({ ...info, ...awith });

const isManager = id =>
  employees.some(element => element.id === id && element.managers.length === 1);

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) =>
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });

const animalCount = species => {
  if (!species) {
};

function entryCalculator(entrants) {
  // seu código aqui
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
