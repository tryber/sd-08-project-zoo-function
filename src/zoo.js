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

const { employees } = require('./data');
const { animals } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.some(id => animal.id === id));
  // return animals.map(ids => animals.find(id => animals.id === id));
}
console.log(animalsByIds());

function animalsOlderThan(animal, age) {
  const animalAgora = animals.find(amm => amm.name === animal);
  return animalAgora.residents.every(name => name.age >= age);
}
console.log(animalsOlderThan('penguins', 10));

function employeeByName(employeeName) {
  let retorno;
  if (typeof employeeName === 'undefined') {
    retorno = {};
  } else {
    retorno = employees.find(empregado => empregado.firstName === employeeName
      || empregado.lastName === employeeName);
  }
  return retorno;
}
console.log(employeeByName());

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  // seu código aqui
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
