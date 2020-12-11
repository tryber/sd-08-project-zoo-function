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

function animalsByIds(...ids) {
  if (!ids) return [];
  return animals.filter(actua => actua.id === ids[0] || actua.id === ids[1]);
}


function animalsOlderThan(...ids) {
  return animals.find(tipobicho => tipobicho.name === ids[0])
  .residents.every(tipobicho => tipobicho.age >= 7);
}

function employeeByName(ids) {
  if (!ids) return {};
  return employees.find(func => func.firstName === ids || func.lastName === ids);
}

function createEmployee(...ids) {
  return {
    ...ids[0],
    ...ids[1],
  };
}

function isManager(...ids) {
  const trazid = employees.find(employ => employ.managers);
  const arr = (trazid.managers);
  if (arr.some(str => str === ids[0])) {
    return true;
  }
  return false;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  if ((!managers) || (!responsibleFor)) {
    const container = Object.assign(
      {},
      { id },
      { firstName },
      { lastName },
      { managers: [] },
      { responsibleFor: [] },
    );
    data.employees.push(container);
  } else if (managers !== undefined || responsibleFor !== undefined) {
    const container = Object.assign(
      {},
      { id },
      { firstName },
      { lastName },
      { managers },
      { responsibleFor },
    );
    data.employees.push(container);
  }
}

function animalCount(species) {
  const container = {};
  animals.filter((anima) => {
    container[anima.name] = anima.residents.length;
  });
  if (!species) {
      return container;
    }
  return container[species];
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
