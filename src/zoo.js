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

function animalsByIds(...ids) {
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animalName, animalAge) {
  return animals.find(arr => arr.name === animalName)
  .residents.every(arr => arr.age >= animalAge);
}

function employeeByName(employName) {
  if (employName === undefined) return {};
  return employees.find(emp => emp.firstName === employName || emp.lastName === employName);
}

function createEmployee(personalInfo, associatedWith) {
  return ({ ...personalInfo, ...associatedWith });
}

function isManager(id) {
  return employees.some(arr => arr.managers
  .some(arr1 => arr1 === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (species === undefined) {
    return animals.reduce((acumulador, atual) => {
      acumulador[atual.name] = atual.residents.length;
      return acumulador;
    }, {});
  }
  return animals.find(animais => animais.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.entries(entrants).length === 0) return 0;
  return Object.keys(entrants)
  .reduce((acumulador, atual) => acumulador + (entrants[atual] * prices[atual]), 0);
}
// https://pt.stackoverflow.com/questions/83588/em-javascript-como-verificar-que-um-objeto-est%C3%A1-vazio-sem-jquery

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
