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
const { employees } = require('./data');
const { prices } = require('./data');
const data = require('./data');

const animalsByIds = (...ids) => animals.filter((element, index) => element.id === ids[index]);

const animalsOlderThan = (animal, age) => animals
.filter(filterElement => filterElement.name === animal)
.every(everyElement => everyElement.residents[0].age > age);

const employeeByName = employeeName => employees
.find(element => element.firstName === employeeName || element.lastName === employeeName) || {};

const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });

const isManager = id => employees
.some(element => element.managers.includes(id));

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => employees
.push({
  id,
  firstName,
  lastName,
  managers,
  responsibleFor,
});

const animalCount = (species) => {
  if (species !== undefined) {
    return animals.find(element => element.name === species).residents.length;
  }
  // return animals.map(element => ({ [element.name]: element.residents.length }))
  // .reduce((acc, curr) => ({...acc, ...curr}));
  return animals.reduce((acc, curr) => {
    const { name, residents } = curr;
    return { ...acc, [name]: residents.length };
  }, {});
};

const entryCalculator = (entrants) => {
  if (entrants !== undefined) {
    return Object.entries(entrants)
    .reduce((acc, curr) => acc + (curr[1] * prices[curr[0]]), 0);
  }
  return 0;
};

function animalMap(options) { }

function schedule(percentage) {
  // seu código aqui
}

const oldestFromFirstSpecies = (id) => {
  const animal = animals
  .find(animalFind => animalFind.id === (employees
  .find(emploee => emploee.id === id).responsibleFor[0]));
  return Object.values(animal.residents.sort((a, b) => a.age - b.age)[animal.residents.length - 1]);
};

const roundUp = (num, decimal) => parseFloat((num + (4 / ((10 ** (decimal + 1)))))
.toFixed(decimal));

const increasePrices = percentage => Object.defineProperties(prices, {
  Adult: { value: roundUp((prices.Adult * (1 + (percentage / 100))), 2) },
  Senior: { value: roundUp((prices.Senior * (1 + (percentage / 100))), 2) },
  Child: { value: roundUp((prices.Child * (1 + (percentage / 100))), 2) },
});

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
