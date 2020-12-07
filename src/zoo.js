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
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  const employees = data.employees;
  const managerList = [];
  employees.forEach(employee => managerList.push(...employee.managers));
  return managerList.some(managerId => managerId === id);
}

function addEmployee(id = '', firstName = '', lastName = '', managers = [], responsibleFor = []) {
  const employees = data.employees;
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  const animals = data.animals;
  const result = {};
  animals.forEach((animal) => {
    result[`${animal.name}`] = animal.residents.length;
  });
  if (species === undefined) return result;
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) return 0;
  const prices = data.prices;
  const entrantsArray = Object.entries(entrants);
  let total = 0;
  entrantsArray.forEach((entrant) => {
    total += entrant[1] * prices[`${entrant[0]}`];
  });
  return parseFloat(total.toFixed(2));
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
  const prices = Object.entries(data.prices);
  const percent = (percentage / 100) + 1;
  prices.forEach((price) => {
    data.prices[`${price[0]}`] = Math.round((price[1] * percent) * 100) / 100;
  });
  return data.prices;
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
