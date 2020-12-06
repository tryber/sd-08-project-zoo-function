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
  const result = [];
  ids.forEach(idP => result.push((data.animals.find(animal => animal.id === idP))));

  return result;
}

function animalsOlderThan(animal, age) {
  return (data.animals.find(animalzinho => animal === animalzinho.name))
    .residents.every(animalAge => animalAge.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName) {
    return data.employees.find(employee => employee.firstName === employeeName ||
      employee.lastName === employeeName);
  } return {};
}

function createEmployee(personalInfo, associatedWith) {
  personalInfo = { ...personalInfo, ...associatedWith };
  return personalInfo;
}

function isManager(id) {
  const managers = [];
  data.employees.forEach(employee => employee.managers.forEach((manager) => {
    managers.push(manager);
  }));
  return managers.some(manager => manager === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees
    .push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  let amount;
  if (!species) {
    const animalAmount = {};
    data.animals.map((animal) => {
      animalAmount[animal.name] = animal.residents.length;
      return animalAmount;
    });
    return animalAmount;
  }
  data.animals.forEach((animal) => {
    if (Object.values(animal)
      .some(sameAnimal => sameAnimal === species)) amount = animal.residents.length;
  });
  return amount;
}

console.log(animalCount());

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
