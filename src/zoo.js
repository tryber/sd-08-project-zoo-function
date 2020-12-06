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

const { animals, employees } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  const returnArray = [];
  if (ids.length === 0) {
    const empytArray = [];
    return empytArray;
  } else if (ids.length > 0) {
    const passedIds = ids;
    const findId = (id) => {
      const timeId = id;
      animals.forEach((obj) => {
        if (timeId === obj.id) {
          returnArray.push(obj);
        }
      });
    };
    passedIds.forEach(findId);
  }
  return returnArray;
}

function animalsOlderThan(animal, age) {
  let retorno = true;
  const passedAge = age;
  animals.forEach((obj) => {
    if (animal === obj.name) {
      const entries = obj.residents;
      entries.forEach((objEntries) => {
        if (objEntries.age < passedAge) {
          retorno = false;
        }
      });
    }
  });
  return retorno;
}

function employeeByName(employeeName) {
  let employee = {};
  if (employeeName === undefined) {
    return {};
  }
  employees.forEach((obj) => {
    if (obj.firstName === employeeName || obj.lastName === employeeName) {
      employee = obj;
    }
  });
  return employee;
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor };
  employees.push(newEmployee);
  return newEmployee;
}

const personalInfo = {
  id: '7ed1c9bb-8570-44f6-b718-0666b869573a',
  firstName: 'John',
  lastName: 'Doe',
};

const associatedWith = {
  managers: [
    'c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1',
    '9e7d4524-363c-416a-8759-8aa7e50c0992'],
  responsibleFor: [
    '0938aa23-f153-4937-9f88-4858b24d6bce',
    '89be95b3-47e4-4c5b-b687-1fabf2afa274',
    'bb2a76d8-5fe3-4d03-84b7-dba9cfc048b5'] };

createEmployee(personalInfo, associatedWith);


function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  // seu código aqui
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
