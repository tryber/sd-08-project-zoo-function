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

const animalsByIds = (...args) => animals.filter(({ id }) => args.some(value => value === id));

const animalsOlderThan = (animal, age) => {
  const res = animals.some(e => e.residents.every(value => e.name === animal && value.age > age));
  return res;
};

const employeeByName = employeeName => {
  if (!employeeName) return {};
  return employees.find(v => v.firstName === employeeName || v.lastName === employeeName);
};

const createEmployee = (info, awith) => ({ ...info, ...awith });

const isManager = id => {
  const res = employees.some(element => element.id === id && element.managers.length === 1);
  return res;
};

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => {
  const res = employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
  return res;
};

const animalCount = species => {
  if (!species) {
    const allResidents = {};
    animals.forEach(element => (allResidents[element.name] = element.residents.length));
    return allResidents;
  }

  return animals.find(ele => ele.name === species).residents.length;
};

const entryCalculator = entrants => {
  if (!entrants || entrants === {}) return 0;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const price1 = prices.Adult * Adult
  const price2 =prices.Senior * Senior
  const price3 =prices.Child * Child
  return price1 + price2 + price3;
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
