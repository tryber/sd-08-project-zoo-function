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
const { animals } = require('./data');
const { employees } = require('./data');
const { prices } = require('./data');

function animalsByIds(...ids) {
  if (ids === undefined) return ([]);
  const allids = [];
  ids.forEach(identifier => allids.push(animals.find(element => element.id === identifier)));
  return allids;
}

function animalsOlderThan(animal, age) {
  const loco = animals.find(element => element.name === animal).residents;
  const mapear = loco.map(element => element.age);
  const verificar = mapear.every(element => element > age);
  return verificar;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return ({});
  const f = employees.find(e => e.firstName === employeeName || e.lastName === employeeName);
  return f;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const mapa = employees.map(element => element);
  const lookFor = mapa.some(element => element.managers.includes(id));
  return lookFor;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {};
  newEmployee.id = id;
  newEmployee.firstName = firstName;
  newEmployee.lastName = lastName;
  newEmployee.managers = managers;
  newEmployee.responsibleFor = responsibleFor;
  employees.push(newEmployee);
  return employees;
}

function animalCount(species) {
  if (species !== undefined) return animals.find(e => e.name === species).residents.length;
  const fullName = {};
  animals.forEach((e) => {
    fullName[e.name] = e.residents.length;
  });
  return fullName;
}

function entryCalculator(entrants) {
  
  
  if(entrants === undefined || Object.entries(entrants).length === 0 ) return 0
  let conta = 0;
  if(entrants.Adult !== undefined) conta+= entrants.Adult * prices.Adult
  if(entrants.Child !== undefined) conta+= entrants.Child * prices.Child
  if(entrants.Senior!== undefined) conta+= entrants.Senior * prices.Senior

  return conta;
}
function animalMap(options) {
  // seu código aqui
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
