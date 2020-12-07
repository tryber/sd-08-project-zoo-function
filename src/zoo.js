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

function animalsByIds(...ids) {
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return animals.find(aniObj => aniObj.name === animal).residents.every(aniObj => aniObj.age > age);
}

function employeeByName(emp) {
  if (emp === undefined) return {};
  return employees.find(n => n.firstName === emp || n.lastName === emp);
}

function createEmployee(personalInfo, associatedWith) {
  return ({ ...personalInfo, ...associatedWith });
}

function isManager(id) {
  return employees.some(idManager => idManager.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const employ = { id, firstName, lastName, managers, responsibleFor };
  return employees.push(employ);
}

function animalCount(species) {
  if (species === undefined) {
    return animals.reduce((acc, curr) => {
      acc[curr.name] = curr.residents.length;
      return acc;
    }, {});
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.entries(entrants).length === 0) return 0;
  const entrantsArray = Object.keys(entrants);
  return entrantsArray.reduce((acc, curr) => acc + (entrants[curr] * prices[curr]), 0);
}

function animalMap(options) {
}

function schedule(dayName) {
  const arrayHours = Object.entries(hours);
  const result = arrayHours.reduce((acc, [key, val]) => {
    const { open, close } = val;
    acc[key] = close - open > 0 ? `Open from ${open}am until ${close % 12}pm` : 'CLOSED';
    return acc;
  }, {});
  if (typeof dayName === 'string') {
    return ({ [dayName]: result[dayName] });
  }
  return result;
}

function oldestFromFirstSpecies(id) {
  const employee = employees.find(emp => emp.id === id);
  const firstId = employee.responsibleFor[0];
  const animal = animalsByIds(firstId)[0];
  const { residents } = animal;
  const oldest = residents.reduce((maisVelho, atual) => {
    if (atual.age > maisVelho.age) {
      return atual;
    }
    return maisVelho;
  });
  return Object.values(oldest);
}

function increasePrices(percentage) {
  const increase = 1 + (percentage / 100);
  Object.keys(prices).forEach((key) => {
    prices[key] = Math.round(prices[key] * increase * 100) / 100;
  });
  return prices;
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
