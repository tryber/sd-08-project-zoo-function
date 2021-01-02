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
const { animals, employees, prices } = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.find(id => id === animal.id));
}

function animalsOlderThan(animal, age) {
  return animals.find(specie => specie.name === animal)
    .residents.every(individual => individual.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName == null) {
    return {};
  }
  return employees.find(employee => employee.firstName === employeeName
    || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const worker = { ...personalInfo, ...associatedWith };
  return worker;
}

function isManager(id) {
  return employees.some(office => office.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newWorker = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newWorker);
}

function animalCount(species) {
  if (!species) {
    return animals.reduce((acc, curr) => {
      const { name, residents } = curr;
      return { ...acc, [name]: residents.length };
    }, {});
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants = {}) {
  return Object.entries(entrants).reduce((acc, [person, amount]) => {
    acc += prices[person] * amount;
    return acc;
  }, 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  const increase = 1 + (percentage / 100);
  Object.keys(prices).forEach((key) => {
    prices[key] = (Math.round(prices[key] * increase)).toFixed(2);
  });
  return prices;
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
