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
const data = require('./data');

function animalsByIds(...ids) {
  if (!ids) return [];
  return animals.filter(animal => ids.find(id => animal.id === id));
}

function animalsOlderThan(animal, age) {
  return animals.find((a) => a.name === animal).residents.every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  if(!employeeName) return {};
  return employees.find(name => name.firstName === employeeName || name.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith }  
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
    responsibleFor
  });
}

function animalCount(species) {
  if(!species) {
    return animals.reduce((acc, animal) => {
      acc[animal.name] = animal.residents.length;
      return acc;
    }, {});
  }
  return animals.find((animal) => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || Object.values(entrants).length === 0) return 0;
  return Object.keys(entrants).reduce((acc, key) => acc + prices[key] * entrants[key], 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  const animalSpecie = animals.find(animal => {
    return animal.id === employees.find(employee => employee.id === id).responsibleFor[0];
  });
  let maior = animalSpecie.residents[0].age;
  animalSpecie.residents.map(element => { if (element.age > maior) maior = element; });
  ({ name, sex, age } = maior);
  return [ name, sex, age ];
}

function increasePrices(percentage) {
  Object.entries(prices).forEach(([key, value]) => {
    prices[key] = parseFloat(((value + 0.001) * ((percentage / 100) + 1)).toFixed(2));
  });
}
// console.log(increasePrices(50))
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
