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


const { animals, employees, prices } = require('./data');
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
  return employees;
}


const animalCount = (species) => {
  if (species) {
    return animals.find(a => a.name === species).residents.length;
  }
  return animals.reduce((acc, current) => {
    acc[current.name] = current.residents.length;
    return acc;
  }, {});
};


const entryCalculator = (entrants) => {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.entries(entrants).reduce((acc, [key, val]) => (
    acc + (prices[key] * val)
  ), 0);
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
  const retorno = {
    Adult: parseFloat((49.99 + percentage * 49.995 / 100).toFixed(2)),
    Senior: parseFloat((24.99 + percentage * 24.995 / 100).toFixed(2)),
    Child: parseFloat((20.99 + percentage * 20.995 / 100).toFixed(2)),
  }
  Object.assign(prices, retorno);
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
