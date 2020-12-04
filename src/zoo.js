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
const data = require('./data');

function animalsByIds(...ids) {
  let result = [];
  ids.forEach((id) => result.push(animals.find((Element) => Element.id === id)))
  return result
}

function animalsOlderThan(animal, age2) {
  const species = animals.find(({name}) => name === animal).residents
  return species.every(({age}) => age >= age2 )
}

function employeeByName(employeeName) {
  let result = employees.find(({firstName, lastName}) => employeeName === firstName || employeeName === lastName)
  if(employeeName === undefined) {
  result = {}
  }
return result
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign({}, personalInfo, associatedWith)
}

function isManager(id) {
  return employees.some(({managers}) => managers.some((index) => index === id))
}

function addEmployee(id , firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor
  })
  
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
