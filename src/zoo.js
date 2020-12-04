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
  // seu código aqui
  const array = [];
  const bringId = element => array.push(animals.filter(animalId => animalId.id === element)[0]);
  ids.forEach(bringId);
  return array;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const findAnimal = animals.find(animalName => animalName.name === animal);
  const mapAge = findAnimal.residents.map(animalInfo => animalInfo.age);
  const checkAge = animalsAge => animalsAge.every(minAge => minAge > 7);
  return checkAge(mapAge);
}

function employeeByName(employeeName) {
  // seu código aqui
  const firstName = employees.find(employeeInfo => employeeInfo.firstName === employeeName);
  const lastName = employees.find(employeeInfo => employeeInfo.lastName === employeeName);
  if (firstName !== undefined) {
    return firstName;
  } else if (lastName !== undefined) {
    return lastName;
  }
  return {};
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const objeto = {};
  Object.assign(objeto, personalInfo, associatedWith);
  return objeto;
}

function isManager(id) {
  // seu código aqui
  let Manager = false;
  const mapAge = employees.map(employeeId => employeeId.managers);
  mapAge.forEach((element) => {
    if (element.includes(id) === true) {
      Manager = true;
    }
  });
  return Manager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
  return employees.length;
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
