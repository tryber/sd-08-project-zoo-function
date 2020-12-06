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
  const animals = [];
  ids.forEach((id) => {
    data.animals.forEach((animal) => {
      if (animal.id === id) animals.push(animal);
    });
  });
  return animals;
}

function animalsOlderThan(animal, age) {
  return data.animals.find(dataAnimal => dataAnimal.name === animal).residents
    .every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  return employeeName ? data.employees.find(employee => (employee.firstName === employeeName)
    || (employee.lastName === employeeName)) : {};
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  return !!(data.employees.find(employee => employee.managers.includes(id)));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  return species ? data.animals.find(animal => animal.name === species).residents.length :
    data.animals.reduce((acc, animal) => {
      acc[animal.name] = animal.residents.length;
      return acc;
    }, {});
}

function entryCalculator(entrants = {}) {
  return Object.entries(entrants).reduce((acc, [person, amount]) => {
    acc += data.prices[person] * amount;
    return acc;
  }, 0);
}

function getEspeciesIncludeNames(animal, sex, sorted) {
  const residentsBySex = sex ? animal.residents.filter(resident => resident.sex === sex)
  .map(resident => resident.name) : animal.residents.map(resident => resident.name);
  const residentsSorted = sorted ? residentsBySex.sort() : residentsBySex;
  return { [animal.name]: residentsSorted };
}

function animalMap(options = {}) {
  const { includeNames, sex, sorted } = options;
  return data.animals.reduce((acc, animal) => {
    if (acc[animal.location]) {
      acc[animal.location].push(includeNames ?
        getEspeciesIncludeNames(animal, sex, sorted) : animal.name);
    } else {
      acc[animal.location] = [includeNames ?
        getEspeciesIncludeNames(animal, sex, sorted) : animal.name];
    }
    return acc;
  }, {});
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
