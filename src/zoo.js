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
  //  feito com dica do Lauro no plantão.
}

function animalsOlderThan(specie, age) {
  return animals.find(animal => animal.name === specie)
    .residents
    .every(resident => resident.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return employees
    .find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  return employees.map(employee => employee.managers)
    .some(element => element.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (!species) {
    return undefined;
  }
  return animals.filter(animal => animal.name === species)[0].residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || entrants === {}) {
    return 0;
  }
  const {Adult, Child, Senior} = entrants;
  return parseFloat(Adult * prices.Adult) + parseFloat(Child * prices.Child) + parseFloat(Senior * prices.Senior);
}
console.log(entryCalculator({ 'Adult': 2, 'Child': 3, 'Senior': 1 }))

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
