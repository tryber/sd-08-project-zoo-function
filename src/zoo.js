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
  if(!entrants)  return 0;
  const { Adult = 0, Senior = 0, Child = 0} = entrants;
  const adultValor = prices.Adult * Adult;
  const seniorValor = prices.Senior * Senior;
  const childValor = prices.Child * Child;
  return (adultValor + seniorValor + childValor).toFixed(2);
  
}
console.log(entryCalculator())
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
