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
  return data.animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  const anim = data.animals.find(a => a.name === animal).residents.every(a => a.age > age);
  return anim;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(p => p.firstName === employeeName || p.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return ({ ...personalInfo, ...associatedWith });
}

function isManager(id) {
  return data.employees.some(m => m.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  const objectAnimal = data.animals.reduce((cont, a) => {
    cont[a.name] = a.residents.length;
    return cont;
  }, {});
  if (species === undefined) {
    return objectAnimal;
  }
  return data.animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  const people = data.prices;
  if (entrants === undefined || entrants.length === 0) {
    return 0;
  }
  return Object.entries(entrants).reduce((cont, [key, valor]) => cont + (people[key] * valor), 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const { hours } = data;
  const resut = Object.entries(hours).reduce((cont, [key, value]) => {
    cont[key] = value.open === 0 && value.close === 0 ? 'CLOSED' : `Open from ${value.open}am until ${value.close - 12}pm`;
    return cont;
  }, {});
  if (dayName === undefined) {
    return resut;
  }
  return { [dayName]: resut[dayName] };
}

function oldestFromFirstSpecies(id) {
  const employee = data.employees.find(animal => animal.id === id).responsibleFor[0];
  const animal = data.animals.find(animal => animal.id === employee).residents.reduce((cont, age) => cont.age > age.age ? cont : age);
  return Object.values(animal);
}

function increasePrices(percentage) {
  const porcentagem = 1 + (percentage / 100);
  return Object.entries(data.prices).forEach(([key, value]) => {
    data.prices[key] = Math.round(value * porcentagem * 100) / 100;
  });
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
