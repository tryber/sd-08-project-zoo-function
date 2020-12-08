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

const { animals, employees, hours, prices } = require('./data');
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

const entryCalculator = (tckt = false) => {
  if (tckt) {
    return Object.keys(tckt).reduce((t, e) => t + (prices[e] * tckt[e]), 0);
  }
  return 0;
};

const returnAnimalsList = (options, specie) => {
  if (options.sex) {
    return specie.residents.filter(actual => actual.sex === options.sex).map(e => e.name);
  }
  return specie.residents.map(actual => actual.name);
};

const getAnimals = (options, place) =>
  animals.filter(specie => specie.location === place).map((specie) => {
    if (options.includeNames) {
      const actualSpecie = specie.name;
      const list = returnAnimalsList(options, specie);
      return (options.sorted) ? { [actualSpecie]: list.sort() } : { [actualSpecie]: list };
    }
    return specie.name;
  });

const animalMap = (options = false) => {
  const animalsMap = { NE: [], NW: [], SE: [], SW: [] };
  Object.keys(animalsMap).forEach((place) => {
    animalsMap[place] = getAnimals(options, place);
    return true;
  });
  return animalsMap;
};

const schedule = (dayName = false) => {
  const allDays = Object.keys(hours).reduce((curr, day) => {
    curr = { ...curr, [day]: `Open from ${hours[day].open}am until ${hours[day].close - 12}pm` };
    if (hours[day].open === hours[day].close) curr[day] = 'CLOSED';
    return curr;
  }, {});
  if (dayName) {
    return { [dayName]: allDays[dayName] };
  }
  return allDays;
};

const oldestFromFirstSpecies = (id) => {
  const firstSpecie = employees.find(e => e.id === id).responsibleFor[0];
  const animal = animals.find(e => e.id === firstSpecie).residents.reduce((r, a) => {
    return (a.age > r.age) ? a : r;
  });
  return [animal.name, animal.sex, animal.age];
};

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
