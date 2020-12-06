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

const {
  animals, employees, hours, prices,
} = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.some(id => id === animal.id)) || [];
}

function animalsOlderThan(animal, age) {
  return animals
    .find(a => a.name === animal)
    .residents.every(e => e.age > age);
}

function employeeByName(employeeName) {
  return (
    employees.find(
      e => e.firstName === employeeName || e.lastName === employeeName,
    ) || {}
  );
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(e => e.managers.some(m => m === id));
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  try {
    if (!species) {
      return animals.reduce((acc, cur) => {
        acc[cur.name] = cur.residents.length;
        return acc;
      }, {});
    }
    return animals.find(a => a.name === species).residents.length || 0;
  } catch (error) {
    return 0;
  }
}

function entryCalculator(entrants = {}) {
  try {
    return Object.keys(entrants).reduce((a, c) => {
      const sum = prices[c] * entrants[c];
      return a + sum;
    }, 0);
  } catch (error) {
    return 0;
  }
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
