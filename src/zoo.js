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
const { animals, prices } = require('./data.js');
const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.find(id => animal.id === id));
}


function animalsOlderThan(animal, age) {
  return animals.find(animaLs => animaLs.name === animal).residents
    .every(ageAnimal => ageAnimal.age >= age);
}


function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees
    .find(nome => nome.firstName === employeeName
      || nome.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(employeeS => employeeS.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  const obj = {};
  if (species) {
    return data.animals.find(animal => animal.name === species).residents.length;
  }
  data.animals.forEach((specie) => {
    obj[specie.name] = specie.residents.length;
  });
  return obj;
}

function entryCalculator(entrants) {
  if (!entrants || Object.entries(entrants).length === 0) {
    return 0;
  }
  const obj = Object.entries(entrants);
  return obj.reduce((acc, current) => acc + (current[1] * prices[current[0]]), 0);
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
  const increasePERC = (percentage / 100) + 1;
  Object.entries(prices).forEach(([chave, valor]) => {
    const newPriceWithPerc = valor * increasePERC;
    prices[chave] = Math.round(newPriceWithPerc * 100) / 100;
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
