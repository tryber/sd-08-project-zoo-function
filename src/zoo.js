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
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return animals
    .find(species => species.name === animal)
    .residents.every(resident => resident.age > age);
}

function employeeByName(employeeName) {
  const findEmployee = data.employees
    .find(parName => parName.firstName === employeeName || parName.lastName === employeeName);
  return employeeName ? findEmployee : {};
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  const checkEmployeePosition = employees.filter(employee => employee.managers.includes(id));
  return checkEmployeePosition.length > 0;
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
  if (!species) {
    const emptyPar = {};
    animals.forEach(animal => (emptyPar[animal.name] = animal.residents.length));
    return emptyPar;
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.keys(entrants)
    .reduce((acc, key) => (data.prices[key] * entrants[key]) + acc, 0);
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
  const listOfCoverage = {};
  if (!idOrName) {
    data.employees.forEach((element) => {
      listOfCoverage[`${element.firstName} ${element.lastName}`] = element.responsibleFor.map(id =>
        animalsByIds(id)[0].name);
    });
  } else {
    const employee = data.employees.find(element =>
      element.lastName === idOrName ||
      element.firstName === idOrName ||
      element.id === idOrName
    );
    const animal = employee.responsibleFor.map((id) => {
      animalsByIds(id)[0].name;
    });
    listOfCoverage[`${employee.firstName} ${employee.lastName}`] = animal;
  }
  return listOfCoverage;
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
