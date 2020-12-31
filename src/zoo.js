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
  return animals.find(specie => specie.name).residents.every(resident => resident.age >= age);
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
  const total = animals.reduce((acc, curr) => {
    acc[curr.name] = curr.residents.length;
    return acc;
  }, {});
  if (typeof species === 'string' && species.length !== 0) {
    return total[species];
  }
  return total;
}

function entryCalculator(entrants = {}) {
  return Object.entries(entrants).reduce((acc, [person, amount]) => {
    acc += data.prices[person] * amount;
    return acc;
  }, 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const result = Object.entries(data.hours).reduce((acumulador, [key, val]) => {
    const { open, close } = val;
    acumulador[key] = close - open > 0 ? `Open from ${open}am until ${close % 12}pm` : 'CLOSED';
    return acumulador;
  }, {});
  if (typeof dayName === 'string' && dayName.length !== 0) {
    return {
      [dayName]: result[dayName],
    };
  }
  return result;
}

function oldestFromFirstSpecies(id) {
  const empregado = data.employees.find(employee => employee.id === id);
  const primeiraEspecie = empregado.responsibleFor[0];
  const animal = animalsByIds(primeiraEspecie)[0];
  const { residents } = animal;
  const maiorIdade = residents.reduce((maisVelho, atual) =>
    (atual.age > maisVelho.age ? atual : maisVelho));

  return Object.values(maiorIdade);
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
