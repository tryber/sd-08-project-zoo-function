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
//1
function animalsByIds(...ids) {
  return data.animals.filter(animal => ids.includes(animal.id));
}
//2
function animalsOlderThan(animal, age) {
  // seu código aqui
  const animalsSpecies = data.animals.find(species => species.name === animal);
  const speciesOlderThan = animalsSpecies.residents.every(specie => specie.age >= age);
  return speciesOlderThan;
}
//3
function employeeByName(employeeName) {
  const objectFuncionario = {};
  if (!employeeName) {
    return objectFuncionario;
  }
  const getFuncionario = data.employee.find(nameOrLast => nameOrLast.firstName === employeeName || nameOrLast.lastName === employeeName);
  return getFuncionario;
}
//4
function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const createNewEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return createNewEmployee;
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
