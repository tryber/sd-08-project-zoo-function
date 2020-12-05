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

function animalsByIds(...ids) {
  // seu código aqui
  return data.animals.filter(animal => ids.some(id => animal.id === id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  // const specie = data.animals.find(specie => specie.name === animal);
  // return specie.residents.every(resident => resident.age >= age);
  return data.animals
    .find(specie => specie.name === animal)
    .residents.every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(
    employee =>
      employee.firstName === employeeName || employee.lastName === employeeName,
  );
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  // seu código aqui
  return data.employees.some(employee =>
    employee.managers.some(employeeId => employeeId === id),
  );
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  // seu código aqui
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  // seu código aqui
  if (species === undefined) {
    return data.animals.reduce((acc, value) => {
      acc[value.name] = value.residents.length;
      return acc;
    }, {});
  }
  const animalSearch = data.animals.find(animal => animal.name === species);
  return animalSearch.residents.length;
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
