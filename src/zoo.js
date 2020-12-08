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

// const data = require('./data');

function animalsByIds(...ids) {
  return data.animals.filter(especie => ids.includes(especie.id));
}

function animalsOlderThan(animal, age) {
  const nomeAnimal = data.animals.find(especie => especie.name === animal);
  return nomeAnimal.residents.every(especie => especie.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(em => em.firstName === employeeName || em.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const manager = gerente => gerente === id;
  return data.employees.some(emp => emp.managers.find(manager));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

const data = require('./data');

function animalCount(species) {
  if (species === undefined) {
    const lista = {};
    data.animals.forEach(e => lista[e.name] = e.residents.length);
    return lista;
  } else {
    return data.animals.find(e => e.name === species).residents.length;
  }
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
