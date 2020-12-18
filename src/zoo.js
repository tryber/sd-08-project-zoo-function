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

// const { hours } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  if (ids.length === 0) return [];
  const filterId = data.animals.filter((objani => ids.includes(objani.id)));
  return filterId;
}

function animalsOlderThan(animal, age) {
  const filterEspecie = data.animals.find((especie => especie.name === animal));
  const filterAge = filterEspecie.residents.every((especie => especie.age >= age));
  return filterAge;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  const findemployee = data.employees.find((employee => employeeName === employee.firstName
  || employeeName === employee.lastName));
  return findemployee;
}


function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const testIsmanager = data.employees.some((employee => employee.managers.includes(id)));
  return testIsmanager;
}


function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (species === undefined) {
    const speciesAnimal = {};
    data.animals.forEach((animal) => {
      speciesAnimal[animal.name] = animal.residents.length;
    });
    return speciesAnimal;
  }
  return data.animals.find((specie => specie.name === species)).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const priceAll = ((data.prices.Adult * Adult) + (data.prices.Child
  * Child) + (data.prices.Senior * Senior));
  return priceAll;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const { hours } = data;
  const result = Object.entries(hours).reduce((acumulador, [key, value]) => {
    const [am, pm] = Object.values(value);
    acumulador[key] = key === 'Monday' ? 'CLOSED' : `Open from ${am}am until ${pm % 12}pm`;
    return acumulador;
  }, {});
  if (dayName) {
    const day = result[dayName];
    return {
      [dayName]: day,
    };
  }
  return result;
}

function oldestFromFirstSpecies(id) {
  const especieId = data.employees.find(employee => employee.id === id).responsibleFor[0];
  const especie = data.animals.find(animal => animal.id === especieId);
  const olderAnimalAge = Math.max(...especie.residents.map(resident => resident.age));
  return Object.values(especie.residents.find(resident => resident.age === olderAnimalAge));
}

function increasePrices(percentage) {
  const increase = 1 + (percentage / 100);
  Object.keys(prices).forEach(key => (
    prices[key] = Math.round(prices[key] * increase * 100) / 100
  ));
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
