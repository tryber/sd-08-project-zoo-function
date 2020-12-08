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
const data = require('./data');
const { employees } = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.find(id => id === animal.id));
}
console.log(animalsByIds());

function animalsOlderThan(animal, age) {
  return animals.find(specie => specie.name)
  .residents.every(resident => resident.age >= age);
}
console.log(animalsOlderThan('otters', 7));

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.filter(employee => employeeName)
  .find(employee => employeeName === employee.firstName || employeeName === employee.lastName);
}
console.log(employeeByName());

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  return employees.some((employee, index) => employee.managers[index] === id);
}
console.log(isManager('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  const result = animals.reduce((acc, curr) => {
    acc[curr.name] = curr.residents.length;
    return acc;
  }, {});
  if (typeof species === 'string' && species.length !== 0) {
    return result[species];
  }
  return result;
}

function entryCalculator(entrants) {
  const { prices } = data;
  return Object.entries(entrants).reduce((acc, [person, amount]) => {
    acc += prices[person] * amount;
    return acc;
  }, 0);
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
