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

const data = require('./data');

function animalsByIds(...ids) {
  if (ids === undefined) return [];
  const id = ids.map(animals => (data.animals.find(animal => animal.id.includes(animals))));
  return id;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const nargas = data.animals.find(elemt => elemt.name === animal);
  return nargas.residents.every(elemt => elemt.age > age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) return '{}'
  const funcionarios = data.employees.find(name => (name.firstName === employeeName || name.lastName === employeeName));
  return funcionarios;
}
console.log(employeeByName())

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  // seu código aqui
}

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
