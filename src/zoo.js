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
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  const result = {};
  if (!species) {
    data.animals.forEach((item) => {
      result[item.name] = item.residents.length;
    });
    return result;
  }
  return data.animals.find(item => item.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) { return 0; }
  const arrayEntrants = Object.entries(entrants);
  const result = [];
  arrayEntrants.forEach(item => result.push((item[1] * data.prices[item[0]])));
  return result.reduce((acc, curr) => acc + curr);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const operation = {};
  if (dayName === 'Monday') {
    operation[dayName] = 'CLOSED';
    return operation;
  } else if (dayName) {
    operation[dayName] = `Open from ${data.hours[dayName].open}am until ${data.hours[dayName].close - 12}pm`;
    return operation;
  }
  const arrayHours = Object.entries(data.hours);
  arrayHours.forEach((item) => {
    if (item[0] === 'Monday') {
      operation[item[0]] = 'CLOSED';
    } else {
      operation[item[0]] = `Open from ${item[1].open}am until ${item[1].close - 12}pm`;
    }
  });
  return operation;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

//const calcPercent = (num, percentage) => Math.ceil(num * (percentage + 100) / 100);

function increasePrices(percentage)  {
  Object.keys(data.prices).forEach(item => {
    data.prices[item] = Math.ceil(data.prices[item] * (100 + percentage)) / 100;
  })
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
