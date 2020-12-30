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
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return animals.find(animalObj => animalObj.name === animal)
        .residents.every(animalAge => animalAge.age >= age);
}

function employeeByName(employeeName) {
  return (employees.find(emp => emp.firstName === employeeName || emp.lastName === employeeName,
  ) || {});
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (!species) {
    return animals.reduce((acc, curr) => {
      acc[curr.name] = curr.residents.length;
      return acc;
    }, {});
  }
  return animals.find(animal => animal.name === species)
        .residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) return 0;
  return Object.keys(entrants).reduce(
    (acc, curr) => acc + (data.prices[curr] * entrants[curr]), 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const ret = Object.entries(hours).reduce((acc, [key, value]) => {
    const { open, close } = value;
    acc[key] = close - open > 0 ? `Open from ${open}pm until ${close % 12}pm` : 'CLOSED';
    return acc;
  }, {});
  if (typeof dayName === 'string' && dayName.length > 0) return { [dayName]: ret[dayName] };
  return ret;
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
