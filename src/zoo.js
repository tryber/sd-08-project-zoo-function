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

const animalsByIds = (...ids) => animals.filter(animal => ids.includes(animal.id));

const findAnimal = specie => animals.find(e => e.name === specie);

const animalsOlderThan = (specie, age) => findAnimal(specie).residents.every(e => e.age >= age);

const employeeByName = n => employees.find(e => (e.firstName === n || e.lastName === n)) || {};

const createEmployee = (empInfo, associatedWith) => {
  const newEmployee = { ...empInfo, ...associatedWith };
  return newEmployee;
};

const isManager = id => employees.some(e => e.managers.includes(id));

const addEmployee = (id, firstName, lastName, managers, responsibleFor) => {
  employees.push({
    id,
    firstName,
    lastName,
    managers: (managers || []),
    responsibleFor: (responsibleFor || []),
  });
};

const animalCount = (specie) => {
  if (specie) {
    return animals.find(e => e.name === specie).residents.length;
  }
  return animals.reduce((acc, actual) => {
    const animalsCount = { ...acc, [actual.name]: actual.residents.length };
    return animalsCount;
  }, {});
};

const entryCalculator = tckt => Object.keys(tckt).reduce((t, e) => t + (prices[e] * tckt[e]), 0);

const animalMap = (options = false) => {
  const animalsMap = { NE: [], NW: [], SE: [], SW: [] };
  Object.keys(animalsMap).map(locat => {
    return animalsMap[locat] = animals.filter(specie => specie.locat === locat).map(currSpecie => {
      if (options.includeNames) {
        const actualSpecie = currSpecie.name;
        let list = [];
        if (options.sex === 'female') {
          list = currSpecie.residents.filter(actual => actual.sex === 'female').map(e => e.name);
        } else if (options.sex === 'male') {
          list = currSpecie.residents.filter(actual => actual.sex === 'male').map(e => e.name);
        } else {
          list = currSpecie.residents.map(actual => actual.name);
        }
        return (options.sorted) ? { [actualSpecie]: list.sort() } : { [actualSpecie]: list };
      } else {
        return currSpecie.name
      }
    });
  })
  return animalsMap;
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
