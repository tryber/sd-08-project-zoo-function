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

const { animals, employees, hours, prices } = data;

function animalsByIds(...ids) {
  if (!ids) return [];
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, inputAge) {
  return animals.find(theAnimal => theAnimal.name === animal)
  .residents.every(resident => resident.age >= inputAge);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) return {};
  return employees.filter(employee => employeeName)
  .find(employee => employeeName === employee.firstName || employeeName === employee.lastName);
}
// console.log(employeeByName());

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((employee, index) => employee.managers[index] === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  return species ? animals.find(animal => animal.name === species)
  .residents.length : animals.reduce((acc, animal) => {
    acc[animal.name] = animal.residents.length;
    return acc;
  }, {});
}

function entryCalculator(entrants = {}) {
  return Object.entries(entrants).reduce((accumulator, [person, amount]) => {
    accumulator += prices[person] * amount;
    return accumulator;
  }, 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  //
}

function oldestFromFirstSpecies(id) {
  const especieId = employees.find(employee => employee.id === id).responsibleFor[0];
  const especie = animals.find(animal => animal.id === especieId);
  const olderAnimalAge = Math.max(...especie.residents.map(resident => resident.age));
  return Object.values(especie.residents.find(resident => resident.age === olderAnimalAge));
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
