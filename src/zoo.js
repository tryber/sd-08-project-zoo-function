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
  // seu código aqui
  if (ids.length === 0) {
    return [];
  }
  const animalsData = data.animals.filter(especie => ids.includes(especie.id));
  return animalsData;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  // auxilio da Rosiele David
  const lontras = data.animals.find(animalName => animalName.name === animal);
  return lontras.residents.every(idades => idades.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) {
    return {};
  }
  const employee = data.employees.find(empregado => (empregado.firstName === employeeName ||
    empregado.lastName === employeeName));
  return employee;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  const gerente = data.employees.some(seGerente => seGerente.managers.includes(id));
  return gerente;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const add = data.employees.push({ id, firstName, lastName, managers, responsibleFor });
  return add;
}

function animalCount(species) {
  // seu código aqui
  const { animals } = data;
  const result = animals.reduce((acc, animal) => {
    acc[animal.name] = animal.residents.length;
    return acc;
  }, {});
  if (typeof species === 'string' && species.length !== 0) {
    return result[species];
  }
  return result;
}

function entryCalculator(entrants) {
  // seu código aqui
  const { prices } = data;
  if (typeof entrants === 'undefined') return 0;
  return Object.entries(entrants).reduce((acc, [key, val]) => (
    acc + (prices[key] * val)
  ), 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
  const result = Object.entries(data.hours).reduce((acumulador, [key, val]) => {
    const { open, close } = val;
    acumulador[key] = close - open > 0 ? `Open from ${open}am until ${close % 12}pm` : 'CLOSED';
    return acumulador;
  }, {});
  if (typeof dayName === 'string' && dayName.length !== 0) return { [dayName]: result[dayName] };
  return result;
}


function oldestFromFirstSpecies(id) {
  // seu código aqui
  // ideia pega com Paulo Simoes
  const employee = data.employees.find(current => current.id === id);
  const firstSpeciesId = employee.responsibleFor[0];
  const animal = animalsByIds(firstSpeciesId)[0];
  const { residents } = animal;
  const oldest = residents.reduce((maisVelho, atual) => (
    atual.age > maisVelho.age ? atual : maisVelho
  ));
  return Object.values(oldest);
}

function increasePrices(percentage) {
  // seu código aqui
  // ideia pega com Paulo Simoes
  const increase = 1 + (percentage / 100);
  Object.keys(data.prices).forEach(key => (
    data.prices[key] = Math.round(data.prices[key] * increase * 100) / 100
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
