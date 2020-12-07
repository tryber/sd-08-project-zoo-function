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

const { animals } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  if (ids.length === 0) {
    return ids;
  }

  const animalsResult = [];
  ids.forEach((animalId) => {
    animals.forEach((animal) => {
      if (animal.id === animalId) {
        animalsResult.push(animal);
      }
    });
  });

  return animalsResult;
}

function animalsOlderThan(animal, age) {
  const findAnimal = animals.find(elem => elem.name === animal);
  return findAnimal.residents.every(eachAnimal => eachAnimal.age >= age);
}


function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  const show = data.employees.find(person =>
    person.firstName === employeeName || person.lastName === employeeName);

  return show;
}


function createEmployee(personalInfo, associatedWith) {
  if (!personalInfo || !associatedWith) {
    return {};
  }
  const employee = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };

  return employee;
}


function isManager(id) {
  let checkTrueOrFalse = false;
  const checkManager = data.employees.find(element => element.managers.includes(id));
  if (checkManager !== undefined) {
    checkTrueOrFalse = true;
  }

  return checkTrueOrFalse;
}


function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  if (!id || !firstName || !lastName) {
    return {};
  }
  const addNewEmployee = data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });

  return addNewEmployee;
}


function animalCount(species) {
  const countAnimal = {};
  if (!species) {
    animals.forEach((animal) => {
      countAnimal[animal.name] = animal.popularity;
    });
    return countAnimal;
  }
  const findAnimal = animals.find(animal => animal.name === species);
  return findAnimal.popularity;
}


function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  const entrantsKeys = Object.keys(entrants).map(eachKey =>
    data.prices[eachKey]);
  const entrantsValues = Object.values(entrants).reduce((acc, curr, index) =>
    acc + (entrantsKeys[index] * curr), 0);

  return entrantsValues;
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
