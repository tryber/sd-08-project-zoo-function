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
//

const data = require('./data');
const { animals, employees, prices } = require('./data');


function animalsByIds(...ids) {
  return animals.filter(animal => ids.find(id => animal.id === id));
}

function animalsOlderThan(animal, age) {
  return animals.find(object => object.name === animal).residents.every(some => some.age >= age);
}

function employeeByName(name) {
  if (name == null) {
    return {};
  }
  return employees.find(worker => worker.lastName === name || worker.firstName === name);
}

function createEmployee(personalInfo, associatedWith) {
  const colab = {};
  const newColab = Object.assign(colab, personalInfo, associatedWith);
  return newColab;
}

function isManager(id) {
  return employees.some(gerente => gerente.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newColab = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newColab);
}

function animalCount(species) {
  if (!species) {
    const allAnimals = {};
    animals.forEach(animal => (allAnimals[animal.name] = animal.residents.length));
    return allAnimals;
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants) === 0) return 0;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const adultValor = prices.Adult * Adult;
  const seniorValor = prices.Senior * Senior;
  const childValor = prices.Child * Child;
  const total = (adultValor + seniorValor + childValor).toFixed(2);
  return Number(total);
}

function animalMap(options) {

}

function schedule(dayName) {

}

function oldestFromFirstSpecies(parameter) {
  const idAnimals = employees.find(workers => workers.id === parameter).responsibleFor;
  const objectAnimals = animals.find(animal => idAnimals.find(id => animal.id === id)).residents;
  const result = objectAnimals.reduce((acumulator, animais) =>
    { return acumulator.age < animais.age ? animais : acumulator });
  return result
}

function increasePrices(percentage) {
  const addition = (percentage / 100) + 1;
  prices.Adult = +((prices.Adult * addition) + 0.001).toFixed(2);
  prices.Senior = +((prices.Senior * addition) + 0.001).toFixed(2);
  prices.Child = +((prices.Child * addition) + 0.001).toFixed(2);
  return prices;
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
