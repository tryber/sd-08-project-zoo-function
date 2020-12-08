const { animals } = require('./data');
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
  //rest operator
  //filter ids por parametro
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  //find retorna apenas 1
  //every (todos os itens necessitam satisfazer a condicao)
  //some (se ao menos um item retornar true)
  return animals.find(specie => specie.name === animal).residents.every(olderThan => olderThan.age >= age);
}

function employeeByName(employeeName) {
  // undefined: {}
  //find //fisrt === employeeName OU lasr === employeeName
}

function createEmployee(personalInfo, associatedWith) {
  //spread operator (...)
}

function isManager(id) {
  //some 
  //find //includes (verificar se a pessoa possui pelo menos um id de manager)
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
