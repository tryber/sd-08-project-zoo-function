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
  const id = ids;
  const animalById = animals.filter((animal, index) => animal.id === id[index]);
  return animalById;
}

const arrayAvrg = ((array) => {
  let sum = 0;
  array.forEach((item) => {
    sum += item;
  });
  return sum;
});
function animalsOlderThan(animal, age) {
  const animalFound = animals.filter(eachAnimal => eachAnimal.name === animal);
  const arrayOfAge = animalFound[0].residents.map(resident => resident.age);
  const sum = arrayAvrg(arrayOfAge);
  if (sum / arrayOfAge.length > age) {
    return true;
  } return false;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const getEmployeeByFirstName = employees.find(employee => employee.firstName === employeeName);
  const getEmployeeByLastName = employees.find(employee => employee.lastName === employeeName);
  if (getEmployeeByFirstName !== undefined) {
    return getEmployeeByFirstName;
  }
  if (getEmployeeByLastName !== undefined) return getEmployeeByLastName;
  return true;
}

function createEmployee(personalInfo, associatedWith) {
  return {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers:
      associatedWith.managers,
    responsibleFor:
      associatedWith.responsibleFor,
  };
}

function isManager(id) {
  const managerIds = employees.map(manager => manager.managers);
  return managerIds.some((manageres, index) => manageres[index] === id);
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
