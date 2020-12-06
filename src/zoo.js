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

function animalsByIds(...id) {
  if (!id) return [];
  const list = [];
  id.forEach(item => list.push(data.animals.find(a => a.id === item)));
  return list;
}


function animalsOlderThan(animal, age) {
  const filterAnimals = data.animals.find(item => item.name === animal);
  return filterAnimals.residents.every(item => item.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find(i => i.firstName === employeeName || i.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(item => item.managers.some(item2 => item2 === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({ id: id, firstName: firstName, lastName: lastName, managers: managers, responsibleFor: responsibleFor });
}

function animalCount(species) {
  const result = {};
  if(!species) {
    data.animals.forEach(item => {
      result[item.name] = item.residents.length
    })
    return result;
  }
  return data.animals.find(item => item.name === species).residents.length;
}

function entryCalculator(entrants) {
  if(entrants === undefined || Object.keys(entrants).length == 0) {return 0};
  const arrayEntrants = Object.entries(entrants);
  const arrayPrices = Object.entries(data.prices);
  const result = [];
  arrayEntrants.forEach(item => result.push((item[1] * data.prices[item[0]])));
  return result.reduce((acc, curr) => acc + curr);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  //prioridade 01
}

function oldestFromFirstSpecies(id) {
  // seu código 
}

function increasePrices(percentage) {
  // prioridade 02
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
