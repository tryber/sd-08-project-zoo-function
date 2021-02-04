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
const data = require('./data');
const { employees } = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.find(id => id === animal.id));
}

function animalsOlderThan(animal, age) {
  return animals.find(specie => specie.name)
  .residents.every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.filter(employee => employeeName)
  .find(employee => employeeName === employee.firstName || employeeName === employee.lastName);
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  return employees.some((employee, index) => employee.managers[index] === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  const result = animals.reduce((acc, curr) => {
    acc[curr.name] = curr.residents.length;
    return acc;
  }, {});
  if (typeof species === 'string' && species.length !== 0) {
    return result[species];
  }
  return result;
}

function entryCalculator(entrants = {}) {
  return Object.entries(entrants).reduce((acc, [person, amount]) => {
    acc += data.prices[person] * amount;
    return acc;
  }, 0);
}

function animalMap(options) {

}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  const especieId = data.employees.find(employee => employee.id === id).responsibleFor[0];
  const especie = data.animals.find(animal => animal.id === especieId);
  const olderAnimalAge = Math.max(...especie.residents.map(resident => resident.age));
  return Object.values(especie.residents.find(resident => resident.age === olderAnimalAge));
}

function increasePrices(percentage) {
  const increase = percentage / 100;
  Object.entries(data.prices).forEach(([key, val]) => {
    const newPrice = val * (increase + 1);
    data.prices[key] = Math.round(newPrice * 100) / 100;
  });
}

function searchAnimalName(id) {
  return animals.find(animal => id === animal.id).name
}

function searchNameResponsibleFor(nameOrId) {
  const foundIdOrName = employees.find(element => nameOrId === element.firstName || nameOrId === element.lastName || nameOrId === element.id)
  return `${foundIdOrName.firstName} ${foundIdOrName.lastName}`
}

function constructorObject() {
  const object = {};
   employees.forEach(element => {
    object[`${element.firstName} ${element.lastName}`] = element.responsibleFor
    .map(e => searchAnimalName(e))
  })
  return object;
}

function employeeCoverage(idOrName) {
    const object = constructorObject();
    if (idOrName === undefined) return object;
    const fullName = searchNameResponsibleFor(idOrName);    
    return {[fullName]: object[fullName]}
}

console.log(employeeCoverage());

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
