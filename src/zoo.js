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

const { animals } = require('./data');
const { employees } = require('./data');
const { prices } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return animals.find(element => element.name === animal)
  .residents.every(element => element.age > age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(
    employee => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.filter(employee => employee.managers.includes(id)).length > 0;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
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
    return animals.reduce((accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.residents.length;
      return accumulator;
    }, {});
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  const entry = Object.keys(entrants);
  return entry.reduce(
    (acc, indValue) => acc + (entrants[indValue] * prices[indValue]), 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  const responsible = employees.find(employee => employee.id === id).responsibleFor[0];
  const careAnimal = animals.find(animal => animal.id === responsible).residents;
  const oldAnimal = careAnimal.sort((stAnimal, ndAnimal) => ndAnimal.age - stAnimal.age);
  return [oldAnimal[0].name, oldAnimal[0].sex, oldAnimal[0].age];
}

function increasePrices(percentage) {
  const increment = (1 + (percentage / 100));
  const firstPrices = Object.keys(prices);
  firstPrices.forEach(price => (prices[price] = Math.round(prices[price] * increment * 100) / 100));
}

function employeeCoverage(idOrName) {
  const employeesList = {};
  employees.forEach((employee) => {
    const { firstName, lastName, responsibleFor } = employee;
    const fullName = `${firstName} ${lastName}`;
    const responsible = getAnimalsById(responsibleFor);
    employeesList[fullName] = responsible;
  });
  if (idOrName === undefined) {
    return employeesList;
  }
  const coverage = {};
  const employeesNames = employees.find(
    employee =>
      idOrName === employee.firstName ||
      idOrName === employee.lastName ||
      idOrName === employee.id
  );
  const fullName = `${firstName} ${lastName}`;
  const responsible = employeesList[fullName];
  coverage[fullName] = responsible;
  return coverage;
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
