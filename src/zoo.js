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
  const findAnimal = animalById => ids.find(id => animalById.id === id);
  return data.animals.filter(findAnimal);
}

function animalsOlderThan(animal, age) {
  return data.animals.find(nameAnimal => nameAnimal.name === animal)
    .residents
    .every(animalAge => animalAge.age >= age);
}

function employeeByName(employeeName) {
  const employee = {};
  if (employeeName === undefined) {
    return employee;
  }
  const findName = data.employees;
  return findName.find(name => name.firstName === employeeName || name.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  const employeeId = data.employees;
  return employeeId.some(employeeManager => employeeManager.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
}

function entryCalculator(entrants) {
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
  const priceIncrease = (100 + percentage) / 100;
  return Object.entries(data.prices).forEach(([key, value]) => {
    const newPrice = (value * priceIncrease * 100);
    data.prices[key] = Math.round(newPrice) / 100;
  });
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
