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
  const animals = data.animals;
  const result = [];
  ids.forEach((id) => {
    animals.forEach((animal) => {
      if (animal.id === id) result.push(animal);
    });
  });
  return result;
}

function animalsOlderThan(animal, age) {
  const animals = data.animals;
  const animalObj = animals.find(animalGroup => animalGroup.name.match(animal));
  const ages = [];
  animalObj.residents.forEach(prop => ages.push(prop.age));
  const minAge = Math.min(...ages);
  if (minAge >= age) return true;
  return false;
}

function employeeByName(employeeName) {
  const employees = data.employees;
  if (employeeName === undefined) return {};
  return employees.find((employee) => {
    const { firstName, lastName } = employee;
    return employeeName === firstName || employeeName === lastName;
  });
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
