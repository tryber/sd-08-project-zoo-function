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
  const animals = [];

  if (ids) {
    ids.map((animalId) => {
      const animal = data.animals.find(findAnimal => findAnimal.id === animalId);

      return animals.push(animal);
    });
  }

  return animals;
  // seu código aqui
}

function animalsOlderThan(animal, age) {
  const animalsBySpecie = data.animals.filter(it => it.name === animal)[0];
  const hasYoungerAnimal = animalsBySpecie.residents.find(it => it.age < age);

  if (hasYoungerAnimal) {
    return false;
  }

  return true;
}

function employeeByName(employeeName) {
  const employee = data.employees.find((it) => {
    const equalToFirstName = it.firstName === employeeName;
    const equalToLastName = it.lastName === employeeName;

    return equalToFirstName || equalToLastName;
  });

  if (!employee) {
    return {};
  }

  return employee;
}

function createEmployee(personalInfo, associatedWith) {
  const employee = {
    ...personalInfo,
    ...associatedWith,
  };

  return employee;
}

function isManager(id) {
  const manager = data.employees.map(employee => employee.managers.includes(id));

  if (manager.includes(true)) {
    return true;
  }

  return false;
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
