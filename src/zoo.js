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

const { animals, employees, prices } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return animals
    .find(species => species.name === animal)
    .residents.every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) return {};
  return employees.find(
    employee =>
      employeeName === employee.firstName || employeeName === employee.lastName
  );
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return employees.some(managerTorF => managerTorF.managers.includes(id));
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = []
) {
  // seu código aqui
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  // seu código aqui
  if (!species) {
    return animals.reduce((accumulator, currrentValue) => {
      accumulator[currrentValue.name] = currrentValue.residents.length;
      return accumulator;
    }, {});
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (typeof entrants !== 'object' || Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.keys(entrants).reduce(
    (accumulator, currentValue) =>
      accumulator + entrants[currentValue] * prices[currentValue],
    0
  );
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const employee = employees.find(employee => employee.id === id);
  const responsible = employee.responsibleFor.map(responsability =>
    animals.find(animal => animal.id === responsability)
  );
  const oldest = responsible[0].residents.reduce((first, second) => {
    if (first.age > second.age) {
      return first;
    }
    return second;
  });
  return Object.values(oldest);
}

function increasePrices(percentage) {
  // seu código aqui
  Object.keys(prices).forEach(item => {
    prices[item] = Math.ceil(prices[item] * (100 + percentage)) / 100;
  });
}

function employeeCoverage(idOrName) {
  // seu código aqui

  return employees.find(employee => {
    return (
      employee.id === idOrName ||
      employee.firstName === idOrName ||
      employee.lastName === idOrName
    );
  }).responsibleFor;
}
console.log(employeeCoverage('Nigel'));
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
