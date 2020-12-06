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
const data = require('./data');

function animalsByIds(...ids) {
  return data.animals.filter(animalId => ids.find(id => animalId.id === id));
}

function animalsOlderThan(animal, age) {
  return data.animals
    .find(animalName => animalName.name === animal)
    .residents.every(animalAge => animalAge.age >= age);
}

function employeeByName(employeeName) {
  return employeeName === undefined
    ? {}
    : data.employees.find(
        ({ firstName, lastName }) =>
          firstName === employeeName || lastName === employeeName,
      );
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  return data.employees.some(manager => manager.managers.includes(id));
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  return data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  return species
    ? data.animals.find(animal => animal.name === species).residents.length
    : data.animals.reduce((counter, obj) => {
      counter[obj.name] = obj.residents.length;
      return counter;
    }, {});
}

function entryCalculator(entrants) {
  return entrants
    ? Object.keys(entrants).reduce(
        (counter, current) =>
          counter + (data.prices[current] * entrants[current]),
        0,
      )
    : 0;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  const getAnimalByEmployee = data.employees.find(person => person.id === id);
  const [getFirstAnimalById] = getAnimalByEmployee.responsibleFor;
  const getOldestAnimalById = data.animals.find(
    animal => animal.id === getFirstAnimalById,
  );
  const oldestAnimal = getOldestAnimalById.residents.reduce((acc, curr) =>
    (curr.age > acc.age ? curr : acc),
  );
  return Object.values(oldestAnimal);
}

function increasePrices(percentage) {
  return Object.entries(prices).forEach(([keys, values]) => {
    const priceWithPercentage = values * (percentage / 100 + 1);
    prices[keys] = Math.round(priceWithPercentage * 100) / 100
  });
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
