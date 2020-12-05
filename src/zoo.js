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
  const retorno = data.animals.filter(elemento => ids.includes(elemento.id));

  return retorno;
}

function animalsOlderThan(animal, age) {
  const animalBuscado = data.animals.find(elemento => elemento.name === animal);
  return animalBuscado.residents.every(elemento => elemento.age > age);
}

function employeeByName(employeeName) {
  const retorno = data.employees
    .find(element => element.firstName === employeeName || element.lastName === employeeName);

  if (employeeName) {
    return retorno;
  } return {};
}

function createEmployee(personalInfo, associatedWith) {
  const retorno = data.employees
  .map((elemento, associacao) => ({ elemento: personalInfo, associacao: associatedWith }));
  return retorno;
}

function isManager(id) {
  const retorno = data.employees.some(element => element.managers.includes(id));
  return retorno;
}
isManager('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1');

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // const retorno = data.employees.push(id, firstName, lastName, managers, responsibleFor);
  // return retorno;
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
