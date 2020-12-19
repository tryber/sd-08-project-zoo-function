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

function animalsByIds(...ids) {
  if (!ids || ids.length === 0) return [];
  return animals.filter(animal => ids.includes(animal.id));
}
function animalsOlderThan(animal, age) {
  return animals
    .find(animalss => animalss.name === animal)
    .residents.every(resident => resident.age > age);
}
function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find(
    e => e.firstName === employeeName || e.lastName === employeeName);
}
function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}
function isManager(id) {
  return employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (!species) {
    const obj = {};
    animals.forEach(e => {
      obj[e.name] = e.residents.length;
    });
    return obj;
  }
  return animals.filter(e => species === e.name)[0].residents.length;
}
function entryCalculator(entrants) {
  if ( !entrants) return 0;
  return Object.keys(entrants).reduce((accumulator, currentValue) => (
    accumulator + (entrants[currentValue] * prices[currentValue])
  ), 0);
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
