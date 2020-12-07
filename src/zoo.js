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

const { animals, employees, hours } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  if (ids.length === 0) {
    return [];
  }
  return ids.map(id => animals.find(animal => animal.id === id));
  //  feito com dica do Lauro no plantão.
}

function animalsOlderThan(specie, age) {
  return animals.find(animal => animal.name === specie)
    .residents
    .every(resident => resident.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return employees
    .find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  return employees.map(employee => employee.managers)
    .some(element => element.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (!species) {
    return animals.reduce((acc, current) => {
      acc[current.name] = current.residents.length;
      return acc;
    }, {});
  }
  return animals.filter(animal => animal.name === species)[0].residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.entries(entrants)
  .map(element => (element[1] *= data.prices[element[0]]))
  .reduce((acc, curr) => acc + curr);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  if (!dayName) {
    return Object.entries(hours).reduce((acc, curr) => {
      if (curr[0] === 'Monday') {
        acc[curr[0]] = 'CLOSED';
        return acc;
      }
      acc[curr[0]] = `Open from ${curr[1].open}am until ${curr[1].close - 12}pm`;
      return acc;
    }, {});
  }
  if (dayName === 'Monday') {
    return { Monday: 'CLOSED'};
  }
  const day = Object.entries(hours)
  .filter(element => element[0] === dayName)[0];
  const result = {};
  result[dayName] = `Open from ${day[1].open}am until ${day[1].close - 12}pm`;
  return result;
// return Object.entries(hours)
// .filter(element => element[0] === dayName)
// .reduce((acc, curr) => {
//   acc[curr[0]] = `Open from ${curr[1].open}am until ${curr[1].close - 12}pm`;
//   return acc;
//   }, {});
// }
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
