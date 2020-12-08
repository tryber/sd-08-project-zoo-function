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

function animalsByIds(...animals) {
  const zooAnimals = data.animals;
  const checkId = animal => animals.includes(animal.id);
  const checkedAnimals = zooAnimals.filter(checkId);
  return checkedAnimals;
}

function animalsOlderThan(animal, age) {
  const findAnimal = data.animals.find(zooAnimal => zooAnimal.name === animal);
  const checkAge = findAnimal.residents.every(resident => resident.age >= age);
  return checkAge;
}

function employeeByName(employeeName) {
  let findEmployee = data.employees.find(zooEmployee =>
    zooEmployee.firstName === employeeName ||
    zooEmployee.lastName === employeeName);
  if (!employeeName) {
    findEmployee = {};
  }
  return findEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
  return newEmployee;
}

function isManager(id) {
  const zooEmployees = data.employees;
  const findEmployee = zooEmployees.find(employee => employee.id === id);
  const managerStatus = zooEmployees.some(employee =>
    employee.managers.includes(findEmployee.id));
  return managerStatus;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const zooEmployees = data.employees;
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  if (!managers) {
    newEmployee.managers = [];
  }
  if (!responsibleFor) {
    newEmployee.responsibleFor = [];
  }
  zooEmployees.push(newEmployee);
}

function animalCount(species) {
  const zooAnimals = data.animals;
  let count;
  if (!species) {
    count = zooAnimals.reduce((accum, curr) => {
      accum[curr.name] = curr.residents.length;
      return accum;
    }, {});
  } else if (species) {
    const findAnimal = zooAnimals.find(animal => animal.name === species);
    count = findAnimal.residents.length;
  }
  return count;
}

function entryCalculator(entrants) {
  const prices = data.prices;
  const { Adult, Child, Senior } = prices;
  let total = 0;
  if (!entrants) {
    total = 0;
  } else if (Object.keys(entrants).length === 0) {
    total = 0;
  } else if (entrants) {
    entrants.Adult = (typeof entrants.Adult !== 'undefined') ? entrants.Adult : 0;
    entrants.Child = (typeof entrants.Child !== 'undefined') ? entrants.Child : 0;
    entrants.Senior = (typeof entrants.Senior !== 'undefined') ? entrants.Senior : 0;
    total = (entrants.Adult * Adult) + (entrants.Child * Child) + (entrants.Senior * Senior);
  }
  return total;
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
