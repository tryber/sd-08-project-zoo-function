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


const { animals, employees, prices, hours } = require('./data');
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
  const result = Object.entries(hours).reduce((acumulador, [key, val]) => {
    const { open, close } = val;
    acumulador[key] = close - open > 0 ? `Open from ${open}am until ${close % 12}pm` : 'CLOSED';
    return acumulador;
  }, {});
  if (typeof dayName === 'string' && dayName.length !== 0) {
    return {
      [dayName]: result[dayName],
    };
  }
  return result;
}

function oldestFromFirstSpecies(id) {
  const animalId = employees.find(a => a.id === id).responsibleFor[0];
  const older = animals.find(a => a.id === animalId).residents
  .reduce((a, b) => (a = b.age < a.age ? a : b));
  return [older.name, older.sex, older.age];
}

function increasePrices(num) {
  Object.entries(prices).forEach(([k, v]) => {
    prices[k] = Math.round((v * ((num / 100) + 1)) * 100) / 100;
  });
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
