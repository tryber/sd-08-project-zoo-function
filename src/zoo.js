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
  // seu código aqui
  if (ids.length > 0) {
    const animals = ids.map(idEl => data.animals.find(el => el.id === idEl));
    return animals;
  }
  return [];
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const animalVeiry = data.animals.find(el => el.name === animal);
  return animalVeiry.residents.every(el => el.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(el => el.firstName === employeeName || el.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return data.employees.some(el => el.managers.some(m => m === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const newEmployees = { id, firstName, lastName, managers, responsibleFor };
  data.employees.push(newEmployees);
}

function animalCount(species) {
  // seu código aqui
  if (species !== undefined) {
    const n = data.animals.find(el => el.name === species);
    return n.residents.length;
  }
  const a = data.animals.reduce((ac, value) => {
    ac[value.name] = value.residents.length;
    return ac;
  }, { });
  return a;
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
