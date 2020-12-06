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

function animalsByIds(...id) {
  if (!id) return [];
  const list = [];
  id.forEach(item => list.push(data.animals.find(a => a.id === item)));
  return list;
}


function animalsOlderThan(animal, age) {
  const filterAnimals = data.animals.find(item => item.name === animal);
  return filterAnimals.residents.every(item => item.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find(i => i.firstName === employeeName || i.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return {...personalInfo, ...associatedWith};
}

function isManager(id) {
  return data.employees.some(item => item.managers.some(item2 => item2 === id));
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
