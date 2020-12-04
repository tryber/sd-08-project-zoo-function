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

function animalsByIds(...ids) {
  return ids ? ids.map((id) => data.animals.find((animal) => id === animal.id)) : [];
}

function animalsOlderThan(animal, age) {
  return data.animals
    .find((anim) => anim.name === animal)
    .residents.every((resident) => resident.age >= age);
}

function employeeByName(employeeName) {
  return employeeName ? data.employees
    .find(
      (employee) => employee.firstName === employeeName || employee.lastName === employeeName) : {};
}

function createEmployee(personalInfo, associatedWith) {
  return {...personalInfo, ...associatedWith};
}

function isManager(id) {
  return data.employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  return species ? 
    data.animals.find((animal) => species === animal.name).residents.length :
    data.animals.reduce(
      (acc, curr) => {
        acc[curr.name] = curr.residents.length;
        return acc;
      }, {});
}

function entryCalculator(entrants) {
  return entrants ?
    Object.keys(entrants).reduce(
      (acc, curr) => acc + (data.prices[curr] * entrants[curr]), 0) :
    0;
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
