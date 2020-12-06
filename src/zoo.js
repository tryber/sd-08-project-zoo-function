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

const animalsByIds = (...ids) => animals.filter(animal => ids.includes(animal.id));

const animalsOlderThan = (animal, age) => animals.find(specie => specie.name === animal)
  .residents.every((specie => specie.age >= age));


const employeeByName = employeeName => employees.find(employee =>
  employee.firstName === employeeName || employee.lastName === employeeName) || {};


const createEmployee = (personalInfo, associatedWith) => Object
  .assign(personalInfo, associatedWith);


const isManager = id => employees.some(employee => employee.managers.includes(id));


const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => {
  const personalInfo = { id, firstName, lastName };
  const associatedWith = { managers, responsibleFor };
  employees.push(createEmployee(personalInfo, associatedWith));
};

const animalCount = (species) => {
  const specie = animals.reduce((acc, currentValue) => {
    acc[currentValue.name] = currentValue.residents.length;
    return acc;
  }, {});

  if (species === undefined) {
    return specie;
  }
  return specie[species];
};


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
