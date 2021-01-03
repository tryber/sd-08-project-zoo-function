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
  const nome = data.animals.filter(elemento => ids.includes(elemento.id));
  return nome;
}

function animalsOlderThan(animal, age) {
  const zooPet = data.animals.find(
    pet => pet.name === animal,
  );
  return zooPet.residents.every(elemento => elemento.age > age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return data.employees.find(
    empregado =>
      empregado.firstName === employeeName || empregado.lastName === employeeName,
  );
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const manager = data.employees.some(person =>
    person.managers.includes(id),
  );
  return manager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (!species) {
    return data.animals.reduce((index, animal) => {
      index[animal.name] = animal.residents.length;
      return index;
    }, {});
  }
  return data.animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants) {
    return 0;
  }
  const people = Object.keys(entrants);
  return people.reduce((total, index) => total + (entrants[index] * data.prices[index]), 0);
}

function animalMap(options) {

}

function schedule(dayName) {
  const dias = Object.keys(data.hours);
  const horario = dias.reduce((programacao, index) => {
    if (index === 'Monday') {
      programacao[index] = 'CLOSED';
      return programacao;
    }
    programacao[index] = `Open from ${data.hours[index].open}am until ${data.hours[index].close - 12}pm`;
    return programacao;
  }, {});
  if (dayName) return { [dayName]: horario[dayName] };
  return horario;
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
