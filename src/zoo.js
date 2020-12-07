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
  if (!ids) return [];
  return ids.map(id => animals.find(animal => animal.id === id));
}

function animalsOlderThan(animal, age) {
  const animalsFilter = animals.filter(species => species.name === animal);
  return animalsFilter
    .every(species => species.residents.every(individuo => individuo.age > age));
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees
    .find(person => person.firstName === employeeName || person.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = {};
  Object.assign(newEmployee, personalInfo, associatedWith);
  return newEmployee;
}

function isManager(id) {
  return employees
    .some(person => person.managers.some(manager => manager === id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const newEmployee = {};
  if (!managers) managers = [];
  if (!responsibleFor) responsibleFor = [];
  newEmployee.id = id;
  newEmployee.firstName = firstName;
  newEmployee.lastName = lastName;
  newEmployee.managers = managers;
  newEmployee.responsibleFor = responsibleFor;
  employees.push(newEmployee);
}

function animalCount(species) {
  const animalsFind = {};
  if (!species) {
    animals.forEach((animal) => {
      const objectAnimal = {};
      objectAnimal[animal.name] = animal.residents.length;
      Object.assign(animalsFind, objectAnimal);
    });
    return animalsFind;
  }
  const objectAnimal = animals.find(animal => animal.name === species);
  return objectAnimal.residents.length;
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
