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
  return animals.filter((animalsId => ids.find(id => id === animalsId.id)));
}

function animalsOlderThan(animalName, age) {
  return animals.find(animal => animal.name === animalName).residents
  .every(animal => animal.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find(employee => (
    employee.firstName === employeeName || employee.lastName === employeeName
  ));
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const personalInfo = { id, firstName, lastName };
  const associatedWith = { managers, responsibleFor };
  employees.push(createEmployee(personalInfo, associatedWith));
}

function animalCount(species) {
  const count = animals.reduce((cont, animal) => {
    cont[animal.name] = animal.residents.length;
    return cont;
  }, {});
  if (typeof species === 'string' && species.length !== 0) {
    return count[species];
  }
  return count;
}

function entryCalculator(entrants) {
  // const entradas = {};
  // if (entrants === '' || entrants === {}) {
  //   return 0;
  // } Object.entrants.reduce((cont, entradas => (
  //   cont += entradas)
  // ), 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(...dayName) {

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
