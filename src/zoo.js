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
  if (!ids) return [];
  const animalsFiltred = data.animals.filter((animal) => {
    const idInList = ids.includes(animal.id);
    return idInList;
  });
  return animalsFiltred;
}

function animalsOlderThan(animal, age) {
  const animalsFiltred = data.animals.find((animalInLIst) => {
    const nameInList = animalInLIst.name === animal;
    return nameInList;
  });
  const hasResidentsOldderThan = animalsFiltred.residents.every((resident) => {
    const validation = resident.age > age;
    return validation;
  });
  return hasResidentsOldderThan;
}

function employeeByName(employeeName) {
  if (!employeeName) return {};

  const employeeFinder = data.employees.find((employee) => {
    const employeeFirstName = employee.firstName;
    const employeeLastName = employee.lastName;
    return employeeFirstName === employeeName || employeeLastName === employeeName;
  });
  return employeeFinder;
}

function createEmployee(personalInfo, associatedWith) {
  const createPersonalEmployee = { ...personalInfo, ...associatedWith };
  return createPersonalEmployee;
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
