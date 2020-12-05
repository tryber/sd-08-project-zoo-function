// const data = require('./data');
const { animals, employees } = require('./data');

function animalsByIds(...ids) {
  if (!ids) return [];
  return animals.filter(specie => ids.includes(specie.id));
}

function animalsOlderThan(animal, age) {
  return animals.find(specie => specie.name === animal).residents
  .every(specieAge => specieAge.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees
  .find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

/* Solução tirada do Discourse para converter array de objetos em um objeto
https://forum.betrybe.com/t/reduce-converter-array-de-objetos-em-objeto/332 */
function animalCount(species) {
  if (!species) { 
    const nameAndResidents = animals.map((specie) => ({ [specie.name]: specie.residents.length }));
    return nameAndResidents.reduce((previousValue, currentValue) => Object.assign(previousValue, currentValue), {});
  }
  return animals.find(specie => specie.name === species).residents.length;
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
