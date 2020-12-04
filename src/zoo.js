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
const data = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  return animals.filter(animal => animal.id === ids.find(id => animal.id === id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return animals.filter(element => element.name === animal)
  .every(element => element.residents
    .every(resident => resident.age >= age));
}

function employeeByName(employeeName) {
  // seu código aqui
  if (typeof employeeName === 'undefined') {
    return {};
  }
  return employees.find(employee =>
  employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee({ id: nId, firstName: nFirstName, lastName: nLastName },
  { managers: nManagers, responsibleFor: nResponsilbleFor }) {
  // seu código aqui
  return {
    id: nId,
    firstName: nFirstName,
    lastName: nLastName,
    managers: nManagers,
    responsibleFor: nResponsilbleFor,
  };
}

function isManager(id) {
  // seu código aqui
  return employees.some(employee => employee.id === id && employee.responsibleFor.length === 4);
}

function addEmployee(nId, nFirstName, nLastName, nManagers = [], nResponsibleFor = []) {
  // seu código aqui
  employees.push(
    {
      id: nId,
      firstName: nFirstName,
      lastName: nLastName,
      managers: nManagers,
      responsibleFor: nResponsibleFor,
    },
  );
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
