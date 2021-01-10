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
  // seu código aqui
  const animalsArray = [];
  if (ids !== undefined) {
    ids.forEach((element) => {
      animalsArray.push(animals.find(animal => (animal.id === element)));
    });
  }
  return animalsArray;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const especie = animals.find(animalSpecies => animalSpecies.name === animal);
  const result = especie.residents.every(animalAge => animalAge.age >= age);
  return result;
}

function employeeByName(employeeName) {
  // seu código aqui
  let result = {};
  if (employeeName !== undefined) {
    result = employees
    .find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
  }
  return result;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const newEmployee = {};
  Object.assign(newEmployee, personalInfo, associatedWith);
  return newEmployee;
}

function isManager(id) {
  // seu código aqui
  const result = employees.some(manager => manager.managers.includes(id));
  return result;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(newEmployee);
}

function animalCount(species) {
  // seu código aqui
  let count = {};
  if (species === undefined) {
    animals.forEach((specie) => {
      count[specie.name] = specie.residents.length;
    });
  } else {
    count = animals.find(specie => specie.name === species);
    count = count.residents.length;
  }
  return count;
}

function entryCalculator(entrants) {
  // seu código aqui
  return (!entrants) ? 0 : Object.keys(entrants).reduce((acc, curr) => acc + (entrants[curr] * prices[curr]), 0);
}

function animalMap(options) {
  // seu código aqui

}

function schedule(dayName) {
  // seu código aqui
}

console.log(schedule());

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
