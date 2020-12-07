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
const { animals } = require('./data');
const { employees } = require('./data');

function animalsByIds(ids2, ids1) {
  if (ids2 === undefined && ids1 === undefined) { return []; }
  const buscaBicho = animals.filter(elemento => elemento.id === ids2);
  const buscaBicho2 = animals.filter(elemento => elemento.id === ids1);
  return [...buscaBicho, ...buscaBicho2];
}

function animalsOlderThan(animal, age) {
  const procuraNome = animals.find(elemento => elemento.name === animal);
  const residentes = procuraNome.residents;
  const comparaIdade = residentes.every(idade => idade.age > age);
  return comparaIdade;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) { return {}; }
  const trabalhadores = employees.find(elemento =>
    elemento.lastName === employeeName || elemento.firstName === employeeName);
  return trabalhadores;
}

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
