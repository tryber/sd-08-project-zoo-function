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

const { animals, employees } = require('./data');  // object destructuring
// const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.find(id => id === animal.id));
}

function animalsOlderThan(animal, age) {
  const compareAnimal = animals.find(specie => specie.name === animal)
  .residents.every(resident => resident.age >= age);
  return compareAnimal;
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  function analyzeEmployee(employee) {
    return employee.firstName === employeeName || employee.lastName === employeeName;
  }
  return employees.find(name => analyzeEmployee(name));
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return newEmployee;
}

function isManager(id) {
  return employees.some(employee => employee.managers.find(managerId => managerId === id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const manager = {
    id,
    firstName,
    lastName,
    managers: [],
    responsibleFor: [],
  };
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  const novo = !managers || !responsibleFor ? employees.push(manager) : employees.push(employee);

  return novo;
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
