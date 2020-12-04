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

// map()
// reduce()
// filter()
// find()
// sort()

const { animals } = require('./data');

const animalsByIds = (...ids) => ids.map(id => animals.find(animal => animal.id === id));

const animalsOlderThan = (animal, age) => {
  const name = animals.find(specie => specie.name === animal);

  return ages = name.residents.every(specie => specie.age >= age);
};

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
