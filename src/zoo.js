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
const { prices } = require('./data');
// const { hours } = require('./data');

const animalsByIds = (...ids) => (animals.filter(animal => ids.find(id => (animal.id === id))));

const animalsOlderThan = (animal, ages) => {
  const animalName = animals.find(({ name }) => (name === animal));
  return animalName.residents.every(({ age }) => age >= ages);
};

const employeeByName = (employeeName) => {
  if (!employeeName) return {};
  return employees.find(({ firstName, lastName }) => (firstName === employeeName
    || lastName === employeeName));
};

const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });

const isManager = id => employees.some(({ managers }) =>
managers.find(identifier => identifier === id));

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => {
  const insertEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(insertEmployee);
};

const animalCount = (species) => {
  const sum = animals.reduce((acc, { name, residents }) => {
    acc[name] = residents.length;
    return acc;
  }, {});
  return (!species) ? sum : sum[species];
};

const entryCalculator = (entrants) => {
  if (!entrants) return 0;
  const visits = Object.entries(entrants);
  return visits.reduce((sum, [type, value]) => sum + (prices[type] * value), 0);
};

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
