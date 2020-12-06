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


const animalsByIds = (...ids) => ids.map(id => animals.find(animal => animal.id === id));


const animalsOlderThan = (n, g) => animals.find(e => e.name === n).residents.every(a => a.age >= g);


const employeeByName = (employeeName) => {
  if (!employeeName) {
    return {};
  }
  return employees.find(a => a.firstName === employeeName || a.lastName === employeeName);
};


const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });


const isManager = id => employees.map(a => a.managers)
.reduce((a, b) => a.concat(b)).some(a => a === id);


function addEmployee(id = [], firstName = [], lastName = [], managers = [], responsibleFor = []) {
  const people = {
  id,
  firstName,
  lastName,
  managers,
  responsibleFor,
  };
  employees.push(people);
  return employees
};


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
