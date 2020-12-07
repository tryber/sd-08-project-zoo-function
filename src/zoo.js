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

// const { animals, employees, hours, prices } = data;
const { animals, employees, prices } = data;

function animalsByIds(...ids) {
  const filtredAnimals = animals.filter(animal => ids.some(id => animal.id === id));
  return filtredAnimals || [];
}

function animalsOlderThan(animalName, age) {
  const residents = animals.filter(animal => animal.name === animalName)[0].residents;
  return residents.every(animal => animal.age >= age);
}

function employeeByName(employeeName) {
  const employeeFirstName = employees.find(({ firstName }) => firstName === employeeName);
  const employeeLastName = employees.find(({ lastName }) => lastName === employeeName);
  return employeeFirstName || employeeLastName || {};
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const allManagers = employees.reduce((acc, { managers }) => [...acc, ...managers], []);
  return allManagers.some(manager => manager === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const personalInfo = { id, firstName, lastName };
  const associatedWith = { managers, responsibleFor };
  const employee = createEmployee(personalInfo, associatedWith);
  employees.push(employee);
}

function animalCount(species) {
  if (species !== undefined) {
    const specificSpecies = animals.find(animal => animal.name === species);
    return specificSpecies.residents.length;
  }

  const allSpecies = animals.reduce((acc, currentSpecies) => {
    acc[currentSpecies.name] = currentSpecies.residents.length;
    return acc;
  }, {});

  return allSpecies;
}

function entryCalculator(...visitors) {
  if (visitors.length === 0) {
    return 0;
  }

  const { Adult: adultPrice, Child: childPrice, Senior: seniorPrice } = prices;
  const { Adult, Child, Senior } = visitors[0];

  const adultValue = adultPrice * Adult || 0;
  const childValue = childPrice * Child || 0;
  const seniorValue = seniorPrice * Senior || 0;

  return adultValue + childValue + seniorValue;
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
