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
  if (typeof ids[0] !== 'string') { return []; }
  return data.animals.filter(animal => animal.id === ids[0] || animal.id === ids[1]);
}

function animalsOlderThan(animal, age) {
  const animalSpecies = data.animals.find(animalSpecie => animalSpecie.name === animal);
  return animalSpecies.residents.every(animalResidents => animalResidents.age >= age);
}

function employeeByName(employeeName) {
  if (typeof employeeName !== 'string') {
    return {};
  }
  return data.employees.find(employee =>
    employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(employee =>
  employee.managers[0] === id || employee.managers[1] === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(employee);
}

function animalCount(species) {
  if (!species) {
    const animalSelector = {};
    data.animals.map(animal => (
      animalSelector[animal.name] = animal.residents.length
    ));
    return animalSelector;
  }
  return data.animals.find(animal => animal.name === species).residents.length;
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
