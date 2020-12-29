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

function animalsByIds(...ids) {
  if (!ids) {
    return [];
  }
  return animals.filter(animal => ids.includes(animal.id));
}


function animalsOlderThan(animalName, age) {
  let result = animals.find(animal => animal.name === animalName);
  if (result) result = result.residents.every(animal => animal.age >= age);
  return result;
}

const { employees } = require('./data');

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  const result = employees.find(name => (
    employeeName.includes(name.firstName) || employeeName.includes(name.lastName)
  ));
  return result;
}

function createEmployee(personalInfo, associatedWith) {
  const result = {
    ...personalInfo,
    ...associatedWith,
  };
  return result;
}


function isManager(id) {
  return employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
    const personalInfo = { id, firstName, lastName };
    const associatedWith = { managers, responsibleFor };
    employees.push(createEmployee(personalInfo, associatedWith));
};

function animalCount(species) {
  // if (!species) {
  //   const result = animals.map((animals), ((index) => {
  //     const geral = 
  //     {animals.name: animals.name.residents.length}
  //     return geral;
  //   })
  // const result = animals.reduce(name => (
  //     species.includes(name) && species.includes('number')

  //   ));
  //   return result;
  // }
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