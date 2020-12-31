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

const { animals, employees, prices, hours } = require('./data');

function animalsByIds(...ids) {
  if (ids === undefined) return [];
  return animals.filter(element => ids.includes(element.id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return animals
    .find(element => element.name === animal)
    .residents.every(element => element.age > age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(
    element =>
      element.firstName === employeeName || element.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  return employees.some(element => element.managers.includes(id));
}


function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {

  if (species === undefined) {
    const objeto = {};
    animals.forEach((element) => {
      objeto[element.name] = element.residents.length;
    });
    return objeto;
  }
  return animals.filter(element => species === element.name)[0].residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined) return 0;
  const { Adult, Senior, Child } = prices;
  let total = 0;
  const arr = Object.entries(entrants);
  arr.forEach(element => {
    if (element[0] === 'Adult') {
      total += Adult * element[1];
    }
    if (element[0] === 'Child') {
      total += Child * element[1];
    }
    if (element[0] === 'Senior') {
      total += Senior * element[1];
    }
  });
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
  /* if (idOrName === undefined) {
    const objeto = {};
    employees.forEach(element => {
      objeto[`${element.firstName} ${element.lastName}`] = ;
    })

  } */
}

console.log(employeeCoverage());

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
