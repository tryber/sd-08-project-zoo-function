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

const animalsByIds = (...ids) => ids.map(id => animals.find(animal => animal.id === id));

const animalsOlderThan = (animal, age) => {

}

const employeeByName = (employeeName) => {

}

const createEmployee = (personalInfo, associatedWith) => {

}

const isManager = (id) => {

}

const addEmployee = (id, firstName, lastName, managers, responsibleFor) => {

}

const animalCount = (species) => {

}

const entryCalculator = (entrants) => {

}

const animalMap = (options) => {

}

const schedule = (dayName) => {

}

const oldestFromFirstSpecies = (id) => {

}

const increasePrices = (percentage) => {

}

const employeeCoverage = (idOrName) => {

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
