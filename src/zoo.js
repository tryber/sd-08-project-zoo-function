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
  const retorno = data.animals.filter(elemento => ids.includes(elemento.id));

  return retorno;
}

function animalsOlderThan(animal, age) {
  const animalBuscado = data.animals.find(
    elemento => elemento.name === animal,
  );
  return animalBuscado.residents.every(elemento => elemento.age > age);
}

function employeeByName(employeeName) {
  const retorno = data.employees.find(
    element =>
      element.firstName === employeeName || element.lastName === employeeName,
  );

  if (employeeName) {
    return retorno;
  }
  return {};
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const retorno = data.employees.some(element =>
    element.managers.includes(id),
  );
  return retorno;
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = []) {
  const retorno = data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
  return retorno;
}

function animalCount(species) {
  let animais = {};
  data.animals.forEach((animal) => {
    if (!species) {
      animais[animal.name] = animal.residents.length;
    } else {
      const animalBuscado = data.animals.find(
        elemento => elemento.name === species,
      );
      animais = animalBuscado.residents.length;
    }
  });
  return animais;
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
