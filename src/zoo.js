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

const returnAnimalsList = (options, specie) => {
  if (options.sex === 'female') {
    return list = specie.residents.filter(actual => actual.sex === 'female').map(e => e.name);
  } else if (options.sex === 'male') {
    return list = specie.residents.filter(actual => actual.sex === 'male').map(e => e.name);
  }
  return list = specie.residents.map(actual => actual.name);
}

const animalMap = (options = false) => {
  const animalsMap = { NE: [], NW: [], SE: [], SW: [] };
  Object.keys(animalsMap).map(place =>
    animalsMap[place] = animals.filter((specie) => specie.location === place).map(specie => {
      if (options.includeNames) {
        const actualSpecie = specie.name;
        const list = returnAnimalsList(options, specie);
        return (options.sorted) ? { [actualSpecie]: list.sort() } : { [actualSpecie]: list };
      } else {
        return specie.name;
      }
    })
  );
  return animalsMap;
};

const options = { includeNames: true, sex: 'female' }
console.log(animalMap());

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
