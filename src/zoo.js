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

const { animals/* , employees */ } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  const list = animals.filter(animal => ids.includes(animal.id));

  return list;
}

function animalsOlderThan(animal, age) {
  const animalsList = animals
    .find(type => type.name === animal).residents
    .every(idad => idad.age >= age);

  return animalsList;
}

function employeeByName(employeeName) {
  // seu código aqui
  // if (!employeeName) return {};

  // const fullName = employees.filter(employees => employees.firstName === employeeName);

  // return(fullName);
}

// console.log(employeeByName('Emery'));

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  // seu código aqui
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

function retrieveAvailableLocations() {
  return ['N', 'E', 'S', 'W', 'NE', 'NW', 'SE', 'SW'];
}

function retrieveFilteredAnimalsByLocation(location) {
  return animals.filter(animal => animal.location === location);
}

function retrieveAnimalsPerLocation(locations) {
  const animalsPerLocation = {};

  locations.forEach((location) => {
    const filteredAnimals = retrieveFilteredAnimalsByLocation(location)
      .map(animal => animal.name);

    if (filteredAnimals.length !== 0) animalsPerLocation[location] = filteredAnimals;
  });

  return animalsPerLocation;
}

function retrieveAnimalsPerLocationWithNames(locations, sorted, sex) {
  const animalsPerLocation = {};

  locations.forEach((location) => {
    const filteredAnimals = retrieveFilteredAnimalsByLocation(location).map((animal) => {
      const animalName = animal.name;
      const residents = animal.residents
        .filter((resident) => {
          const needFiltering = sex !== undefined;
          // return needFiltering ? resident.sex === sex : true;
          if (needFiltering) return resident.sex === sex;
          return true;
        })
        .map(resident => resident.name);

      if (sorted) residents.sort();

      return { [animalName]: residents };
    });

    if (filteredAnimals.length !== 0) animalsPerLocation[location] = filteredAnimals;
  });
  return animalsPerLocation;
}

function animalMap(options = {}) {
  const locations = retrieveAvailableLocations();

  // if (!options) return retrieveAnimalsPerLocation(locations);

  const { includeNames = false, sorted = false, sex } = options;

  if (includeNames) return retrieveAnimalsPerLocationWithNames(locations, sorted, sex);
  return retrieveAnimalsPerLocation(locations);
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
