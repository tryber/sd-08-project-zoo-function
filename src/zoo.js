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

const { animals } = require('./data');
const { employees } = require('./data');
const { prices } = require('./data');
const { hours } = require('./data');

function animalsByIds(...ids) {
  return animals.filter((elem, index) => elem.id === ids[index]);
}

function animalsOlderThan(animal, age) {
  const output = animals.find(elem => (elem.name === animal));
  return output.residents.every(el => el.age >= age);
}

function employeeByName(employeeName) {
  let output = {};
  const param = employeeName;

  if (employeeName !== undefined) {
    output = employees.find(elem => (elem.firstName === param || elem.lastName === param));
  }

  return output;
}

function createEmployee({ id, firstName, lastName }, { managers = [], responsibleFor = [] }) {
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  let output = false;

  employees.forEach((elem) => {
    elem.managers.some((el) => {
      if (el === id) {
        output = true;
      }
      return output;
    });
  });

  return output;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const personalInfo = { id, firstName, lastName };
  const associatedWith = { managers, responsibleFor };
  const add = createEmployee(personalInfo, associatedWith);
  return employees.push(add);
}

function animalCount(species) {
  if (species === undefined) {
    const output = {};

    animals.forEach((elem) => {
      const obj = { [elem.name]: elem.residents.length };
      Object.assign(output, obj);
    });
    return output;
  }

  const bySpecie = animals.find(elem => (elem.name === species));
  return bySpecie.residents.length;
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
