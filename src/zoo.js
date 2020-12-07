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
const { employees } = require('./data');
const { prices } = require('./data');
const { hours } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  if (!ids) return [];
  return animals.filter(animal => ids.find(id => animal.id === id));
}

function animalsOlderThan(animal, age) {
  return animals.find(a => a.name === animal).residents.every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find(name => name.firstName === employeeName || name.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(someId => someId.managers.includes(id));
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
    return animals.reduce((acc, animal) => {
      acc[animal.name] = animal.residents.length;
      return acc;
    }, {});
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || Object.values(entrants).length === 0) return 0;
  return Object.keys(entrants).reduce((acc, key) => acc + (prices[key] * entrants[key]), 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  if (!dayName) {
    return Object.entries(hours).reduce((acc, [key, value]) => {
      acc[key] = value.open > 0 ? `Open from ${value.open}am until ${value.close - 12}pm` : 'CLOSED';
      return acc;
    }, {});
  }
  if (dayName === 'Monday') return { [dayName]: 'CLOSED' };
  if (Object.keys(hours).includes(dayName)) return { [dayName]: `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm` };
  return 0;
}

function oldestFromFirstSpecies(id) {
  const employ = employees.find(employee => employee.id === id).responsibleFor[0];
  const animalSpecie = animals.find(animal => animal.id === employ);
  let maior = animalSpecie.residents[0].age;
  animalSpecie.residents.map((element) => { if (element.age > maior) maior = element; return 0; });
  const { name, sex, age } = maior;
  return [name, sex, age];
}

function increasePrices(percentage) {
  Object.entries(prices).forEach(([key, value]) => {
    prices[key] = parseFloat(((value + 0.001) * ((percentage / 100) + 1)).toFixed(2));
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
