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
  const findAnimal = ids.map(id => animals.find(animal => animal.id === id));
  return findAnimal;
}

function animalsOlderThan(animal, age) {
  const findAnimals = animals.find(element => element.name === animal);
  const animalsMinAge = findAnimals.residents.every(element => element.age >= age);
  return animalsMinAge;
}

function employeeByName(employeeName) {
  if (employeeName !== undefined) {
    return data.employees.find(employee =>
    employee.firstName === employeeName || employee.lastName === employeeName);
  }
  return {};
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  const managers = employees.map(employee => employee.managers
  .some(element => element === id));
  return managers.some(manager => manager === true);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
  return data.employees;
}

function animalCount(species) {
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
