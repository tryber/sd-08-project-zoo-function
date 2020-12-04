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
  if (!Array.isArray(ids) || ids.length === 0) return [];
  const { animals } = data;
  console.log(animals);
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  const { animals } = data;
  return animals.find(current => current.name === animal).residents
    .every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  if (typeof employeeName !== 'string' || employeeByName.length === 0) return {};
  const { employees } = data;
  return employees.find((employee) => {
    const { firstName, lastName } = employee;
    return firstName === employeeName || lastName === employeeName;
  });
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  const { employees } = data;
  return employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const personalInfo = {
    id,
    firstName,
    lastName,
  };

  const associatedWith = {
    managers,
    responsibleFor,
  };

  const { employees } = data;
  employees.push(createEmployee(personalInfo, associatedWith));
}

function animalCount(species) {
  const { animals } = data;
  const result = animals.reduce((acc, animal) => {
    acc[animal.name] = animal.residents.length;
    return acc;
  }, {});
  if (typeof species === 'string' && species.length !== 0) {
    return result[species];
  }
  return result;
}

function entryCalculator(entrants) {
  const { prices } = data;
  if (typeof entrants === 'undefined') return 0;
  return Object.entries(entrants).reduce((acc, [key, val]) => (
    acc + (prices[key] * val)
  ), 0);
}

function getAnimalsByLocation() {
  const { animals } = data;
  return animals.reduce((acc, animal) => {
    const { location, name } = animal;
    if (!acc[location]) acc[location] = [];
    acc[location].push(name);
    return acc;
  }, {});
}

function animalMap(options) {
  const { includeNames = false, sorted = false } = (options || {});
  return getAnimalsByLocation();
}

function schedule(dayName) {
  const { hours } = data;
  const result = Object.entries(hours).reduce((acc, [key, val]) => {
    const { open, close } = val;
    acc[key] = close - open > 0 ? `Open from ${open}am until ${close % 12}pm` : `CLOSED`;
    return acc;
  }, {});
  if (result[dayName]) return { [dayName]: result[dayName] };
  return result;
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
