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

function animalsByIds(...ids) {
  return animals.filter(({ id }) => ids.includes(id));
}

function animalsOlderThan(animal, age) {
  return animals.find(({ name }) => name === animal)
  .residents.every(minAge => minAge.age >= age);
}

function employeeByName(employeeName) {
  return !employeeName ? {} :
    employees.find(nameObject =>
    nameObject.firstName === employeeName || nameObject.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return ({ ...personalInfo, ...associatedWith });
}

function isManager(id) {
  return employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}
// resolvi com ajuda do Bruno Pedrosa
function animalCount(species) {
  if (!species) {
    return animals.reduce((acc, curr) => {
      acc[curr.name] = curr.residents.length;
      return acc;
    }, {});
  }
  return animals.find(({ name }) => name === species).residents.length;
}

function entryCalculator(entrants) {
  return (!entrants) ? 0 : Object.keys(entrants).reduce((acc, curr) =>
  acc + (entrants[curr] * prices[curr]), 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  const employe = employees.find(search => search.id === id).responsibleFor[0];
  const result = animals
  .find(name => name.id === employe).residents
  .sort((recent, old) => old.age - recent.age);
  return Object.values(result[0]);
}
// resolvi com a ajuda do plantão do mestre PS
function increasePrices(percentage) {
  const increase = 1 + (percentage / 100);
  Object.keys(prices).forEach(key => (
    prices[key] = Math.round(prices[key] * increase * 100) / 100
  ));
}
// resolvi com a ajuda do plantão do mestre PS
function employeeById(id) {
  return employees.find(employee => employee.id === id);
}
function employeeCoverage(idOrName) {
  const result = employees.reduce((acc, employee) => {
    const { firstName, lastName, responsibleFor } = employee;
    acc[`${firstName} ${lastName}`] = responsibleFor.map(id => animalsByIds(id)[0].name);
    return acc;
  }, {});
  if (typeof idOrName === 'string' && idOrName.length !== 0) {
    const employee = employeeByName(idOrName) || employeeById(idOrName);
    const { firstName, lastName } = employee;
    const name = `${firstName} ${lastName}`;
    return { [name]: result[name] };
  }
  return result;
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
