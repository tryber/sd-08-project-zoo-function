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
  if (species === undefined) {
    return data.animals.reduce((acc, value) => {
      acc[value.name] = value.residents.length;
      return acc;
    }, {});
  }
  return data.animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants = {}) {
  let finalPrice = 0;
  if (entrants === undefined) {
    return finalPrice;
  }
  const prices = Object.values(data.prices);
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  finalPrice = (Adult * prices[0]) + (Senior * prices[1]) + (Child * prices[2]);
  return finalPrice;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  const responsible = data.employees.find(employee => employee.id === id).responsibleFor[0];
  const firstAnimal = data.animals.find(animal => animal.id === responsible);
  const oldestAnimal = Math.max(...firstAnimal.residents.map(resident => resident.age));
  return Object.values(firstAnimal.residents.find(resident => resident.age === oldestAnimal));
}

function increasePrices(percentage) {
  const priceIncrease = (100 + percentage) / 100;
  return Object.entries(data.prices).forEach(([key, value]) => {
    const newPrice = (value * priceIncrease * 100);
    data.prices[key] = Math.round(newPrice) / 100;
  });
}

function employeeCoverage(idOrName) {
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
