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

const { animals, employees } = data;

function animalsByIds(...ids) {
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return (
    animals.find(animalDoZoo => animalDoZoo.name === animal)
    .residents.every(habitante => habitante.age > age)
  );
}

function employeeByName(employeeName) {
  if (!employeeName) { return { }; }
  return employees.find((employee) => {
    const resultado = employee.firstName === employeeName || employee.lastName === employeeName;
    return resultado;
  });
}

function createEmployee(personalInfo, associatedWith) {
  const employee = Object.assign(personalInfo, associatedWith);
  return employee;
}

function isManager(id) {
  const empData = data.employees;
  const getManager = empData.some(man => man.managers.find(manId => manId === id));
  return getManager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployees = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newEmployees);
}

function animalCount(species) {
  if (!species) {
    return animals.reduce((accObj, animal) => {
      accObj[animal.name] = animal.residents.length;
      return accObj;
    }, {});
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants) return 0;
  const prices = Object.entries(data.prices);
  const ent = Object.entries(entrants);
  let entrant = 0;
  ent.forEach((elEnt) => {
    prices.forEach((elPrices) => {
      entrant += elPrices[0] === elEnt[0] ? elPrices[1] * elEnt[1] : 0;
    });
  });
  return entrant;
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
