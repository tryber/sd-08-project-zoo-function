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

const { animals, employees, hours, prices } = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animalName, age) {
  return animals
    .find(animal => animal.name === animalName)
    .residents.every(animal => animal.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return employees
    .find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  return employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  const result = animals.reduce((acc, cur) => {
    acc[cur.name] = cur.residents.length;
    return acc;
  }, {});
  if (typeof species === 'string' && species.length !== 0) {
    return result[species];
  }
  return result;
}

function entryCalculator(entrants) {
  if (typeof entrants !== 'object' || Object.keys(entrants).length === 0) return 0;
  return Object.keys(entrants).reduce((acc, cur) => acc + (entrants[cur] * prices[cur]), 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const result = Object.entries(hours).reduce((acc, [key, val]) => {
    const { open, close } = val;
    acc[key] = close - open > 0 ? `Open from ${open}am until ${close % 12}pm` : 'CLOSED';
    return acc;
  }, {});
  if (typeof dayName === 'string' && dayName.length !== 0) return { [dayName]: result[dayName] };
  return result;
}

function oldestFromFirstSpecies(id) {
  const employee = employees.find(current => current.id === id);
  const firstSpeciesId = employee.responsibleFor[0];
  const animal = animalsByIds(firstSpeciesId)[0];
  const { residents } = animal;
  const oldest = residents.reduce((maisVelho, atual) => (atual.age > maisVelho.age ? atual : maisVelho));
  return Object.values(oldest);
}

function increasePrices(percentage) {
  const increase = 1 + (percentage / 100);
  Object.keys(prices).forEach(key => {
    prices[key] = Math.round(prices[key] * increase * 100) / 100;
  });
}

// <-------------------------------------------------------------------------------------->
// functions for execution of employeeCoverage - req. 13

function employeeById(id) {
  return employees.find(employee => employee.id === id);
}

function manager(employee) {
  return employee.responsibleFor.map(id => animals.find(animal => animal.id === id).name);
  }

function employeeCoverage(idOrName) {
  const employee = employeeByName(idOrName) || employeeById(idOrName);
  const result = employees.reduce((acc, employee) => {
    const { firstName, lastName, responsibleFor } = employee;
    acc[`${firstName} ${lastName}`] = responsibleFor
      .map(id => animals.find(animal => id === animal.id).name);
    return acc;
  }, {});

  return idOrName ? {[`${employee.firstName} ${employee.lastName}`]: manager(employee)}

: result;
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
