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

function animalsByIds(...ids) {
  if (!ids || ids.length === 0) return [];
  return animals.filter(animal => ids.includes(animal.id));
}
function animalsOlderThan(animal, age) {
  return animals
    .find(animalss => animalss.name === animal)
    .residents.every(resident => resident.age > age);
}
function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find(
    e => e.firstName === employeeName || e.lastName === employeeName);
}
function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}
function isManager(id) {
  return employees.some(employee => employee.managers.includes(id));
}
function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (!species) {
    const obj = {};
    animals.forEach((e, index) => {
      obj[e.name] = e.residents.length;
    });
    return obj;
  }
  return animals.filter(e => species === e.name)[0].residents.length;
}
function entryCalculator(entrants) {
  if (!entrants) return 0;
  return Object.keys(entrants).reduce(
    (accumulator, currentValue) =>
      accumulator + (entrants[currentValue] * prices[currentValue]), 0);
}
function getResidents(animalName, sorted = false, sex) {
  let { residents } = animals.find(animal => animal.name === animalName);
  if (sex) residents = residents.filter(resident => resident.sex === sex);
  const names = residents.map(resident => resident.name);
  if (sorted) names.sort();
  return { [animalName]: names };
}
function animalMap(options = {}) {
  const { includeNames = false, sorted = false, sex } = options;
  const result = animals.reduce((previousValue, currentValue) => {
    const { location, name } = currentValue;
    if (!previousValue[location]) previousValue[location] = [];
    previousValue[location].push(name);
    return previousValue;
  }, {});
  if (includeNames) {
    return Object.entries(result).reduce((previousValue, [keys, value]) => {
      previousValue[keys] = value.map(name => getResidents(name, sorted, sex));
      return previousValue;
    }, {});
  }
  return result;
}
function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  Object.keys(prices)
  .forEach((ageGroup) => {
    prices[ageGroup] = Math.ceil(prices[ageGroup] * (percentage + 100)) / 100;
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
