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
  const result = [];
  ids.forEach(id => result.push(animals.find(Element => Element.id === id)));
  return result;
}

function animalsOlderThan(animal, age2) {
  const species = animals.find(({ name }) => name === animal).residents;
  return species.every(({ age }) => age >= age2);
}


function employeeByName(employeeName) {
  let result = employees.find(({ firstName, lastName }) => 
  employeeName === firstName || employeeName === lastName);
  if (employeeName === undefined) {
    result = {};
  }
  return result;
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign({}, personalInfo, associatedWith);
}

function isManager(id) {
  return employees.some(({ managers }) => managers.some(index => index === id));
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

const animalsCount = () => {
  const result = {};
  animals.forEach(({ name, residents }) => {result[name] = residents.length});
  return result;
}

function animalCount(species) {
  if (species === undefined) {
    return animalsCount();
  }
  return animals.find(({ name }) => name === species).residents.length;
}

function entryCalculator(entries) {
  if (typeof(entries) !== 'object') {return 0}
  const { Adult = 0, Child = 0, Senior = 0 } = entries
  const adultPrice = prices.Adult * Adult;
  const childPrice = prices.Child * Child;
  const seniorPrice = prices.Senior * Senior;
  const totalPrice = adultPrice + childPrice + seniorPrice
  return totalPrice;
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
