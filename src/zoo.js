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
  if (ids.length === 0) {
    return [];
  }
  return ids.map(id => animals.find(animal => animal.id === id));
}

function animalsOlderThan(animal, age) {
  const specie = data.animals.find(animalName => animalName.name === animal);
  return specie.residents.every(element => element.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const employee = data.employees.find(element => element.firstName === employeeName
    || element.lastName === employeeName);
  return employee;
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  const empManager = data.employees.some(manager => manager.managers
    .find(idManager => idManager === id));
  return empManager;
}

function addEmployee(id = [], firstName = [], lastName = [], managers = [], responsibleFor = []) {
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (species === undefined) {
    const speciesCount = {};
    animals.forEach(element => (speciesCount[element.name] = element.residents.length));
    return speciesCount;
  }
  const specie = animals.find(element => element.name === species);
  return specie.residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) return 0;
  return Object.keys(entrants).reduce((acc, current) => {
    acc + (entrants[current] * prices[current]), 0});
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
