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
const { animals, employees, prices } = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.find(id => id === animal.id));
}

function animalsOlderThan(animal, age) {
  return animals.find(specie => specie.name === animal)
    .residents.every(individual => individual.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName == null) {
    return {};
  }
  return employees.find(employee => employee.firstName === employeeName
    || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const worker = { ...personalInfo, ...associatedWith };
  return worker;
}

function isManager(id) {
  return employees.some(office => office.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newWorker = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newWorker);
}

function animalCount(species) {
  if (!species) {
    return animals.reduce((acc, curr) => {
      const { name, residents } = curr;
      return { ...acc, [name]: residents.length };
    }, {});
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants = {}) {
  return Object.entries(entrants).reduce((acc, [person, amount]) => {
    acc += prices[person] * amount;
    return acc;
  }, 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {

}

function oldestFromFirstSpecies(id) {
  const responsible = employees.find(employee => employee.id === id).responsibleFor[0];
  const animalRelated = animals.find(animalId => animalId.id === responsible).residents;
  const olderAnimal = animalRelated.reduce((acc, curr) => (
    curr.age > acc.age ? curr : acc
  ));
  return Object.values(olderAnimal);
}

function increasePrices(percentage) {
  const increase = 1 + (percentage / 100);
  Object.keys(prices).forEach((key) => {
    prices[key] = Math.round(prices[key] * increase * 100) / 100;
  });
  return prices;
}


const animalsPush = (responsibleFor = []) => {
  const result = responsibleFor.map(some => animals.find(specie => specie.id === some).name)
    || [];
  return result;
};

function employeeCoverage(idOrName) {
  const format = {};
  if (!idOrName) {
    employees.forEach((employee) => {
      format[`${employee.firstName} ${employee.lastName}`] = animalsPush(employee.responsibleFor);
    });
    return format;
  }
  const employeeName = employees.find(
    employee => employee.id === idOrName || employee.firstName === idOrName
      || employee.lastName === idOrName);
  format[`${employeeName.firstName} ${employeeName.lastName}`] = animalsPush(
    employeeName.responsibleFor,
  );
  return format;
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
