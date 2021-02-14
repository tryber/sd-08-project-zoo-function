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

const { animals, employees, prices } = data;

function animalsByIds(...ids) {
  if (ids.length === 0) {
    return [];
  }
  return animals.filter((cur, idx) => cur.id === ids[idx]);
}

function animalsOlderThan(animal, age) {
  return animals.find(cur => cur.name === animal).residents.every(cur => cur.age > age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(cur => employeeName === cur.firstName || employeeName === cur.lastName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(cur => cur.managers.find(item => item === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (species === undefined) {
    const lista = {};
    animals.forEach((cur) => {
      lista[cur.name] = cur.residents.length;
    });
    return lista;
  }
  return animals.find(cur => cur.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.keys(entrants).reduce((acc, cur) => acc + (entrants[cur] * prices[cur]), 0);
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
