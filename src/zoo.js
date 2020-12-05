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
// 1
function animalsByIds(...ids) {
  return data.animals.filter(animal => ids.includes(animal.id));
}
// 2
function animalsOlderThan(animal, age) {
  // seu código aqui
  const animalsSpecies = data.animals.find(species => species.name === animal);
  const speciesOlderThan = animalsSpecies.residents.every(specie => specie.age >= age);
  return speciesOlderThan;
}
// 3
function employeeByName(employeeName) {
  const objectFuncionario = {};
  if (!employeeName) {
    return objectFuncionario;
  }
  const emplName = employeeName;
  const emplData = data.employees;

  const getObj = emplData.find(empl => empl.firstName === emplName || empl.lastName === emplName);
  return getObj;
}
// 4
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
// 5
function isManager(id) {
  // seu código aqui
  const empData = data.employees;
  const getManager = empData.some((man) => man.managers.find(manId => manId === id));
  return getManager;
}

// 6
function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}
// 7
function animalCount(species) {
  // seu código aqui
}
// 8
function entryCalculator(entrants) {
  // seu código aqui
}
// 9
function animalMap(options) {
  // seu código aqui
}
// 10
function schedule(dayName) {
  // seu código aqui
}
// 11
function oldestFromFirstSpecies(id) {
  // seu código aqui
}
// 12
function increasePrices(percentage) {
  // seu código aqui
}
// 13
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
