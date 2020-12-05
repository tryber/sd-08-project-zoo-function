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

const { animals, employees, prices } = data;
function animalsByIds(...ids) {
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animalName, age) {
  return animals
    .find(animal => animal.name === animalName)
    .residents.every(animal => animal.age > age);
}

function employeeByName(employeeName) {
  return employees
    .find(employee => employee.firstName === employeeName || employee.lastName === employeeName)
    || {};
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return (employees
    .filter(employee => employee.managers.includes(id))
    .length > 0);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
}

function animalCount(species) {
  let numberAnimals = {};
  if (!species) {
    animals.forEach((animal) => {
      numberAnimals[animal.name] = animal.residents.length;
    });
  } else {
    const animalResidents = animals.find(animal => animal.name === species).residents;
    numberAnimals = animalResidents.length;
  }
  return numberAnimals;
}

function entryCalculator(entrants) {
  let total = 0;
  if (entrants) {
    Object.keys(entrants)
      .forEach((currentEntrant) => {
        total += prices[currentEntrant] * entrants[currentEntrant];
      });
  }
  return total;
}

function defaultMap(options = { includeNames: false, sorted: false, sex: undefined }) {
  const output = animals.reduce((objMapAnimals, { name, location }) => {
    if (objMapAnimals[location] === undefined) objMapAnimals[location] = [];
    objMapAnimals[location].push(name);
    return objMapAnimals;
  }, {});
  return output;
}

function includeNamesMap(options = { includeNames: false, sorted: false, sex: undefined }) {
  const output = animals.reduce((objMapAnimals, { name, location, residents }) => {
    if (objMapAnimals[location] === undefined) objMapAnimals[location] = [];
    const newAnimal = {};
    newAnimal[name] = residents
      .map(resident => resident.name);
    objMapAnimals[location].push(newAnimal);
    return objMapAnimals;
  }, {});
  return output;
}

function sortedTrueMap() {
  const output = animals.reduce((objMapAnimals, { name, location, residents }) => {
    if (objMapAnimals[location] === undefined) objMapAnimals[location] = [];
    const newAnimal = {};
    newAnimal[name] = residents
      .map(resident => resident.name)
      .sort();
    objMapAnimals[location].push(newAnimal);
    return objMapAnimals;
  }, {});
  return output;
}

function animalSexMap(options = { includeNames: false, sorted: false, sex: undefined }) {
  const output = animals.reduce((objMapAnimals, { name, location, residents }) => {
    if (objMapAnimals[location] === undefined) objMapAnimals[location] = [];
    const newAnimal = {};
    newAnimal[name] = residents
      .filter(resident => resident.sex === options.sex)
      .map(resident => resident.name);
    objMapAnimals[location].push(newAnimal);
    return objMapAnimals;
  }, {});
  return output;
}

function animalMap(options) {
  const output = animals.reduce((objMapAnimals, { name, location, residents }) => {
    if (objMapAnimals[location] === undefined) objMapAnimals[location] = [];
    // seu código aqui
    // includeNames -> includeNames: true
    const newAnimal = {};
    newAnimal[name] = residents
      .filter(resident => resident.sex === options.sex) // -> sex: male || female
      .map(resident => resident.name)
      .sort(); // -> sorted: true
    objMapAnimals[location].push(newAnimal);
    return objMapAnimals;
  }, {});
  return output;
}
console.log(animalMap({sex: 'male'}));

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
