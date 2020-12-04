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

const { animals, employees } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  const result = [];
  if (ids.length === 0) return result;
  const findById = param => animals.find(animal => animal.id === param);
  ids.forEach(param => result.push(findById(param)));
  return result;
}

function animalsOlderThan(animal, age) {
  const findAnimal = animals.find(element => element.name === animal);
  return findAnimal.residents.every(element => element.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return employees.find(employee => employee.firstName === employeeName ||
    employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
}


function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {};
  newEmployee.id = id;
  newEmployee.firstName = firstName;
  newEmployee.lastName = lastName;
  newEmployee.managers = managers;
  newEmployee.responsibleFor = responsibleFor;

  employees.push(newEmployee);
}

function animalCount(species) {
  if (species === undefined) {
    const animalsAndNumbers = {};
    animals.forEach((animal) => {
      animalsAndNumbers[animal.name] = animal.residents.length;
    });
    return animalsAndNumbers;
  }
  const animalBySpecie = animals.find(animal => animal.name === species);
  return animalBySpecie.residents.length;
}

function entryCalculator(entrants) {
  let needToBePayed = 0;
  if (entrants === undefined || Object.keys(entrants).length === 0) return needToBePayed;

  const keys = Object.keys(entrants);
  keys.forEach((key) => {
    if (key === 'Adult') {
      needToBePayed += parseFloat(entrants[key] * 49.99);
    }
    if (key === 'Child') {
      needToBePayed += parseFloat(entrants[key] * 20.99);
    }
    if (key === 'Senior') {
      needToBePayed += parseFloat(entrants[key] * 24.99);
    }
  });

  return needToBePayed;
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
