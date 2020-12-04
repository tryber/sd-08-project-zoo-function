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

const { animals, employees } = require('./data');

const animalsByIds = (...rest) => animals.filter(({ id }) => rest.some(idKey => idKey === id));

const animalsOlderThan = (animal, key) =>
  animals.some(({ residents, name }) => residents.every(({ age }) => name === animal && age > key));

const employeeByName = employeeName =>
  employees.find(
    ({ firstName, lastName }) => firstName === employeeName || lastName === employeeName
  ) || {};

const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });

const isManager = (id) => employees.some(({ managers, id: idKey }) => managers.length === 1 && idKey === id);

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => employees.push({id, firstName, lastName, managers, responsibleFor});

const animalCount = (species) => {
  return species ?  animals.find(animal => animal.name === species).residents.length : animals.reduce((accAnimal, currAnimal) => Object.assign(accAnimal, {[currAnimal.name] : currAnimal.residents.length}), {});
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
