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

function animalsByIds(...ids) {
  if (!ids) {
    return [];
  }
  return animals.filter(animal => ids.includes(animal.id));
}


function animalsOlderThan(animalName, age) {
  let result = animals.find(animal => animal.name === animalName);
  if (result) result = result.residents.every(animal => animal.age >= age);
  return result;
}

const { employees } = require('./data');

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  const result = employees.find(name => (
    employeeName.includes(name.firstName) || employeeName.includes(name.lastName)
  ));
  return result;
}

function createEmployee(personalInfo, associatedWith) {
  const result = {
    ...personalInfo,
    ...associatedWith,
  };
  return result;
}


function isManager(id) {
  return employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const personalInfo = { id, firstName, lastName };
  const associatedWith = { managers, responsibleFor };
  employees.push(createEmployee(personalInfo, associatedWith));
}

function animalCount(species) {
  const result = animals.reduce((acc, cur) => {
    acc[cur.name] = cur.residents.length;
    return acc;
  }, {});
  if (typeof species === 'string' && species.length !== 0) return result[species];
  return result;
}

const { prices } = require('./data');

function entryCalculator(entrants) {
  if (typeof entrants !== 'object' || Object.keys(entrants).length === 0) return 0;
  return Object.keys(entrants).reduce((acumulador, chave) => (
    acumulador + (entrants[chave] * prices[chave])
  ), 0);
}

function getResidentsNames(animalName, sorted, sex) {
  let result = animals.find(animal => animal.name === animalName);
  result = result.residents;
  if (typeof sex === 'string') {
    result = result.filter(animal => animal.sex === sex);
  }
  result = result.map(resident => resident.name);
  if (sorted) result.sort();
  return { [animalName]: result };
}

function animalMap(options = {}) {
  const { includeNames = false, sorted = false, sex } = options;

  let result = animals.reduce((acc, animal) => {
    const { name, location } = animal;
    if (!acc[location]) {
      acc[location] = [];
    }
    acc[location].push(name);
    return acc;
  }, {});

  if (includeNames) {
    result = Object.entries(result).reduce((acc, [key, animalName]) => {
      acc[key] = animalName.map(name => getResidentsNames(name, sorted, sex));
      return acc;
    }, {});
  }

  return result;
}

const { hours } = require('./data');

function schedule(dayName) {
  const result = Object.entries(hours).reduce((acumulador, [key, val]) => {
    const { open, close } = val;
    acumulador[key] = close - open > 0 ? `Open from ${open}am until ${close % 12}pm` : 'CLOSED';
    return acumulador;
  }, {});
  if (typeof dayName === 'string' && dayName.length !== 0) return { [dayName]: result[dayName] };
  return result;
}

function oldestFromFirstSpecies(id) {
  const employee = employees.find(current => current.id === id);
  const firstSpeciesId = employee.responsibleFor[0];
  const animal = animalsByIds(firstSpeciesId)[0];
  const { residents } = animal;
  const oldest = residents.reduce((maisVelho, atual) => (
    atual.age > maisVelho.age ? atual : maisVelho
  ));
  return Object.values(oldest);
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
