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
const data = require('./data');

function animalsByIds(...ids) {
  const filtered = [];
  ids.forEach(idE => filtered.push(animals.find(an => an.id === idE)));
  return filtered;
}

function animalsOlderThan(animal, ageTest) {
  const animalChoosen = animals.find(anim => anim.name === animal);
  const ages = [];
  animalChoosen.residents.forEach(element => ages.push(element.age));
  return ages.every(ag => ag > ageTest);
}

function employeeByName(eName = '') {
  let employee = {};
  if (eName.length === 0) {
    return employee;
  }
  employee = employees.find(emp => emp.firstName === eName || emp.lastName === eName);
  return employee;
}

function createEmployee(personalInfo, associatedWith) {
  const newEm = { ...personalInfo, ...associatedWith };
  return newEm;
}

function isManager(id) {
  let test = false;
  employees.forEach((emp) => {
    const managersId = emp.managers;
    if (managersId.some(ele => ele === id) === true) {
      test = true;
    }
  });
  return test;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEm = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEm);
  return employees;
}

function animalCount(species = 'all') {
  let anCount = 0;
  if (species === 'all') {
    anCount = animals.reduce((acc, anim) => {
      acc[anim.name] = anim.residents.length;
      return acc;
    }, {});
  } else {
    anCount = animals.find(anim => anim.name === species).residents.length;
  }
  return anCount;
}

function entryCalculator(entrants) {
  // seu código aqui
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
