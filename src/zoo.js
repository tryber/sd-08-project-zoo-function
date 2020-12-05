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
  return data.animals.filter(animalId => ids.find(id => animalId.id === id));
}

function animalsOlderThan(animal, age) {
  return data.animals
    .find(animalName => animalName.name === animal)
    .residents.every(animalAge => animalAge.age >= age);
}

function employeeByName(employeeName) {
  return employeeName === undefined
    ? {}
    : data.employees.find(
        ({ firstName, lastName }) =>
          firstName === employeeName || lastName === employeeName,
      );
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  return data.employees.some(manager => manager.managers.includes(id));
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  return data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  return species
    ? data.animals.find(animal => animal.name === species).residents.length
    : data.animals.reduce((counter, obj) => {
      counter[obj.name] = obj.residents.length;
      return counter;
    }, {});
}

function entryCalculator(entrants) {
  // seu código aqui
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
