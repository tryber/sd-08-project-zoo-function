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

const { animals, employees, prices } = require('./data');

const animalsByIds = (...rest) => animals.filter(({ id }) => rest.some(idKey => idKey === id));

const animalsOlderThan = (animal, key) =>
  animals.some(({ residents, name }) => residents.every(({ age }) => name === animal && age > key));

const employeeByName = employeeName =>
  employees.find(
    ({ firstName, lastName }) => firstName === employeeName || lastName === employeeName
  ) || {};

const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });

const isManager = id =>
  employees.some(({ managers, id: idKey }) => managers.length === 1 && idKey === id);

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) =>
  employees.push({ id, firstName, lastName, managers, responsibleFor });

const animalCount = species =>
  species
    ? animals.find(animal => animal.name === species).residents.length
    : animals.reduce(
        (accAnimal, currAnimal) =>
          Object.assign(accAnimal, { [currAnimal.name]: currAnimal.residents.length }),
        {}
      );

function entryCalculator(entrants = 0) {
  let countAnimals = 0;
  Object.keys(entrants).forEach(key => (countAnimals += prices[key] * entrants[key]));
  return countAnimals;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

const oldestFromFirstSpecies = id => {
  const animalId = employees.find(({ id: idKey }) => idKey === id).responsibleFor;
  const { residents } = animals.find(({ id: idKey }) => idKey === animalId[0]);
  const { name, sex, age } = residents.reduce((accAnimal, currAnimal) =>
    accAnimal.age > currAnimal.age ? accAnimal : currAnimal
  );
  return [name, sex, age];
};

const increasePrices = percentage => {
  const discount = percentage / 100 + 1;
  prices.Adult = Math.round(prices.Adult * 100 * discount) / 100;
  prices.Child = Math.round(prices.Child * 100 * discount) / 100;
  prices.Senior = Math.round(prices.Senior * 100 * discount) / 100;
  return prices;
};

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
