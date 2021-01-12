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

const data = require('./data');
const { animals, employees, prices } = require('./data');

function animalsByIds(...ids) {
  return ids.map(itemId => animals.find(itemAnimal => itemAnimal.id === itemId));
}

function animalsOlderThan(animal, age) {
  return animals.find(item => item.name === animal).residents.every(some => some.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(obj => obj.firstName === employeeName || obj.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(item => item.managers.find(byId => byId === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const peopleNew = { id, firstName, lastName, managers, responsibleFor };
  return data.employees.push(peopleNew);
}

function animalCount(species) {
  if (species !== undefined) {
    return animals.find(item => item.name === species).residents.length;
  }
  return animals.reduce((rolAnimals, eachAnimal) =>
    ({ ...rolAnimals, [eachAnimal.name]: eachAnimal.residents.length })
  , {});
}

function entryCalculator(entrants) {
  if (entrants === undefined) {
    return 0;
  }
  const { Adult: adultPrice, Senior: seniorPrice, Child: childPrice } = prices;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  return (adultPrice * Adult) + (seniorPrice * Senior) + (childPrice * Child);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const openTime = {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED',
  };
  return !dayName ? openTime : Object.fromEntries([[dayName, openTime[dayName]]]);
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  Object.keys(data.prices).forEach((element) => {
    data.prices[element] *= (1 + (percentage / 100));
    data.prices[element] = (Math.floor(Number((data.prices[element]) * 100) + 1) / 100).toFixed(2);
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
