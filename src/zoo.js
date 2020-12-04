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

const { animals, employees } = require('./data');

function animalsByIds(...ids) {
  let results = [];
  results = animals.filter(animal => ids.some(id => id === animal.id));
  return results;
}

function animalsOlderThan(animal, age) {
  const theAnimal = animals.find(anim => anim.name === animal);
  return theAnimal.residents.every(anim => anim.age >= age);
}

function employeeByName(employeeName) {
  const employee = employees.find(emp => emp.firstName === employeeName ||
    emp.lastName === employeeName);
  
  if (employee) {
    return employee;
  }
  return {};
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  return employees.some(employee => employee.managers.find(manager => id === manager));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  if (!species) {
    return animals.reduce((acc, animal) => {
      Object.assign(acc, { [animal.name] : animal.residents.length });
      return acc;
    }, {});
  }
  return animals.find(animal => animal.name === species).residents.length;
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
